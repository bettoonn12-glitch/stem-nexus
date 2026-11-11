import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { ArrowLeft, ArrowRight, ArrowUp, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

interface Goal {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

const GOAL_CONFIGS = [
  { x: 30, w: 120, label: 'A' },
  { x: 170, w: 120, label: 'B' },
  { x: 310, w: 120, label: 'C' },
  { x: 450, w: 120, label: 'D' },
];

export const SoccerGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number>(0);
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hasSecondChance, setHasSecondChance] = useState<boolean>(false);
  const [secondChanceTriggered, setSecondChanceTriggered] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const startTimeRef = useRef<number>(Date.now());

  // Player position at bottom
  const playerRef = useRef<{ x: number; y: number; vx: number }>({
    x: 300,
    y: 260,
    vx: 0,
  });

  // Ball physics
  const ballRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    scale: number;
    active: boolean;
    targetGoalIndex: number;
  }>({
    x: 300,
    y: 275,
    vx: 0,
    vy: 0,
    scale: 1,
    active: false,
    targetGoalIndex: 0,
  });

  // ONLY ONE Single Goalkeeper across the entire goal area
  const goalieRef = useRef<{
    x: number;
    y: number;
    vx: number;
    minX: number;
    maxX: number;
  }>({
    x: 300,
    y: 80,
    vx: 2.6,
    minX: 45,
    maxX: 555,
  });

  // 4 Goals
  const goalsRef = useRef<Goal[]>([]);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string; life: number }[]>([]);

  useEffect(() => {
    const opts = question.options.slice(0, 4);
    goalsRef.current = GOAL_CONFIGS.map((cfg, idx) => {
      const opt = opts[idx] || { id: `opt_${idx}`, text: `Option ${cfg.label}`, isCorrect: false };
      const optText = lang === 'id' && opt.textId ? opt.textId : opt.text;
      return {
        id: opt.id,
        label: cfg.label,
        text: optText,
        isCorrect: opt.isCorrect,
        x: cfg.x,
        y: 45,
        w: cfg.w,
        h: 55,
      };
    });
  }, [question, lang]);

  // Power-up listener
  useEffect(() => {
    if (activePowerUp === 'fifty_fifty') {
      const wrong = question.options.filter((o) => !o.isCorrect);
      setHiddenOptionIds(wrong.slice(0, 2).map((o) => o.id));
      if (onConsumePowerUp) onConsumePowerUp('fifty_fifty');
    } else if (activePowerUp === 'second_chance') {
      setHasSecondChance(true);
      if (onConsumePowerUp) onConsumePowerUp('second_chance');
    }
  }, [activePowerUp]);

  // Keyboard navigation: Left/Right to aim at goal A, B, C, D; Up to shoot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isShooting || gameOver) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        sound.playTileSnap();
        setSelectedGoalIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        sound.playTileSnap();
        setSelectedGoalIndex((prev) => Math.min(3, prev + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        triggerKickToSelectedGoal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGoalIndex, isShooting, gameOver, hiddenOptionIds]);

  const triggerKickToSelectedGoal = () => {
    if (isShooting || gameOver) return;
    const targetGoal = goalsRef.current[selectedGoalIndex];
    if (!targetGoal) return;

    if (hiddenOptionIds.includes(targetGoal.id)) {
      sound.playError();
      return;
    }

    sound.playKick();
    setIsShooting(true);
    setFeedbackMsg(null);

    const goalCenterX = targetGoal.x + targetGoal.w / 2;
    const goalCenterY = targetGoal.y + targetGoal.h / 2;

    const startX = playerRef.current.x;
    const startY = playerRef.current.y + 15;

    const dx = goalCenterX - startX;
    const dy = goalCenterY - startY;
    const steps = 30;

    ballRef.current = {
      x: startX,
      y: startY,
      vx: dx / steps,
      vy: dy / steps,
      scale: 1,
      active: true,
      targetGoalIndex: selectedGoalIndex,
    };
  };

  // Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth horizontal lerp for player position aligning with selected goal
      const targetGoal = goalsRef.current[selectedGoalIndex];
      const targetPlayerX = targetGoal ? targetGoal.x + targetGoal.w / 2 : 300;
      playerRef.current.x += (targetPlayerX - playerRef.current.x) * 0.2;

      // 1. Soccer Pitch Grass Background
      const pitchGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      pitchGrad.addColorStop(0, '#065f46');
      pitchGrad.addColorStop(0.5, '#047857');
      pitchGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = pitchGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Alternating Grass Stripes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = 0; y < canvas.height; y += 32) {
        if ((y / 32) % 2 === 0) {
          ctx.fillRect(0, y, canvas.width, 32);
        }
      }

      // Penalty box line & penalty spot
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 140);
      ctx.lineTo(canvas.width - 20, 140);
      ctx.stroke();

      // Penalty arc
      ctx.beginPath();
      ctx.arc(300, 140, 60, 0, Math.PI);
      ctx.stroke();

      // 2. Draw Each of the 4 Goals
      goalsRef.current.forEach((g, idx) => {
        const isSelected = selectedGoalIndex === idx;
        const isHidden = hiddenOptionIds.includes(g.id);

        // Draw Goal Net Background
        ctx.save();
        ctx.fillStyle = isSelected
          ? 'rgba(6, 182, 212, 0.25)'
          : isHidden
          ? 'rgba(15, 23, 42, 0.7)'
          : 'rgba(0, 0, 0, 0.35)';
        ctx.strokeStyle = isSelected ? '#38bdf8' : isHidden ? '#475569' : '#ffffff';
        ctx.lineWidth = isSelected ? 3 : 2;

        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.strokeRect(g.x, g.y, g.w, g.h);

        // Net Mesh Pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        for (let nx = g.x + 12; nx < g.x + g.w; nx += 12) {
          ctx.beginPath();
          ctx.moveTo(nx, g.y);
          ctx.lineTo(nx, g.y + g.h);
          ctx.stroke();
        }
        for (let ny = g.y + 10; ny < g.y + g.h; ny += 10) {
          ctx.beginPath();
          ctx.moveTo(g.x, ny);
          ctx.lineTo(g.x + g.w, ny);
          ctx.stroke();
        }

        // Overhead Goal Answer Banner
        const bannerW = g.w + 10;
        const bannerH = 34;
        const bannerX = g.x - 5;
        const bannerY = g.y - 38;

        ctx.fillStyle = isSelected ? '#0284c7' : isHidden ? '#1e293b' : 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = isSelected ? '#fde047' : isHidden ? '#334155' : '#38bdf8';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 6);
        ctx.fill();
        ctx.stroke();

        // Choice label [A], [B], [C], [D]
        ctx.fillStyle = isSelected ? '#fde047' : '#94a3b8';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`GOAL [ ${g.label} ]`, g.x + g.w / 2, bannerY + 12);

        // Option text
        ctx.fillStyle = isHidden ? '#64748b' : '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        const rawText = isHidden ? 'ELIMINATED' : g.text;
        const truncated = rawText.length > 13 ? rawText.slice(0, 12) + '…' : rawText;
        ctx.fillText(truncated, g.x + g.w / 2, bannerY + 26);

        ctx.restore();
      });

      // 3. Update and Draw THE SINGLE GOALKEEPER
      const goalie = goalieRef.current;
      if (!ballRef.current.active) {
        // Patrols across the entire net line
        goalie.x += goalie.vx;
        if (goalie.x <= goalie.minX || goalie.x >= goalie.maxX) {
          goalie.vx *= -1;
        }
      } else {
        // Dives / slides towards incoming shot location
        const targetG = goalsRef.current[ballRef.current.targetGoalIndex];
        if (targetG) {
          const targetMid = targetG.x + targetG.w / 2;
          goalie.x += (targetMid - goalie.x) * 0.08;
        }
      }

      ctx.save();
      const gx = goalie.x;
      const gy = goalie.y;

      // Keeper shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(gx, gy + 14, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Goalkeeper Jersey (Fluorescent Yellow-Green)
      ctx.fillStyle = '#facc15';
      ctx.fillRect(gx - 10, gy - 12, 20, 22);

      // Jersey Accent Stripe
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(gx - 10, gy - 2, 20, 4);

      // Number 1 on Jersey
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1', gx, gy + 8);

      // Goalkeeper Gloves
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.fillRect(gx - 16, gy - 6, 6, 10);
      ctx.strokeRect(gx - 16, gy - 6, 6, 10);
      ctx.fillRect(gx + 10, gy - 6, 6, 10);
      ctx.strokeRect(gx + 10, gy - 6, 6, 10);

      // Head & Cap
      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      ctx.arc(gx, gy - 18, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(gx - 8, gy - 26, 16, 6);
      ctx.restore();

      // 4. Directional Aiming Arrow from Player toward Selected Goal
      if (targetGoal && !ballRef.current.active && !gameOver) {
        ctx.save();
        const px = playerRef.current.x;
        const py = playerRef.current.y;
        const tMidX = targetGoal.x + targetGoal.w / 2;
        const tMidY = targetGoal.y + targetGoal.h;

        // Glowing targeting line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(tMidX, tMidY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow head at target goal
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(tMidX, tMidY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Draw Player Striker Character
      const px = playerRef.current.x;
      const py = playerRef.current.y;

      ctx.save();
      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(px, py + 22, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Striker body (Red jersey)
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(px - 10, py - 12, 20, 24);
      // Head
      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      ctx.arc(px, py - 18, 9, 0, Math.PI * 2);
      ctx.fill();
      // Shorts
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(px - 9, py + 12, 18, 10);
      ctx.restore();

      // 6. Ball Physics and Goalkeeper Collision Detection
      const ball = ballRef.current;
      if (ball.active) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.scale = Math.max(0.65, ball.scale - 0.012);

        const currentGoal = goalsRef.current[ball.targetGoalIndex];

        // Check Single Goalkeeper Save vs Goal Entrance
        if (currentGoal && ball.y <= currentGoal.y + currentGoal.h) {
          ball.active = false;
          setIsShooting(false);

          const goalieDist = Math.abs(ball.x - goalieRef.current.x);
          const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

          // Save check: if keeper is within 22px of the ball, keeper blocks it!
          const goalkeeperSaved = goalieDist < 22;

          if (goalkeeperSaved) {
            // GOALKEEPER SAVE: Ball bounces out, player gets to shoot again immediately!
            sound.playError();
            setFeedbackMsg(lang === 'id' ? `DITEPIK KIPER! Kiper menepis tembakan ke Gawang [${currentGoal.label}]. Waktukan dan tembak lagi!` : `SAVED BY KEEPER! Shot to Goal [${currentGoal.label}] was blocked. Time your shot and try again!`);
            // Reset ball to player
            ball.x = playerRef.current.x;
            ball.y = playerRef.current.y + 15;
            ball.scale = 1;
          } else {
            // BALL ENTERS GOAL!
            // Answer validation: does it match correct answer?
            if (currentGoal.isCorrect) {
              sound.playSuccess();
              setWon(true);
              setGameOver(true);
              setFeedbackMsg(lang === 'id' ? `GOOOL! Gawang [${currentGoal.label}] Benar!` : `GOAL! Goal [${currentGoal.label}] Correct!`);

              // Confetti
              for (let i = 0; i < 40; i++) {
                particlesRef.current.push({
                  x: ball.x,
                  y: ball.y,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  color: ['#10b981', '#38bdf8', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 4)],
                  life: 1.0,
                });
              }

              setTimeout(() => {
                onFinish({
                  questionId: question.id,
                  genre: 'soccer',
                  isCorrect: true,
                  scoreAwarded: question.points + 50,
                  accuracy: 100,
                  timeTakenSec,
                  combo: 1,
                });
              }, 1300);
            } else {
              // Entered incorrect goal
              sound.playError();
              if (hasSecondChance && !secondChanceTriggered) {
                setSecondChanceTriggered(true);
                setHasSecondChance(false);
                setHiddenOptionIds((prev) => [...prev, currentGoal.id]);
                setFeedbackMsg(lang === 'id' ? `Gawang [${currentGoal.label}] salah! Kesempatan kedua aktif!` : `Goal [${currentGoal.label}] incorrect! 2nd chance active!`);
                ball.x = playerRef.current.x;
                ball.y = playerRef.current.y + 15;
                ball.scale = 1;
                return;
              }

              setWon(false);
              setGameOver(true);
              setFeedbackMsg(lang === 'id' ? `Gawang [${currentGoal.label}] salah!` : `Goal [${currentGoal.label}] incorrect!`);

              setTimeout(() => {
                onFinish({
                  questionId: question.id,
                  genre: 'soccer',
                  isCorrect: false,
                  scoreAwarded: 0,
                  accuracy: 0,
                  timeTakenSec,
                  combo: 0,
                });
              }, 1400);
            }
          }
        }
      } else {
        // Ball stays at player's feet
        ball.x = playerRef.current.x;
        ball.y = playerRef.current.y + 16;
        ball.scale = 1;
      }

      // Draw Ball
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.scale(ball.scale, ball.scale);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Pentagons
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-3, -3, 6, 6);
      ctx.restore();

      // Render Particles
      particlesRef.current.forEach((pt, idx) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.03;
        if (pt.life > 0) {
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.life;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          particlesRef.current.splice(idx, 1);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selectedGoalIndex, isShooting, gameOver, hiddenOptionIds]);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto font-game">
      {/* Question Header Banner */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-[#112356] to-blue-950 border-2 border-amber-400 rounded-2xl p-3 sm:p-4 mb-2.5 shadow-[0_0_20px_rgba(251,191,36,0.25)] text-white text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-1.5 shadow">
          <span>⚽ 4-GOAL PENALTY QUIZ</span>
          <span>•</span>
          <span>{question.subject.toUpperCase()}</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-amber-300 drop-shadow leading-snug">
          {lang === 'id' && question.questionId ? question.questionId : question.question}
        </h2>
      </div>

      {/* Control Instruction Bar */}
      <div className="w-full bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-2.5 mb-2 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-400">
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-emerald-300 uppercase tracking-wider">
              {lang === 'id'
                ? 'ARAHKAN KE GAWANG JAWABAN (← / →), TEKAN ATAS (↑) UNTUK TENDANG'
                : 'AIM TOWARDS ANSWER GOAL (← / →), PRESS UP (↑) TO SHOOT'}
            </div>
            <div className="text-[11px] text-slate-300">
              {lang === 'id'
                ? 'Satu kiper menjaga gawang. Waktukan tembakanmu melewati kiper ke gawang yang benar!'
                : 'One keeper guards all goals. Time your shot past the keeper into the correct goal!'}
            </div>
          </div>
        </div>

        {feedbackMsg && (
          <div className="text-xs font-bold font-mono text-amber-300 bg-black/60 px-2.5 py-1 rounded-lg border border-amber-500/40 animate-pulse">
            {feedbackMsg}
          </div>
        )}
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full border-4 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl bg-black">
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          className="w-full max-w-[600px] h-auto block touch-none"
        />

        {/* Outcome Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 pointer-events-none">
            <div className={`text-2xl font-black mb-1 ${won ? 'text-emerald-400' : 'text-rose-400'}`}>
              {won
                ? lang === 'id'
                  ? 'GOOOOL! JAWABAN TEPAT!'
                  : 'GOAL! CORRECT ANSWER!'
                : lang === 'id'
                ? 'TEMBAKAN SALAH GAWANG'
                : 'MISSED TARGET'}
            </div>
            <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 max-w-md text-left text-xs text-slate-300 my-2">
              <span className="font-bold text-emerald-400">{lang === 'id' ? 'Penjelasan: ' : 'Explanation: '}</span>
              {question.explanation}
            </div>
          </div>
        )}
      </div>

      {/* 4 Goal Selection & Kick Controls */}
      <div className="w-full mt-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {goalsRef.current.map((g, idx) => {
            const isHidden = hiddenOptionIds.includes(g.id);
            const isSelected = selectedGoalIndex === idx;

            return (
              <button
                key={g.id}
                disabled={gameOver || isShooting || isHidden}
                onClick={() => {
                  sound.playTileSnap();
                  setSelectedGoalIndex(idx);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950 to-blue-950 border-cyan-400 ring-2 ring-cyan-400/50 shadow-md scale-102'
                    : isHidden
                    ? 'bg-slate-900/30 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                    : 'bg-slate-900/80 border-slate-700 hover:border-slate-500 text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {lang === 'id' ? `GAWANG ${g.label}` : `GOAL ${g.label}`}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] text-cyan-300 font-bold animate-pulse">
                      {lang === 'id' ? 'BIDIK' : 'AIMED'}
                    </span>
                  )}
                </div>
                <div className="text-xs font-extrabold text-amber-200 line-clamp-1 my-0.5">
                  {isHidden ? (lang === 'id' ? '[TERELIMINASI]' : '[ELIMINATED]') : g.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Steering & Kick Buttons */}
        <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 px-3 shadow-lg">
          <div className="flex items-center gap-1.5">
            <button
              disabled={isShooting || gameOver || selectedGoalIndex === 0}
              onClick={() => {
                sound.playTileSnap();
                setSelectedGoalIndex((prev) => Math.max(0, prev - 1));
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-600 text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Gawang Kiri (←)' : 'Goal Left (←)'}</span>
            </button>
            <button
              disabled={isShooting || gameOver || selectedGoalIndex === 3}
              onClick={() => {
                sound.playTileSnap();
                setSelectedGoalIndex((prev) => Math.min(3, prev + 1));
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-600 text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>{lang === 'id' ? 'Gawang Kanan (→)' : 'Goal Right (→)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            disabled={isShooting || gameOver}
            onClick={triggerKickToSelectedGoal}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.35)] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>
              {lang === 'id'
                ? `TENDANG KE GAWANG ${GOAL_CONFIGS[selectedGoalIndex]?.label} (↑ / ENTER)`
                : `SHOOT AT GOAL ${GOAL_CONFIGS[selectedGoalIndex]?.label} (↑ / ENTER)`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
