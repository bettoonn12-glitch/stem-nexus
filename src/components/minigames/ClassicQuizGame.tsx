import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { CheckCircle2, XCircle, HelpCircle, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const ClassicQuizGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
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

  const handleSelectOption = (option: { id: string; text: string; isCorrect: boolean }) => {
    if (submitted) return;
    if (hiddenOptionIds.includes(option.id)) return;

    setSelectedOptionId(option.id);
    sound.playClick();
  };

  const handleConfirm = () => {
    if (!selectedOptionId || submitted) return;
    const selectedOption = question.options.find((o) => o.id === selectedOptionId);
    if (!selectedOption) return;

    const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    if (selectedOption.isCorrect) {
      sound.playSuccess();
      sound.playCoin();
      setSubmitted(true);
      setIsCorrect(true);

      setTimeout(() => {
        onFinish({
          questionId: question.id,
          genre: 'classic',
          isCorrect: true,
          scoreAwarded: question.points + 50,
          accuracy: 100,
          timeTakenSec,
          combo: 1,
        });
      }, 1200);
    } else {
      if (hasSecondChance && !secondChanceTriggered) {
        sound.playError();
        setSecondChanceTriggered(true);
        setHasSecondChance(false);
        setHiddenOptionIds((prev) => [...prev, selectedOption.id]);
        setSelectedOptionId(null);
        return;
      }

      sound.playError();
      setSubmitted(true);
      setIsCorrect(false);

      setTimeout(() => {
        onFinish({
          questionId: question.id,
          genre: 'classic',
          isCorrect: false,
          scoreAwarded: 0,
          accuracy: 0,
          timeTakenSec,
          combo: 0,
        });
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto font-game">
      {/* Prominent Question Banner */}
      <div className="w-full bg-gradient-to-r from-blue-950 via-[#112356] to-blue-950 border-2 border-amber-400 rounded-2xl p-4 sm:p-5 mb-3 shadow-[0_0_20px_rgba(251,191,36,0.25)] text-white text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 shadow">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lang === 'id' ? 'KUIS KLASIK RESMI' : 'CLASSIC QUIZ MODE'}</span>
          <span>•</span>
          <span>{question.subject.toUpperCase()}</span>
          {question.gradeLevel && (
            <span className="text-[10px] bg-slate-900 text-amber-300 px-1.5 py-0.2 rounded font-mono">
              {question.gradeLevel.toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="text-base sm:text-xl font-black text-amber-300 drop-shadow leading-snug">
          {lang === 'id' && question.questionId ? question.questionId : question.question}
        </h2>
      </div>

      {/* Answer Options Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          const isHidden = hiddenOptionIds.includes(opt.id);

          let optionStyle = 'border-slate-700 bg-slate-900/80 hover:border-cyan-400 hover:bg-cyan-950/30 text-white';
          if (isSelected) {
            optionStyle = 'border-cyan-400 bg-gradient-to-r from-cyan-950 to-blue-950 ring-2 ring-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] text-white';
          }
          if (submitted) {
            if (opt.isCorrect) {
              optionStyle = 'border-emerald-400 bg-emerald-950/90 text-emerald-200 ring-2 ring-emerald-400';
            } else if (isSelected && !opt.isCorrect) {
              optionStyle = 'border-rose-400 bg-rose-950/90 text-rose-200';
            }
          }
          if (isHidden) {
            optionStyle = 'border-slate-800 bg-slate-950/40 opacity-40 cursor-not-allowed text-slate-600';
          }

          return (
            <button
              key={opt.id}
              disabled={submitted || isHidden}
              onClick={() => handleSelectOption(opt)}
              className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer group active:scale-98 ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950'
                  }`}
                >
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="text-sm font-bold leading-snug">
                  {isHidden
                    ? (lang === 'id' ? '[50:50 TERELIMINASI]' : '[50:50 ELIMINATED]')
                    : (lang === 'id' && opt.textId ? opt.textId : opt.text)}
                </span>
              </div>

              {submitted && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {submitted && isSelected && !opt.isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
            </button>
          );
        })}
      </div>

      {/* Confirmation Button */}
      <div className="w-full flex items-center justify-between bg-slate-900/80 border border-slate-700 rounded-2xl p-3">
        <div className="text-xs text-slate-400 font-mono">
          {hasSecondChance && (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === 'id' ? 'Kesempatan kedua aktif!' : 'Second chance active!'}
            </span>
          )}
          {!hasSecondChance && (
            <span>
              {lang === 'id' ? 'Pilih salah satu jawaban di atas, lalu klik Konfirmasi' : 'Choose an option above, then click Confirm'}
            </span>
          )}
        </div>

        <button
          disabled={!selectedOptionId || submitted}
          onClick={handleConfirm}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'id' ? 'KONFIRMASI JAWABAN' : 'CONFIRM ANSWER'}</span>
        </button>
      </div>

      {/* Post-submit explanation */}
      {submitted && (
        <div className="w-full mt-3 bg-slate-900/90 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 animate-in fade-in">
          <div className="font-bold text-cyan-400 mb-1">
            {isCorrect
              ? (lang === 'id' ? '✅ Jawaban Benar!' : '✅ Correct Answer!')
              : (lang === 'id' ? '❌ Jawaban Kurang Tepat' : '❌ Incorrect Answer')}
          </div>
          <div>{question.explanation}</div>
          {question.formula && (
            <div className="mt-2 font-mono text-amber-300 bg-black/50 p-2 rounded-lg border border-slate-800">
              {question.formula}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
