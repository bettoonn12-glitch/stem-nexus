import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { Puzzle, CheckCircle2, XCircle, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

export const PuzzleGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const [slottedId, setSlottedId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hasSecondChance, setHasSecondChance] = useState<boolean>(false);
  const [secondChanceTriggered, setSecondChanceTriggered] = useState<boolean>(false);

  const startTimeRef = useRef<number>(Date.now());

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

  const handleSelectTile = (optId: string) => {
    if (isFinished || hiddenOptionIds.includes(optId)) return;
    sound.playTileSnap();
    setSlottedId(optId);
  };

  const handleVerifyPuzzle = () => {
    if (!slottedId || isFinished) return;
    setIsVerifying(true);

    const chosen = question.options.find((o) => o.id === slottedId);
    const isCorrect = chosen?.isCorrect || false;
    const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    setTimeout(() => {
      setIsVerifying(false);

      if (isCorrect) {
        sound.playSuccess();
        setIsFinished(true);
        setIsSuccess(true);
        onFinish({
          questionId: question.id,
          genre: 'puzzle',
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
          setHiddenOptionIds((prev) => [...prev, slottedId]);
          setSlottedId(null);
          return;
        }

        sound.playError();
        setIsFinished(true);
        setIsSuccess(false);
        onFinish({
          questionId: question.id,
          genre: 'puzzle',
          isCorrect: false,
          scoreAwarded: 0,
          accuracy: 0,
          timeTakenSec,
          combo: 0,
        });
      }
    }, 500);
  };

  const selectedOption = question.options.find((o) => o.id === slottedId);

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

      {/* Header */}
      <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5 mb-2.5 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <span>{lang === 'id' ? 'TEKA-TEKI MATRIKS LOGIKA' : 'LOGIC MATRIX PUZZLE'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 font-normal">{lang === 'id' && question.titleId ? question.titleId : question.title}</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {lang === 'id' && question.objectiveTextId ? question.objectiveTextId : question.objectiveText}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400">REWARD</div>
          <div className="text-base font-extrabold text-amber-400 font-mono">+{question.points} XP</div>
        </div>
      </div>

      {/* Main Puzzle Matrix Board */}
      <div className="w-full relative rounded-2xl border-4 border-slate-700/80 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 p-6 flex flex-col items-center justify-center min-h-[330px]">
        {/* Circuit Board Trace Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Question Statement Display */}
        <div className="w-full max-w-lg bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 text-center mb-5 z-10 shadow-inner">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1 font-bold">
            {lang === 'id' ? 'SPESIFIKASI RANGKAIAN LOGIKA' : 'CIRCUIT EQUATION SPECIFICATION'}
          </div>
          <div className="text-sm font-medium text-slate-200">
            {lang === 'id' && question.questionId ? question.questionId : question.question}
          </div>
          {hasSecondChance && (
            <div className="mt-2 text-xs text-emerald-300 font-bold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Power-up Kesempatan Kedua Aktif' : 'Second Chance Power-up Active'}</span>
            </div>
          )}
        </div>

        {/* Puzzle Target Slot */}
        <div className="flex flex-col items-center z-10 my-2">
          <div className="text-xs font-mono text-slate-400 mb-2">
            {lang === 'id' ? 'SOKET KONEKTOR TARGET' : 'TARGET CONNECTOR SOCKET'}
          </div>
          <div
            className={`w-72 h-20 rounded-2xl border-3 border-dashed flex items-center justify-center transition-all duration-200 shadow-xl ${
              selectedOption
                ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                : 'border-slate-600 bg-slate-900/40 text-slate-500'
            }`}
          >
            {selectedOption ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧩</span>
                <span className="text-base font-black font-mono text-amber-300">
                  {lang === 'id' && selectedOption.textId ? selectedOption.textId : selectedOption.text}
                </span>
              </div>
            ) : (
              <span className="text-xs font-mono text-slate-400 animate-pulse">
                {lang === 'id' ? '[KETUK DATA TILE DI BAWAH]' : '[CLICK A DATA TILE BELOW TO INSERT]'}
              </span>
            )}
          </div>
        </div>

        {/* Outcome Feedback */}
        {isFinished && (
          <div className="w-full max-w-lg mt-4 bg-slate-900/95 border border-slate-700 rounded-xl p-4 text-center z-20 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-center gap-2 text-xl font-black mb-1">
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-400">
                    {lang === 'id' ? 'MATRIKS LOGIKA SEIMBANG!' : 'CIRCUIT MATRIX BALANCED!'}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-400" />
                  <span className="text-rose-400">
                    {lang === 'id' ? 'KEGAGALAN SIRKUIT TERDETEKSI!' : 'CIRCUIT FAULT DETECTED!'}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-300 text-left mt-2">
              <span className="font-bold text-amber-400">Logic Verification: </span>
              {question.explanation}
            </p>
            {question.formula && (
              <div className="mt-2 font-mono text-xs text-cyan-300 bg-black/60 p-2 rounded border border-cyan-900 text-left">
                {question.formula}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selectable Data Tiles */}
      <div className="w-full mt-2.5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> {lang === 'id' ? 'DATA TILES TERSEDIA:' : 'AVAILABLE TILES:'}
          </div>
          {slottedId && !isFinished && (
            <button
              onClick={handleVerifyPuzzle}
              disabled={isVerifying}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-lg shadow-lg active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4" />
              {isVerifying ? (lang === 'id' ? 'MEMVERIFIKASI...' : 'VERIFYING...') : (lang === 'id' ? 'KUNCI & PASANG' : 'LOCK & ENGAGE')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {question.options.map((opt) => {
            const isHidden = hiddenOptionIds.includes(opt.id);

            return (
              <button
                key={opt.id}
                disabled={isFinished || isHidden}
                onClick={() => handleSelectTile(opt.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isHidden
                    ? 'bg-slate-900/30 border-slate-800 text-slate-600 opacity-50'
                    : slottedId === opt.id
                    ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
                    {opt.id.toUpperCase()}
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono text-slate-200">
                    {lang === 'id' && opt.textId ? opt.textId : opt.text}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {isHidden ? '[50:50]' : slottedId === opt.id ? 'SLOTTED' : 'INSERT'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
