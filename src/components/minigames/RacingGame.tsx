import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { Gauge, Zap, Flame, AlertTriangle, ShieldCheck, Clock, Sparkles, ArrowLeft, ArrowRight, ArrowUp, CheckCircle2 } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

const LANE_CENTERS = [115, 238, 362, 485];
const LANE_LABELS = ['A', 'B', 'C', 'D'];

export const RacingGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Phases:
  // 'cruise' -> car cruises at medium speed (~70 mph)
  // 'braking' -> car decelerates smoothly to 0 mph at checkpoint
  // 'stopped' -> car completely stopped; player switches lanes (A, B, C, D) and presses UP / Confirm
  // 'nitro_boost' -> correct answer! accelerates forward
  // 'penalty_stall' -> wrong answer! engine stalled
  // 'finished' -> finish
  const [phase, setPhase] = useState<'cruise' | 'braking' | 'stopped' | 'nitro_boost' | 'penalty_stall' | 'finished'>('cruise');
  const [speedMph, setSpeedMph] = useState<number>(75);
  const [currentLane, setCurrentLane] = useState<number>(1); // 0 to 3
  const [targetLane, setTargetLane] = useState<number>(1);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hasSecondChance, setHasSecondChance] = useState<boolean>(false);
  const [secondChanceTriggered, setSecondChanceTriggered] = useState<boolean>(false);
  const [penaltyCountdown, setPenaltyCountdown] = useState<number>(2);
  const [isWon, setIsWon] = useState<boolean>(false);

  const startTimeRef = useRef<number>(Date.now());
  const roadOffsetRef = useRef<number>(0);
  const carXRef = useRef<number>(LANE_CENTERS[1]);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string; life: number; size: number }[]>([]);

  // 4 answer choices mapped to 4 lanes
  const laneOptions = question.options.slice(0, 4);

  // Power-up effects
  useEffect(() => {
    if (activePowerUp === 'fifty_fifty') {
      const wrongOptions = question.options.filter((o) => !o.isCorrect);
      const toHide = wrongOptions.slice(0, 2).map((o) => o.id);
      setHiddenOptionIds(toHide);
      if (onConsumePowerUp) onConsumePowerUp('fifty_fifty');
    } else if (activePowerUp === 'second_chance') {
      setHasSecondChance(true);
      if (onConsumePowerUp) onConsumePowerUp('second_chance');
    }
  }, [activePowerUp]);

  // Initial drive then smooth stop for question
  useEffect(() => {
    const cruiseTimer = setTimeout(() => {
      setPhase('braking');
      sound.playLaser();
    }, 1200);

    return () => clearTimeout(cruiseTimer);
  }, []);

  // Keyboard navigation: Left/Right to change lane, Up/Enter to confirm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'stopped') return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setTargetLane((prev) => {
          const next = Math.max(0, prev - 1);
          if (next !== prev) {
            sound.playTileSnap();
          }
          return next;
        });
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setTargetLane((prev) => {
          const next = Math.min(3, prev + 1);
          if (next !== prev) {
            sound.playTileSnap();
          }
          return next;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        confirmAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, targetLane, hiddenOptionIds]);

  const confirmAnswer = () => {
    if (phase !== 'stopped') return;
    const selectedOption = laneOptions[targetLane];
    if (!selectedOption) return;

    if (hiddenOptionIds.includes(selectedOption.id)) {
      sound.playError();
      return;
    }

    const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    if (selectedOption.isCorrect) {
      sound.playEngineRev();
      sound.playSuccess();
      setPhase('nitro_boost');
      setIsWon(true);

      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: carXRef.current + (Math.random() - 0.5) * 20,
          y: 260,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 8 + 4,
          color: ['#06b6d4', '#38bdf8', '#3b82f6', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 5)],
          life: 1.0,
          size: Math.random() * 6 + 3,
        });
      }

      setTimeout(() => {
        setPhase('finished');
        onFinish({
          questionId: question.id,
          genre: 'racing',
          isCorrect: true,
          scoreAwarded: question.points + 50,
          accuracy: 100,
          timeTakenSec,
          combo: 1,
        });
      }, 1500);
    } else {
      if (hasSecondChance && !secondChanceTriggered) {
        sound.playError();
        setSecondChanceTriggered(true);
        setHasSecondChance(false);
        setHiddenOptionIds((prev) => [...prev, selectedOption.id]);
        return;
      }

      sound.playError();
      setPhase('penalty_stall');
      setIsWon(false);

      for (let i = 0; i < 25; i++) {
        particlesRef.current.push({
          x: carXRef.current + (Math.random() - 0.5) * 25,
          y: 240,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 3 - 2,
          color: ['#475569', '#334155', '#1e293b', '#64748b'][Math.floor(Math.random() * 4)],
          life: 1.0,
          size: Math.random() * 7 + 3,
        });
      }

      let count = 2;
      const interval = setInterval(() => {
        count -= 1;
        setPenaltyCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
          setPhase('finished');
          onFinish({
            questionId: question.id,
            genre: 'racing',
            isCorrect: false,
            scoreAwarded: 0,
            accuracy: 0,
            timeTakenSec,
            combo: 0,
          });
        }
      }, 1000);
    }
  };

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Speed transitions (medium speed ~75 mph)
      if (phase === 'cruise') {
        // Cruising along
      } else if (phase === 'braking') {
        setSpeedMph((prev) => {
          const next = Math.max(0, prev - 4);
          if (next === 0) {
            setPhase('stopped');
          }
          return next;
        });
      } else if (phase === 'stopped') {
        // Zero speed
      } else if (phase === 'nitro_boost') {
        setSpeedMph((prev) => Math.min(135, prev + 8));
      } else if (phase === 'penalty_stall') {
        setSpeedMph(0);
      }

      // Smooth horizontal lerp for car lane positioning
      const targetX = LANE_CENTERS[targetLane];
      carXRef.current += (targetX - carXRef.current) * 0.22;

      // 1. Cyber Highway Background
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road asphalt
      const roadGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      roadGrad.addColorStop(0, '#111827');
      roadGrad.addColorStop(1, '#0b0f19');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(40, 0, canvas.width - 80, canvas.height);

      // Neon shoulders
      ctx.fillStyle = '#065f46';
      ctx.fillRect(0, 0, 40, canvas.height);
      ctx.fillRect(canvas.width - 40, 0, 40, canvas.height);

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 0);
      ctx.lineTo(40, canvas.height);
      ctx.moveTo(canvas.width - 40, 0);
      ctx.lineTo(canvas.width - 40, canvas.height);
      ctx.stroke();

      // Road lane scrolling dashes
      const currentSpeed = speedMph;
      const scrollStep = currentSpeed * 0.09;
      if (currentSpeed > 0) {
        roadOffsetRef.current = (roadOffsetRef.current + scrollStep) % 40;
      }

      // 4 Lanes dividers (x at ~177, 300, 423)
      const laneDividers = [177, 300, 423];
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([16, 16]);
      ctx.lineDashOffset = -roadOffsetRef.current;

      laneDividers.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // 2. Highlight currently selected lane
      const laneLefts = [40, 177, 300, 423];
      const laneWidths = [137, 123, 123, 137];
      const selectedLeft = laneLefts[targetLane];
      const selectedWidth = laneWidths[targetLane];

      ctx.save();
      const highlightGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      highlightGrad.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      highlightGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.22)');
      highlightGrad.addColorStop(1, 'rgba(6, 182, 212, 0.35)');
      ctx.fillStyle = highlightGrad;
      ctx.fillRect(selectedLeft, 0, selectedWidth, canvas.height);

      // Active lane glow border
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(selectedLeft + 2, 2, selectedWidth - 4, canvas.height - 4);
      ctx.restore();

      // 3. Draw Lane Overhead Answer Banners
      LANE_CENTERS.forEach((centerX, idx) => {
        const opt = laneOptions[idx];
        const isHidden = opt ? hiddenOptionIds.includes(opt.id) : false;
        const isSelected = targetLane === idx;

        // Banner box
        const boxWidth = 110;
        const boxHeight = 52;
        const boxX = centerX - boxWidth / 2;
        const boxY = 18;

        ctx.save();
        if (isSelected) {
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 14;
        }

        ctx.fillStyle = isSelected
          ? 'rgba(14, 116, 144, 0.95)'
          : isHidden
          ? 'rgba(30, 41, 59, 0.5)'
          : 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = isSelected ? '#38bdf8' : isHidden ? '#334155' : '#0284c7';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
        ctx.fill();
        ctx.stroke();

        // Lane letter badge (A, B, C, D)
        ctx.fillStyle = isSelected ? '#fef08a' : '#94a3b8';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`[ ${LANE_LABELS[idx]} ]`, centerX, boxY + 16);

        // Option text snippet
        ctx.fillStyle = isHidden ? '#64748b' : '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        const rawText = opt ? (lang === 'id' && opt.textId ? opt.textId : opt.text) : '';
        const displayText = isHidden ? (lang === 'id' ? 'TERELIMINASI' : 'ELIMINATED') : rawText;
        const truncated = displayText.length > 13 ? displayText.slice(0, 12) + '…' : displayText;
        ctx.fillText(truncated, centerX, boxY + 36);

        // Arrow indicator pointing down to car if selected
        if (isSelected && phase === 'stopped') {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(centerX - 8, boxY + boxHeight + 4);
          ctx.lineTo(centerX + 8, boxY + boxHeight + 4);
          ctx.lineTo(centerX, boxY + boxHeight + 14);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      // 4. Draw Player Racecar
      const carX = carXRef.current;
      const carY = 230;

      // Skid marks if braking
      if (phase === 'braking') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(carX - 20, carY + 20, 7, 30);
        ctx.fillRect(carX + 13, carY + 20, 7, 30);
      }

      // Nitro exhaust flames
      if (phase === 'nitro_boost') {
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.moveTo(carX - 10, carY + 34);
        ctx.lineTo(carX, carY + 60 + Math.random() * 12);
        ctx.lineTo(carX + 10, carY + 34);
        ctx.fill();

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.moveTo(carX - 5, carY + 34);
        ctx.lineTo(carX, carY + 46 + Math.random() * 8);
        ctx.lineTo(carX + 5, carY + 34);
        ctx.fill();
      }

      // Car shadow
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath();
      ctx.roundRect(carX - 24, carY - 30, 48, 68, 10);
      ctx.fill();

      // Main Chassis
      const chassisGrad = ctx.createLinearGradient(carX - 20, carY, carX + 20, carY);
      chassisGrad.addColorStop(0, '#dc2626');
      chassisGrad.addColorStop(0.5, '#ef4444');
      chassisGrad.addColorStop(1, '#b91c1c');
      ctx.fillStyle = chassisGrad;
      ctx.beginPath();
      ctx.roundRect(carX - 20, carY - 28, 40, 62, 8);
      ctx.fill();
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Windshield & Canopy
      const glassGrad = ctx.createLinearGradient(carX, carY - 14, carX, carY + 4);
      glassGrad.addColorStop(0, '#0284c7');
      glassGrad.addColorStop(1, '#38bdf8');
      ctx.fillStyle = glassGrad;
      ctx.beginPath();
      ctx.roundRect(carX - 13, carY - 12, 26, 18, 4);
      ctx.fill();

      // Headlights / Tail lights
      ctx.fillStyle = phase === 'braking' || phase === 'stopped' ? '#f43f5e' : '#fbbf24';
      ctx.fillRect(carX - 16, carY - 26, 7, 3);
      ctx.fillRect(carX + 9, carY - 26, 7, 3);

      ctx.fillStyle = phase === 'braking' || phase === 'stopped' ? '#ff0033' : '#b91c1c';
      ctx.fillRect(carX - 15, carY + 30, 8, 3);
      ctx.fillRect(carX + 7, carY + 30, 8, 3);

      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(carX - 24, carY - 20, 5, 14);
      ctx.fillRect(carX + 19, carY - 20, 5, 14);
      ctx.fillRect(carX - 24, carY + 10, 5, 14);
      ctx.fillRect(carX + 19, carY + 10, 5, 14);

      // Rear Spoiler
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(carX - 21, carY + 26, 42, 5);

      // 5. Render particles
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
  }, [phase, speedMph, targetLane, hiddenOptionIds]);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto font-game">
      {/* Question Header Banner */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-[#112356] to-blue-950 border-2 border-amber-400 rounded-2xl p-3 sm:p-4 mb-2.5 shadow-[0_0_20px_rgba(251,191,36,0.25)] text-white text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-1.5 shadow">
          <span>🏎️ 4-LANE DRIVING QUIZ</span>
          <span>•</span>
          <span>{question.subject.toUpperCase()}</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-amber-300 drop-shadow leading-snug">
          {lang === 'id' && question.questionId ? question.questionId : question.question}
        </h2>
      </div>

      {/* Telemetry Bar */}
      <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-2.5 mb-2 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-400">
            <Gauge className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold">
              {phase === 'stopped'
                ? lang === 'id'
                  ? '🛑 MOBIL BERHENTI — PILIH JALUR & TEKAN ATAS'
                  : '🛑 VEHICLE STOPPED — SELECT LANE & PRESS UP'
                : lang === 'id'
                ? 'MENDEKATI POS PERTANYAAN...'
                : 'APPROACHING QUESTION CHECKPOINT...'}
            </div>
            <div className="text-xs text-slate-300">
              {lang === 'id'
                ? 'Gunakan Panah Kiri/Kanan untuk pindah jalur, Panah Atas untuk konfirmasi'
                : 'Use Left/Right arrows to steer, Up arrow to confirm answer'}
            </div>
          </div>
        </div>

        {/* Speedometer */}
        <div className="text-right">
          <div className="text-[9px] uppercase font-bold text-slate-400">
            {phase === 'stopped' ? 'STATUS' : 'SPEED'}
          </div>
          <div
            className={`text-base font-black font-mono flex items-center justify-end gap-1 ${
              phase === 'stopped'
                ? 'text-rose-400 animate-pulse'
                : phase === 'nitro_boost'
                ? 'text-cyan-300'
                : 'text-amber-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> {speedMph} MPH
          </div>
        </div>
      </div>

      {/* Main Driving Canvas Viewport */}
      <div className="relative w-full border-4 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl bg-black">
        <canvas
          ref={canvasRef}
          width={600}
          height={320}
          className="w-full max-w-[600px] h-auto block"
        />

        {/* Lane Click Targets for Mouse/Touch */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-auto">
          {[0, 1, 2, 3].map((laneIdx) => (
            <div
              key={laneIdx}
              onClick={() => {
                if (phase === 'stopped') {
                  setTargetLane(laneIdx);
                  sound.playTileSnap();
                }
              }}
              className="cursor-pointer h-full hover:bg-cyan-500/10 transition-colors"
              title={`Lane ${LANE_LABELS[laneIdx]}`}
            />
          ))}
        </div>

        {/* Nitro Boost Overlay */}
        {phase === 'nitro_boost' && (
          <div className="absolute inset-0 bg-cyan-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 pointer-events-none">
            <div className="text-3xl font-black text-cyan-300 drop-shadow flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
              <span>{lang === 'id' ? 'DORONGAN NITRO DIAKTIFKAN!' : 'NITRO BOOST ENGAGED!'}</span>
            </div>
            <p className="text-sm text-slate-100 font-bold mt-1">
              {lang === 'id' ? 'Jawaban Jalur Benar! Mobil melesat maju!' : 'Correct Lane! Rocketing past the checkpoint!'}
            </p>
          </div>
        )}

        {/* Penalty Stall Overlay */}
        {phase === 'penalty_stall' && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 pointer-events-none">
            <div className="text-2xl font-black text-rose-400 drop-shadow mb-1">
              {lang === 'id' ? 'MESIN MOGOK — PENALTI WAKTU' : 'ENGINE STALLED — PENALTY DELAY'}
            </div>
            <p className="text-xs text-slate-300 max-w-md mb-2">{question.explanation}</p>
            <div className="text-sm font-bold text-amber-300 font-mono flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{lang === 'id' ? `Melanjutkan dalam: ${penaltyCountdown}s` : `Restarting in: ${penaltyCountdown}s`}</span>
            </div>
          </div>
        )}

        {/* Finished Screen */}
        {phase === 'finished' && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-200 pointer-events-none">
            <div className={`text-2xl font-black mb-1 ${isWon ? 'text-cyan-300' : 'text-rose-400'}`}>
              {isWon ? (lang === 'id' ? 'JUARA 1! JAWABAN TEPAT!' : '1ST PLACE! SPRINT FINISHED!') : (lang === 'id' ? 'FINISH DENGAN PENALTI' : 'FINISH WITH PENALTY')}
            </div>
            <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 max-w-md text-left text-xs text-slate-300 my-2">
              <span className="font-bold text-cyan-400">{lang === 'id' ? 'Penjelasan: ' : 'Explanation: '}</span>
              {question.explanation}
            </div>
          </div>
        )}
      </div>

      {/* 4 Lanes Detailed Answer Cards & Touch Controls */}
      <div className="w-full mt-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
          {laneOptions.map((opt, idx) => {
            const isHidden = hiddenOptionIds.includes(opt.id);
            const isSelected = targetLane === idx;
            return (
              <button
                key={opt.id}
                disabled={phase !== 'stopped' || isHidden}
                onClick={() => {
                  setTargetLane(idx);
                  sound.playTileSnap();
                }}
                className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-950 to-blue-950 ring-2 ring-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : isHidden
                    ? 'border-slate-800 bg-slate-950/40 opacity-40 cursor-not-allowed'
                    : 'border-slate-700 bg-slate-900/80 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-xs font-black px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    LANE {LANE_LABELS[idx]}
                  </span>
                  {isSelected && <span className="text-[10px] text-cyan-300 font-bold animate-pulse">CAR HERE</span>}
                </div>
                <div className={`text-xs font-bold leading-snug line-clamp-2 ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                  {isHidden
                    ? (lang === 'id' ? '[50:50 TERELIMINASI]' : '[50:50 ELIMINATED]')
                    : (lang === 'id' && opt.textId ? opt.textId : opt.text)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Steering & Confirmation Controls for Keyboard & Touch */}
        <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 px-3 shadow-lg">
          <div className="flex items-center gap-1.5">
            <button
              disabled={phase !== 'stopped' || targetLane === 0}
              onClick={() => {
                setTargetLane((prev) => Math.max(0, prev - 1));
                sound.playTileSnap();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Jalur Kiri (A)' : 'Lane Left (←)'}</span>
            </button>
            <button
              disabled={phase !== 'stopped' || targetLane === 3}
              onClick={() => {
                setTargetLane((prev) => Math.min(3, prev + 1));
                sound.playTileSnap();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>{lang === 'id' ? 'Jalur Kanan (D)' : 'Lane Right (→)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            disabled={phase !== 'stopped'}
            onClick={confirmAnswer}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.35)] active:scale-95 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            <span>
              {lang === 'id'
                ? `GAS JALUR ${LANE_LABELS[targetLane]} (↑ / ENTER)`
                : `DRIVE LANE ${LANE_LABELS[targetLane]} (↑ / ENTER)`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
