import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { Crosshair, Zap, RotateCcw, ShieldAlert, Award, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

export const ShooterGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hasSecondChance, setHasSecondChance] = useState<boolean>(false);
  const [secondChanceTriggered, setSecondChanceTriggered] = useState<boolean>(false);

  const startTimeRef = useRef<number>(Date.now());

  // Targets state
  const targetsRef = useRef<
    { id: string; text: string; isCorrect: boolean; x: number; y: number; vx: number; radius: number; destroyed: boolean }[]
  >([]);

  // Cannon state
  const cannonPosRef = useRef<number>(300);
  const laserRef = useRef<{ x: number; y: number; vy: number; active: boolean } | null>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);

  useEffect(() => {
    // Initialize moving targets
    targetsRef.current = question.options.map((opt, idx) => {
      const optText = lang === 'id' && opt.textId ? opt.textId : opt.text;
      return {
        id: opt.id,
        text: optText,
        isCorrect: opt.isCorrect,
        x: 80 + idx * 135,
        y: 65 + (idx % 2) * 35,
        vx: (idx % 2 === 0 ? 1 : -1) * (0.8 + Math.random() * 0.4),
        radius: 44,
        destroyed: false,
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

  const shoot = () => {
    if (gameOver) return;
    sound.playLaser();
    laserRef.current = {
      x: cannonPosRef.current,
      y: 280,
      vy: -14,
      active: true,
    };
  };

  const shootTargetDirectly = (opt: { id: string; text: string; isCorrect: boolean }) => {
    if (gameOver || hiddenOptionIds.includes(opt.id)) return;
    const target = targetsRef.current.find((t) => t.id === opt.id);
    if (target) {
      cannonPosRef.current = target.x;
    }
    shoot();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        cannonPosRef.current = Math.max(40, cannonPosRef.current - 45);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        cannonPosRef.current = Math.min(560, cannonPosRef.current + 45);
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') {
        e.preventDefault();
        shoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space starry background
      ctx.fillStyle = '#060f26';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 24; i++) {
        const sx = (i * 37 + Date.now() * 0.02) % canvas.width;
        const sy = (i * 23) % canvas.height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw and update laser
      if (laserRef.current && laserRef.current.active) {
        laserRef.current.y += laserRef.current.vy;

        // Laser beam
        ctx.fillStyle = '#22d3ee';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 12;
        ctx.fillRect(laserRef.current.x - 3, laserRef.current.y, 6, 24);
        ctx.shadowBlur = 0;

        // Check collision with targets
        targetsRef.current.forEach((t) => {
          if (!t.destroyed && !hiddenOptionIds.includes(t.id)) {
            const dx = laserRef.current!.x - t.x;
            const dy = laserRef.current!.y - t.y;
            if (Math.hypot(dx, dy) < t.radius) {
              laserRef.current!.active = false;
              t.destroyed = true;

              // Spawn particles
              for (let p = 0; p < 24; p++) {
                particlesRef.current.push({
                  x: t.x,
                  y: t.y,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  life: 1,
                  color: t.isCorrect ? '#10b981' : '#f43f5e',
                });
              }

              const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

              if (t.isCorrect) {
                sound.playSuccess();
                setScore((s) => s + question.points);
                setWon(true);
                setGameOver(true);
                setSelectedAnswer(t.text);
                onFinish({
                  questionId: question.id,
                  genre: 'shooter',
                  isCorrect: true,
                  scoreAwarded: question.points,
                  accuracy: 100,
                  timeTakenSec,
                  combo: 1,
                });
              } else {
                if (hasSecondChance && !secondChanceTriggered) {
                  sound.playError();
                  setSecondChanceTriggered(true);
                  setHasSecondChance(false);
                  setHiddenOptionIds((prev) => [...prev, t.id]);
                  return;
                }

                sound.playError();
                setWon(false);
                setGameOver(true);
                setSelectedAnswer(t.text);
                onFinish({
                  questionId: question.id,
                  genre: 'shooter',
                  isCorrect: false,
                  scoreAwarded: 0,
                  accuracy: 0,
                  timeTakenSec,
                  combo: 0,
                });
              }
            }
          }
        });

        if (laserRef.current.y < 0) {
          laserRef.current.active = false;
        }
      }

      // Update & draw targets
      targetsRef.current.forEach((t) => {
        if (!t.destroyed) {
          const isHidden = hiddenOptionIds.includes(t.id);
          t.x += t.vx;
          if (t.x < t.radius || t.x > canvas.width - t.radius) {
            t.vx *= -1;
          }

          // Target Body
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(t.x, t.y, 5, t.x, t.y, t.radius);
          if (isHidden) {
            grad.addColorStop(0, '#475569');
            grad.addColorStop(1, '#1e293b');
          } else {
            grad.addColorStop(0, '#38bdf8');
            grad.addColorStop(0.7, '#0284c7');
            grad.addColorStop(1, '#0c4a6e');
          }
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = isHidden ? '#64748b' : '#e0f2fe';
          ctx.stroke();

          // Target text
          ctx.fillStyle = isHidden ? '#94a3b8' : '#ffffff';
          ctx.font = 'bold 13px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(isHidden ? '50:50' : t.text, t.x, t.y);
        }
      });

      // Update & draw particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
          ctx.fill();
        } else {
          particlesRef.current.splice(idx, 1);
        }
      });

      // Draw Player Cannon at bottom
      const cx = cannonPosRef.current;
      const cy = canvas.height - 25;

      // Base
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath();
      ctx.arc(cx, cy, 24, Math.PI, 0);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      // Barrel
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(cx - 5, cy - 22, 10, 22);

      // Aiming guide
      ctx.beginPath();
      ctx.moveTo(cx, cy - 22);
      ctx.lineTo(cx, 0);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [question, gameOver, hiddenOptionIds]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameOver) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (600 / rect.width);
    cannonPosRef.current = Math.max(30, Math.min(570, x));
    shoot();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (600 / rect.width);
    cannonPosRef.current = Math.max(30, Math.min(570, x));
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto font-game">
      {/* Prominent Question Banner at Top of Quiz */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-[#112356] to-blue-950 border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 mb-3 shadow-[0_0_20px_rgba(251,191,36,0.25)] text-white text-center animate-in fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 shadow">
          <span>❓ {lang === 'id' ? 'PERTANYAAN KUIS' : 'QUIZ QUESTION'}</span>
          <span>•</span>
          <span>{question.subject.toUpperCase()}</span>
          {question.gradeLevel && (
            <span className="text-[10px] bg-slate-900 text-amber-300 px-1.5 py-0.2 rounded font-mono">
              {question.gradeLevel === 'sd' ? 'SD (Kelas 1-6)' : question.gradeLevel === 'smp' ? 'SMP (Kelas 7-9)' : 'SD & SMP'}
            </span>
          )}
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-black text-amber-300 drop-shadow leading-snug">
          {lang === 'id' && question.questionId ? question.questionId : question.question}
        </h2>
      </div>

      {/* Objective & How to Play */}
      <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-3.5 mb-2.5 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-400">
            <Crosshair className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <span>{lang === 'id' ? 'PENEMBAK TARGET ARCADE' : 'RETRO ARCADE SHOOTER'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 font-normal">{lang === 'id' && question.titleId ? question.titleId : question.title}</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {lang === 'id' && question.objectiveTextId ? question.objectiveTextId : question.objectiveText}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400">BOUNTY</div>
          <div className="text-base font-extrabold text-amber-400 font-mono">+{question.points} XP</div>
        </div>
      </div>

      {/* Arcade Canvas Screen */}
      <div className="relative border-4 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl bg-[#060f26]">
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          className="w-full max-w-[600px] h-auto cursor-crosshair block"
        />

        {/* Prompt */}
        {!gameOver && (
          <div className="absolute top-2 inset-x-2 flex items-center justify-between text-[11px] text-cyan-300 font-mono bg-blue-950/80 px-3 py-1 rounded-lg border border-cyan-500/30 pointer-events-none">
            <span>🎯 {lang === 'id' ? 'Arahkan mouse dan tembak drone target yang benar!' : 'Aim and shoot the drone target containing the correct answer!'}</span>
            {hasSecondChance && (
              <span className="text-yellow-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 2nd Chance
              </span>
            )}
          </div>
        )}

        {/* Game Over Feedback Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-2 animate-in zoom-in-95">
            <div className={`text-2xl font-black ${won ? 'text-emerald-300' : 'text-rose-400'}`}>
              {won
                ? lang === 'id'
                  ? '🎯 TEMBAKAN TEPAT! DRONE MUSNAH!'
                  : '🎯 DIRECT HIT! TARGET DESTROYED!'
                : lang === 'id'
                ? '💥 TEMBAKAN SALAH!'
                : '💥 TARGET HIT: WRONG VALUE!'}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 max-w-md">{question.explanation}</p>
            {question.formula && (
              <div className="p-2 rounded-xl bg-blue-900 border border-cyan-400/40 text-yellow-300 font-mono text-xs">
                {question.formula}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instant Target Lock & Shoot Buttons */}
      <div className="w-full mt-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center justify-between">
          <span>🎯 {lang === 'id' ? 'KETUK DRONE TARGET UNTUK MENEMBAK:' : 'TAP AN ANSWER DRONE TO SHOOT:'}</span>
          <span className="text-slate-400 font-normal">Auto-Aim</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {question.options.map((opt, idx) => {
            const isHidden = hiddenOptionIds.includes(opt.id);

            return (
              <button
                key={opt.id}
                disabled={gameOver || isHidden}
                onClick={() => shootTargetDirectly(opt)}
                className={`p-2.5 rounded-xl border text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
                  isHidden
                    ? 'bg-slate-900/30 border-slate-800 text-slate-600 opacity-50'
                    : 'bg-gradient-to-b from-slate-900 to-blue-950 hover:from-cyan-950 hover:to-blue-900 border-cyan-500/30 hover:border-cyan-400 text-white shadow-md active:scale-95'
                }`}
              >
                <div className="text-[10px] text-cyan-300 uppercase font-semibold">
                  {lang === 'id' ? `Drone 0${idx + 1}` : `Drone 0${idx + 1}`}
                </div>
                <div className="text-sm font-extrabold text-amber-300 font-mono my-0.5">{opt.text}</div>
                <div className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                  {lang === 'id' ? 'TEMBAK 💥' : 'SHOOT 💥'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
