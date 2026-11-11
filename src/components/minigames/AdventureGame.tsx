import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { Sparkles, Coins, ArrowLeft, ArrowRight, ArrowUp, ShieldCheck, Heart, CheckCircle2, XCircle } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

interface QuestionBlock {
  id: string;
  index: number;
  label: string; // 'A', 'B', 'C', 'D'
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  isCorrect: boolean;
  bumpOffset: number;
  hit: boolean;
  state: 'idle' | 'correct' | 'wrong';
}

const BLOCK_POSITIONS = [
  { x: 50, label: 'A' },
  { x: 190, label: 'B' },
  { x: 330, label: 'C' },
  { x: 470, label: 'D' },
];

export const AdventureGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [playerHp, setPlayerHp] = useState<number>(3);
  const [feedback, setFeedback] = useState<{ text: string; type: 'correct' | 'wrong' } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hasSecondChance, setHasSecondChance] = useState<boolean>(false);
  const [secondChanceTriggered, setSecondChanceTriggered] = useState<boolean>(false);

  const startTimeRef = useRef<number>(Date.now());
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false,
  });

  // Player physics
  const playerRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    w: number;
    h: number;
    onGround: boolean;
    facing: 'left' | 'right';
  }>({
    x: 80,
    y: 220,
    vx: 0,
    vy: 0,
    w: 26,
    h: 32,
    onGround: false,
    facing: 'right',
  });

  // 4 Question-mark blocks
  const blocksRef = useRef<QuestionBlock[]>([]);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string; life: number; size: number }[]>([]);

  // Setup 4 blocks with question options
  useEffect(() => {
    const opts = question.options.slice(0, 4);
    blocksRef.current = BLOCK_POSITIONS.map((pos, idx) => {
      const opt = opts[idx] || { id: `opt_${idx}`, text: `Option ${pos.label}`, isCorrect: false };
      const optText = lang === 'id' && opt.textId ? opt.textId : opt.text;
      return {
        id: opt.id,
        index: idx,
        label: pos.label,
        x: pos.x,
        y: 145,
        w: 80,
        h: 46,
        text: optText,
        isCorrect: opt.isCorrect,
        bumpOffset: 0,
        hit: false,
        state: 'idle',
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        e.preventDefault();
        keysRef.current.jump = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') keysRef.current.jump = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const triggerBlockHit = (block: QuestionBlock) => {
    if (block.state === 'correct' || isFinished) return;
    if (hiddenOptionIds.includes(block.id)) {
      sound.playError();
      return;
    }

    // Bump animation
    block.bumpOffset = -12;
    setTimeout(() => {
      block.bumpOffset = 0;
    }, 120);

    const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    if (block.isCorrect) {
      block.hit = true;
      block.state = 'correct';
      sound.playSuccess();
      sound.playCoin();
      setFeedback({
        text: lang === 'id' ? `Hebat! Blok [${block.label}] adalah jawaban yang benar!` : `Awesome! Block [${block.label}] is correct!`,
        type: 'correct',
      });
      setIsWon(true);

      // Gold coin burst particles
      for (let i = 0; i < 35; i++) {
        particlesRef.current.push({
          x: block.x + block.w / 2,
          y: block.y - 10,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 8 - 4,
          color: ['#facc15', '#fbbf24', '#fef08a', '#22c55e'][Math.floor(Math.random() * 4)],
          life: 1.0,
          size: Math.random() * 6 + 3,
        });
      }

      setTimeout(() => {
        setIsFinished(true);
        onFinish({
          questionId: question.id,
          genre: 'adventure',
          isCorrect: true,
          scoreAwarded: question.points + 50,
          accuracy: 100,
          timeTakenSec,
          combo: 1,
        });
      }, 1400);
    } else {
      block.state = 'wrong';
      sound.playError();

      if (hasSecondChance && !secondChanceTriggered) {
        setSecondChanceTriggered(true);
        setHasSecondChance(false);
        setHiddenOptionIds((prev) => [...prev, block.id]);
        setFeedback({
          text: lang === 'id' ? `Blok [${block.label}] keliru! Kesempatan kedua aktif!` : `Block [${block.label}] wrong! Second chance active!`,
          type: 'wrong',
        });
        return;
      }

      setPlayerHp((h) => {
        const next = Math.max(0, h - 1);
        if (next === 0) {
          setIsFinished(true);
          setTimeout(() => {
            onFinish({
              questionId: question.id,
              genre: 'adventure',
              isCorrect: false,
              scoreAwarded: 0,
              accuracy: 0,
              timeTakenSec,
              combo: 0,
            });
          }, 1200);
        }
        return next;
      });

      setFeedback({
        text: lang === 'id' ? `Blok [${block.label}] salah! Coba lompat ke blok lainnya!` : `Block [${block.label}] is incorrect! Try jumping into another block!`,
        type: 'wrong',
      });
    }
  };

  // 2D Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = playerRef.current;

      if (!isFinished) {
        // Player movement
        const speed = 4.2;
        if (keysRef.current.left) {
          p.vx = -speed;
          p.facing = 'left';
        } else if (keysRef.current.right) {
          p.vx = speed;
          p.facing = 'right';
        } else {
          p.vx *= 0.72;
        }

        // Jump
        if (keysRef.current.jump && p.onGround) {
          p.vy = -9.2;
          p.onGround = false;
          sound.playJump();
        }

        // Gravity
        p.vy += 0.46;
        p.x += p.vx;
        p.y += p.vy;

        // Canvas bounds
        p.x = Math.max(10, Math.min(canvas.width - p.w - 10, p.x));

        // Ground collision (continuous level floor at y = 265)
        const groundY = 265;
        if (p.y + p.h >= groundY) {
          p.y = groundY - p.h;
          p.vy = 0;
          p.onGround = true;
        }

        // Collision with 4 Question Blocks
        blocksRef.current.forEach((b) => {
          const drawY = b.y + b.bumpOffset;
          // Check AABB collision
          if (
            p.x + p.w > b.x &&
            p.x < b.x + b.w &&
            p.y + p.h > drawY &&
            p.y < drawY + b.h
          ) {
            // Hit from underneath!
            if (p.vy < 0 && p.y > drawY + b.h - 14) {
              p.vy = 2.5; // bounce player down
              p.y = drawY + b.h + 2;
              triggerBlockHit(b);
            }
            // Land on top of block
            else if (p.vy > 0 && p.y + p.h - p.vy <= drawY + 8) {
              p.y = drawY - p.h;
              p.vy = 0;
              p.onGround = true;
            }
          }
        });
      }

      // 1. Sky & Background (Sunny Frutiger Aero XP vibe)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.6, '#7dd3fc');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rolling hills
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(100, 310, 90, 0, Math.PI, true);
      ctx.arc(300, 315, 120, 0, Math.PI, true);
      ctx.arc(500, 310, 90, 0, Math.PI, true);
      ctx.fill();

      // Fluffy clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      [70, 260, 480].forEach((cx, idx) => {
        const cy = 40 + (idx % 2) * 16;
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.arc(cx + 16, cy - 6, 22, 0, Math.PI * 2);
        ctx.arc(cx + 34, cy, 18, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ground (Lush grass with stone bricks)
      const groundY = 265;
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, groundY, canvas.width, 10);
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(0, groundY + 10, canvas.width, canvas.height - groundY - 10);
      for (let gx = 10; gx < canvas.width; gx += 28) {
        ctx.fillStyle = '#713f12';
        ctx.fillRect(gx, groundY + 16, 12, 10);
      }

      // 2. Draw 4 Yellow Question-Mark Blocks (?) with Overhead Answer Signs
      blocksRef.current.forEach((b) => {
        const drawY = b.y + b.bumpOffset;
        const isHidden = hiddenOptionIds.includes(b.id);

        // Overhead answer billboard
        const bannerW = 105;
        const bannerH = 48;
        const bannerX = b.x + b.w / 2 - bannerW / 2;
        const bannerY = drawY - 60;

        ctx.save();
        ctx.fillStyle = b.state === 'correct'
          ? 'rgba(6, 95, 70, 0.95)'
          : b.state === 'wrong'
          ? 'rgba(159, 18, 57, 0.9)'
          : isHidden
          ? 'rgba(30, 41, 59, 0.5)'
          : 'rgba(15, 23, 42, 0.88)';
        ctx.strokeStyle = b.state === 'correct'
          ? '#34d399'
          : b.state === 'wrong'
          ? '#f43f5e'
          : isHidden
          ? '#334155'
          : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 8);
        ctx.fill();
        ctx.stroke();

        // Choice label tag [A], [B], [C], [D]
        ctx.fillStyle = b.state === 'correct' ? '#6ee7b7' : '#fef08a';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`BLOCK [ ${b.label} ]`, b.x + b.w / 2, bannerY + 16);

        // Text snippet
        ctx.fillStyle = isHidden ? '#64748b' : '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        const rawText = isHidden ? 'ELIMINATED' : b.text;
        const truncated = rawText.length > 13 ? rawText.slice(0, 12) + '…' : rawText;
        ctx.fillText(truncated, b.x + b.w / 2, bannerY + 34);

        // Connecting strut to question block
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.x + b.w / 2, bannerY + bannerH);
        ctx.lineTo(b.x + b.w / 2, drawY);
        ctx.stroke();

        // Question Block (?)
        ctx.fillStyle = b.state === 'correct'
          ? '#22c55e'
          : b.state === 'wrong'
          ? '#64748b'
          : isHidden
          ? '#334155'
          : '#eab308';
        ctx.strokeStyle = b.state === 'correct'
          ? '#15803d'
          : b.state === 'wrong'
          ? '#334155'
          : isHidden
          ? '#1e293b'
          : '#ca8a04';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.roundRect(b.x, drawY, b.w, b.h, 6);
        ctx.fill();
        ctx.stroke();

        // Block internal bevel
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(b.x + 3, drawY + 3, b.w - 6, 4);

        // ? Mark icon or checkmark
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const glyph = b.state === 'correct' ? '✓' : b.state === 'wrong' ? '✗' : isHidden ? '-' : '?';
        ctx.fillText(glyph, b.x + b.w / 2, drawY + b.h / 2 + 1);

        // Corner rivets
        ctx.fillStyle = '#713f12';
        ctx.fillRect(b.x + 4, drawY + 4, 3, 3);
        ctx.fillRect(b.x + b.w - 7, drawY + 4, 3, 3);
        ctx.fillRect(b.x + 4, drawY + b.h - 7, 3, 3);
        ctx.fillRect(b.x + b.w - 7, drawY + b.h - 7, 3, 3);

        ctx.restore();
      });

      // 3. Draw Player Cadet (Mario-style platformer runner)
      ctx.save();
      ctx.translate(p.x, p.y);

      // Red shirt / cap
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(4, 2, 18, 14);

      // Blue overalls
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(4, 16, 18, 12);

      // Face
      ctx.fillStyle = '#fcd34d';
      ctx.fillRect(p.facing === 'right' ? 14 : 4, 5, 8, 7);

      // Boots
      ctx.fillStyle = '#78350f';
      ctx.fillRect(2, 28, 9, 4);
      ctx.fillRect(15, 28, 9, 4);

      ctx.restore();

      // 4. Render particles
      particlesRef.current.forEach((pt, idx) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.03;
        if (pt.life > 0) {
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.life;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
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
  }, [isFinished, hiddenOptionIds]);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto font-game">
      {/* Prominent Question Banner at Top */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-[#112356] to-blue-950 border-2 border-amber-400 rounded-2xl p-3 sm:p-4 mb-2.5 shadow-[0_0_20px_rgba(251,191,36,0.25)] text-white text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-1.5 shadow">
          <span>🍄 4-BLOCK PLATFORMER QUIZ</span>
          <span>•</span>
          <span>{question.subject.toUpperCase()}</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-amber-300 drop-shadow leading-snug">
          {lang === 'id' && question.questionId ? question.questionId : question.question}
        </h2>
      </div>

      {/* Instruction & Status HUD */}
      <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-2.5 mb-2 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-black">
            ?
          </div>
          <div>
            <div className="text-xs font-black text-amber-300 uppercase tracking-wider">
              {lang === 'id'
                ? 'LOMPAT DAN SUNDUL BLOK [?] PILIHANMU!'
                : 'JUMP & HIT THE [?] BLOCK OF YOUR CHOICE!'}
            </div>
            <div className="text-[11px] text-slate-300">
              {lang === 'id'
                ? 'Tekan Space / Tombol Lompat untuk menyundul balok kuning dari bawah'
                : 'Press Space / Jump button to strike the yellow block from underneath'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasSecondChance && (
            <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded font-bold">
              2nd CHANCE
            </span>
          )}
          <div className="flex items-center gap-1 text-rose-400 font-mono font-bold text-sm bg-black/40 px-2.5 py-1 rounded-lg border border-rose-500/30">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{playerHp}</span>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full border-4 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl bg-black">
        <canvas ref={canvasRef} width={600} height={320} className="w-full max-w-[600px] h-auto block" />

        {/* Realtime Feedback Toast */}
        {feedback && (
          <div
            className={`absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border text-xs font-black flex items-center gap-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 ${
              feedback.type === 'correct'
                ? 'bg-emerald-900/90 border-emerald-400 text-emerald-200'
                : 'bg-rose-900/90 border-rose-400 text-rose-200'
            }`}
          >
            {feedback.type === 'correct' ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <XCircle className="w-4 h-4 text-rose-300" />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Level Complete Overlay */}
        {isFinished && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 pointer-events-none">
            <div className={`text-2xl font-black mb-1 ${isWon ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isWon
                ? lang === 'id'
                  ? 'JAWABAN BENAR! BLOK TERPECAH BERSIH!'
                  : 'CORRECT BLOCK STRUCK!'
                : lang === 'id'
                ? 'KEHABISAN KESEMPATAN'
                : 'OUT OF ATTEMPTS'}
            </div>
            <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 max-w-md text-left text-xs text-slate-300 my-2">
              <span className="font-bold text-emerald-400">{lang === 'id' ? 'Penjelasan: ' : 'Explanation: '}</span>
              {question.explanation}
            </div>
          </div>
        )}
      </div>

      {/* 4 Block Clickable Answer Cards & Controls */}
      <div className="w-full mt-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
          {question.options.slice(0, 4).map((opt, idx) => {
            const block = blocksRef.current[idx];
            const isHidden = hiddenOptionIds.includes(opt.id);
            const isCorrect = block?.state === 'correct';
            const isWrong = block?.state === 'wrong';

            return (
              <button
                key={opt.id}
                disabled={isHidden || isFinished}
                onClick={() => {
                  if (block) triggerBlockHit(block);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isCorrect
                    ? 'border-emerald-400 bg-emerald-950/80 ring-2 ring-emerald-400/50'
                    : isWrong
                    ? 'border-rose-500 bg-rose-950/50 opacity-70'
                    : isHidden
                    ? 'border-slate-800 bg-slate-950/40 opacity-40 cursor-not-allowed'
                    : 'border-amber-500/40 bg-slate-900/80 hover:border-amber-300 hover:bg-amber-950/30'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                    BLOK {BLOCK_POSITIONS[idx].label}
                  </span>
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold text-amber-200 line-clamp-2 leading-snug">
                  {isHidden ? '[50:50 ELIMINATED]' : opt.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Movement Buttons for touch / mobile */}
        <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 px-3 shadow-lg">
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            🎮 <strong>A / D</strong>: Bergerak • <strong>SPACE / W</strong>: Lompat & Sundul
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onPointerDown={() => {
                keysRef.current.left = true;
              }}
              onPointerUp={() => {
                keysRef.current.left = false;
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-cyan-600 border border-slate-600 text-white text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'id' ? 'Kiri (A)' : 'Left (←)'}</span>
            </button>
            <button
              onPointerDown={() => {
                keysRef.current.right = true;
              }}
              onPointerUp={() => {
                keysRef.current.right = false;
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-cyan-600 border border-slate-600 text-white text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              <span>{lang === 'id' ? 'Kanan (D)' : 'Right (→)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onPointerDown={() => {
                keysRef.current.jump = true;
              }}
              onPointerUp={() => {
                keysRef.current.jump = false;
              }}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{lang === 'id' ? 'LOMPAT (SPACE)' : 'JUMP (SPACE)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
