import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { Target, Sparkles, ShieldCheck, Crosshair, ArrowRight } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

interface Hoop {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  width: number;
}

export const BasketballGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hasSecondChance, setHasSecondChance] = useState<boolean>(false);
  const [secondChanceTriggered, setSecondChanceTriggered] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Drag-to-aim target position (drags TOWARDS the hoop, NOT pull-back)
  const [isAiming, setIsAiming] = useState<boolean>(false);
  const targetAimRef = useRef<{ x: number; y: number }>({ x: 280, y: 110 });

  const startTimeRef = useRef<number>(Date.now());

  // Ball physics
  const BALL_START = { x: 75, y: 240 };
  const ballRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    inFlight: boolean;
    rotation: number;
  }>({
    x: BALL_START.x,
    y: BALL_START.y,
    vx: 0,
    vy: 0,
    inFlight: false,
    rotation: 0,
  });

  // Hoops
  const hoopsRef = useRef<Hoop[]>([]);

  useEffect(() => {
    const labels = ['A', 'B', 'C', 'D'];
    hoopsRef.current = question.options.slice(0, 4).map((opt, idx) => {
      const optText = lang === 'id' && opt.textId ? opt.textId : opt.text;
      return {
        id: opt.id,
        label: labels[idx] || `0${idx + 1}`,
        text: optText,
        isCorrect: opt.isCorrect,
        x: 165 + idx * 105,
        y: 90 + (idx % 2) * 20,
        width: 60,
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

  // Launch towards specified coordinate
  const launchBallTowards = (targetX: number, targetY: number) => {
    if (isShooting || gameOver) return;
    setIsShooting(true);
    sound.playClick();
    setFeedbackMsg(null);

    const dx = targetX - BALL_START.x;
    const dy = targetY - BALL_START.y;
    const distance = Math.hypot(dx, dy);
    // Flight time in animation frames
    const flightTime = Math.min(46, Math.max(26, distance / 9.5));
    const gravity = 0.38;

    const vx = dx / flightTime;
    const vy = (dy - 0.5 * gravity * flightTime * flightTime) / flightTime;

    ballRef.current = {
      x: BALL_START.x,
      y: BALL_START.y,
      vx,
      vy,
      inFlight: true,
      rotation: 0,
    };
  };

  // Pointer drag to aim handlers (DRAG DIRECTLY TOWARDS TARGET)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isShooting || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Start aiming with target placed at or towards cursor
    setIsAiming(true);
    targetAimRef.current = {
      x: Math.max(140, Math.min(canvas.width - 20, clickX)),
      y: Math.max(40, Math.min(canvas.height - 60, clickY)),
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isAiming || isShooting || gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const moveX = (e.clientX - rect.left) * scaleX;
    const moveY = (e.clientY - rect.top) * scaleY;

    targetAimRef.current = {
      x: Math.max(130, Math.min(canvas.width - 20, moveX)),
      y: Math.max(30, Math.min(230, moveY)),
    };
  };

  const handlePointerUp = () => {
    if (!isAiming || isShooting || gameOver) return;
    setIsAiming(false);
    launchBallTowards(targetAimRef.current.x, targetAimRef.current.y);
  };

  // Canvas Game Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Basketball Arena Background
      const wallGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      wallGrad.addColorStop(0, '#0a192f');
      wallGrad.addColorStop(0.65, '#1e3a8a');
      wallGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hardwood Floor
      const floorY = 270;
      const floorGrad = ctx.createLinearGradient(0, floorY, 0, canvas.height);
      floorGrad.addColorStop(0, '#b45309');
      floorGrad.addColorStop(0.5, '#d97706');
      floorGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, floorY, canvas.width, canvas.height - floorY);

      // Court Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(canvas.width, floorY);
      ctx.stroke();

      // Free throw arc
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.arc(80, floorY, 65, Math.PI * 1.5, Math.PI * 0.5, false);
      ctx.stroke();

      // 2. Draw Hoops with Answer Billboards
      hoopsRef.current.forEach((h) => {
        const isHidden = hiddenOptionIds.includes(h.id);

        // Backboard Pole
        ctx.fillStyle = '#475569';
        ctx.fillRect(h.x + h.width - 2, h.y - 35, 6, 120);

        // Backboard Glass
        ctx.fillStyle = isHidden ? '#334155' : 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = isHidden ? '#475569' : '#0284c7';
        ctx.lineWidth = 2;
        ctx.fillRect(h.x + h.width - 4, h.y - 35, 8, 48);
        ctx.strokeRect(h.x + h.width - 4, h.y - 35, 8, 48);

        // Rim
        ctx.strokeStyle = isHidden ? '#64748b' : '#ea580c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(h.x, h.y);
        ctx.lineTo(h.x + h.width, h.y);
        ctx.stroke();

        // Net lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(h.x + 4, h.y);
        ctx.lineTo(h.x + 14, h.y + 26);
        ctx.lineTo(h.x + h.width - 14, h.y + 26);
        ctx.lineTo(h.x + h.width - 4, h.y);
        ctx.stroke();

        // Answer Tag Label on Rim
        const bannerW = h.width + 36;
        const bannerH = 42;
        const bannerX = h.x + h.width / 2 - bannerW / 2;
        const bannerY = h.y - 56;

        ctx.save();
        ctx.fillStyle = isHidden ? 'rgba(30, 41, 59, 0.6)' : 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = isHidden ? '#475569' : '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 6);
        ctx.fill();
        ctx.stroke();

        // Choice label [A] / [B] / [C] / [D]
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`HOOP [ ${h.label} ]`, h.x + h.width / 2, bannerY + 14);

        // Option text
        ctx.fillStyle = isHidden ? '#64748b' : '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        const rawText = isHidden ? 'ELIMINATED' : h.text;
        const truncated = rawText.length > 13 ? rawText.slice(0, 12) + '…' : rawText;
        ctx.fillText(truncated, h.x + h.width / 2, bannerY + 30);
        ctx.restore();
      });

      // 3. Draw Player Sprite at Left
      ctx.save();
      const px = 40;
      const py = 200;
      // Body
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(px, py + 18, 22, 26);
      // Head
      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      ctx.arc(px + 11, py + 10, 10, 0, Math.PI * 2);
      ctx.fill();
      // Cap
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(px + 2, py, 18, 6);
      // Arm holding/aiming
      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(px + 16, py + 24);
      ctx.lineTo(BALL_START.x, BALL_START.y);
      ctx.stroke();
      ctx.restore();

      // 4. Interactive Drag Aiming Indicator (Target Crosshair & Parabolic Trajectory)
      if (isAiming) {
        const tx = targetAimRef.current.x;
        const ty = targetAimRef.current.y;

        // Draw Animated Target Crosshair at Cursor Target
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tx, ty, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx - 20, ty);
        ctx.lineTo(tx + 20, ty);
        ctx.moveTo(tx, ty - 20);
        ctx.lineTo(tx, ty + 20);
        ctx.stroke();

        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Parabolic Flight Trajectory Preview directly towards Target
        const dx = tx - BALL_START.x;
        const dy = ty - BALL_START.y;
        const dist = Math.hypot(dx, dy);
        const flightTime = Math.min(46, Math.max(26, dist / 9.5));
        const gravity = 0.38;
        let simX = BALL_START.x;
        let simY = BALL_START.y;
        let simVx = dx / flightTime;
        let simVy = (dy - 0.5 * gravity * flightTime * flightTime) / flightTime;

        ctx.save();
        ctx.fillStyle = '#fde047';
        for (let i = 0; i < flightTime; i += 2) {
          simX += simVx * 2;
          simY += simVy * 2;
          simVy += gravity * 2;
          ctx.beginPath();
          ctx.arc(simX, simY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 5. Ball Physics & Rendering
      const ball = ballRef.current;
      if (ball.inFlight) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += 0.38; // gravity
        ball.rotation += 0.15;

        // Check basket collision
        hoopsRef.current.forEach((h) => {
          if (
            ball.x > h.x - 10 &&
            ball.x < h.x + h.width + 10 &&
            ball.y > h.y - 12 &&
            ball.y < h.y + 24 &&
            ball.vy > 0
          ) {
            sound.playSwish();
            ball.inFlight = false;
            setIsShooting(false);

            const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

            if (h.isCorrect) {
              sound.playSuccess();
              setWon(true);
              setGameOver(true);
              setFeedbackMsg(lang === 'id' ? `SWISH! Ring [${h.label}] Benar!` : `SWISH! Hoop [${h.label}] Correct!`);

              setTimeout(() => {
                onFinish({
                  questionId: question.id,
                  genre: 'basketball',
                  isCorrect: true,
                  scoreAwarded: question.points + 50,
                  accuracy: 100,
                  timeTakenSec,
                  combo: 1,
                });
              }, 1200);
            } else {
              sound.playError();
              if (hasSecondChance && !secondChanceTriggered) {
                setSecondChanceTriggered(true);
                setHasSecondChance(false);
                setHiddenOptionIds((prev) => [...prev, h.id]);
                setFeedbackMsg(lang === 'id' ? `Ring [${h.label}] salah! Kesempatan kedua aktif!` : `Hoop [${h.label}] missed! 2nd chance active!`);
                // Reset ball to player hands
                ball.x = BALL_START.x;
                ball.y = BALL_START.y;
                ball.vx = 0;
                ball.vy = 0;
                return;
              }

              setWon(false);
              setGameOver(true);
              setFeedbackMsg(lang === 'id' ? `Ring [${h.label}] salah!` : `Hoop [${h.label}] incorrect!`);

              setTimeout(() => {
                onFinish({
                  questionId: question.id,
                  genre: 'basketball',
                  isCorrect: false,
                  scoreAwarded: 0,
                  accuracy: 0,
                  timeTakenSec,
                  combo: 0,
                });
              }, 1400);
            }
          }
        });

        // Missed shot bounces off floor and resets to player hands
        if (ball.y > floorY + 10) {
          ball.inFlight = false;
          setIsShooting(false);
          setFeedbackMsg(lang === 'id' ? 'Tembakan meleset! Coba bidik langsung ke ring lagi.' : 'Shot missed! Aim directly at the hoop.');
          ball.x = BALL_START.x;
          ball.y = BALL_START.y;
          ball.vx = 0;
          ball.vy = 0;
        }
      }

      // Draw Basketball
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);

      // Ball body
      const ballGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 12);
      ballGrad.addColorStop(0, '#f97316');
      ballGrad.addColorStop(0.8, '#ea580c');
      ballGrad.addColorStop(1, '#9a3412');
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();

      // Ball seams
      ctx.strokeStyle = '#431407';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-11, 0);
      ctx.lineTo(11, 0);
      ctx.moveTo(0, -11);
      ctx.lineTo(0, 11);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isAiming, isShooting, gameOver, hiddenOptionIds]);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto font-game">
      {/* Prominent Question Banner */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-[#112356] to-blue-950 border-2 border-amber-400 rounded-2xl p-3 sm:p-4 mb-2.5 shadow-[0_0_20px_rgba(251,191,36,0.25)] text-white text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-1.5 shadow">
          <span>🏀 DRAG-TO-AIM BASKETBALL</span>
          <span>•</span>
          <span>{question.subject.toUpperCase()}</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-amber-300 drop-shadow leading-snug">
          {lang === 'id' && question.questionId ? question.questionId : question.question}
        </h2>
      </div>

      {/* Aiming Telemetry Instruction Bar */}
      <div className="w-full bg-slate-900/90 border border-orange-500/30 rounded-2xl p-2.5 mb-2 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-500/20 border border-orange-400/40 rounded-xl text-orange-400">
            <Crosshair className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-orange-300 uppercase tracking-wider">
              {lang === 'id'
                ? 'BIDIK LANGSUNG KE RING DENGAN MENARIK KURSOR'
                : 'DRAG AIMING TARGET DIRECTLY TOWARD THE HOOP'}
            </div>
            <div className="text-[11px] text-slate-300">
              {lang === 'id'
                ? 'Klik dan seret target ke arah ring jawaban pilihanmu, lalu lepas untuk menembak!'
                : 'Click and drag the reticle towards your chosen hoop, then release to shoot!'}
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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full max-w-[600px] h-auto block cursor-crosshair touch-none"
        />

        {/* Finished / Outcome Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 pointer-events-none">
            <div className={`text-2xl font-black mb-1 ${won ? 'text-emerald-400' : 'text-rose-400'}`}>
              {won
                ? lang === 'id'
                  ? 'SWISH! JAWABAN TEPAT!'
                  : 'SWISH! CORRECT HOOP!'
                : lang === 'id'
                ? 'TEMBAKAN KURANG TEPAT'
                : 'SHOT MISSED'}
            </div>
            <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 max-w-md text-left text-xs text-slate-300 my-2">
              <span className="font-bold text-orange-400">{lang === 'id' ? 'Penjelasan: ' : 'Explanation: '}</span>
              {question.explanation}
            </div>
          </div>
        )}
      </div>

      {/* Four Hoop Instant Aim & Tap Buttons */}
      <div className="w-full mt-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center justify-between">
          <span>🏀 {lang === 'id' ? 'ATAU KETUK RING TUJUAN UNTUK TEMBAK OTOMATIS:' : 'OR TAP TARGET HOOP TO AUTO-AIM & SHOOT:'}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {hoopsRef.current.map((h, idx) => {
            const isHidden = hiddenOptionIds.includes(h.id);
            return (
              <button
                key={h.id}
                disabled={gameOver || isShooting || isHidden}
                onClick={() => launchBallTowards(h.x + h.width / 2, h.y)}
                className={`p-2.5 rounded-xl border text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
                  isHidden
                    ? 'bg-slate-900/30 border-slate-800 text-slate-600 opacity-50'
                    : 'bg-gradient-to-b from-slate-900 to-amber-950/60 hover:from-amber-900/50 hover:to-orange-900/50 border-amber-500/30 hover:border-amber-400 text-white shadow-md active:scale-95'
                }`}
              >
                <div className="text-[10px] text-amber-300 uppercase font-semibold">
                  RING [ {h.label} ]
                </div>
                <div className="text-xs font-extrabold text-amber-200 line-clamp-1 my-0.5">
                  {h.text}
                </div>
                <div className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                  {lang === 'id' ? 'BIDIK & TEMBAK 🎯' : 'AIM & SHOOT 🎯'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
