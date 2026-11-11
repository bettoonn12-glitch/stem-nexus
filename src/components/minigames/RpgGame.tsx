import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion, GameResult } from '../../types/game';
import { sound } from '../../utils/audio';
import { Shield, Sparkles, Sword, Heart, Zap, Flame, ShieldCheck } from 'lucide-react';
import { PowerUpType } from '../../types/powerups';

interface Props {
  question: GameQuestion;
  onFinish: (result: GameResult) => void;
  activePowerUp?: PowerUpType | null;
  onConsumePowerUp?: (type: PowerUpType) => void;
  lang?: 'en' | 'id';
}

export const RpgGame: React.FC<Props> = ({
  question,
  onFinish,
  activePowerUp,
  onConsumePowerUp,
  lang = 'en',
}) => {
  // HP states
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);

  // Battle phases: 'dialogue' | 'attack_player' | 'attack_enemy' | 'victory' | 'defeat'
  const [phase, setPhase] = useState<'dialogue' | 'attack_player' | 'attack_enemy' | 'victory' | 'defeat'>('dialogue');
  const [battleLog, setBattleLog] = useState<string>(
    lang === 'id'
      ? 'Entropy Shade liar muncul! Perintahkan Cyber-Spark dengan rumus yang tepat!'
      : 'A wild Entropy Shade appeared! Command Cyber-Spark with the correct formula!'
  );
  const [shakeEnemy, setShakeEnemy] = useState<boolean>(false);
  const [shakePlayer, setShakePlayer] = useState<boolean>(false);
  const [attackVfx, setAttackVfx] = useState<string | null>(null);

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

  const handleCommandAttack = (option: { id: string; text: string; isCorrect: boolean }) => {
    if (phase !== 'dialogue') return;

    const timeTakenSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    if (option.isCorrect) {
      // Player attack animation
      setPhase('attack_player');
      sound.playLaser();
      setAttackVfx(lang === 'id' ? 'CYBER-SPARK menggunakan SAMBARAN PETIR TIK!' : 'CYBER-SPARK used QUANTUM VOLT STRIKE!');
      setBattleLog(lang === 'id' ? `Cyber-Spark melepaskan formula: ${option.text}!` : `Cyber-Spark unleashes equation: ${option.text}!`);

      setTimeout(() => {
        sound.playSlash();
        setShakeEnemy(true);
        setEnemyHp(0);
        setBattleLog(lang === 'id' ? 'SERANGAN KRITIS! Entropy Shade musnah!' : 'CRITICAL HIT! Entropy Shade fainted!');

        setTimeout(() => {
          setShakeEnemy(false);
          sound.playSuccess();
          setPhase('victory');
          onFinish({
            questionId: question.id,
            genre: 'rpg',
            isCorrect: true,
            scoreAwarded: question.points + 50,
            accuracy: 100,
            timeTakenSec,
            combo: 1,
          });
        }, 1200);
      }, 700);
    } else {
      if (hasSecondChance && !secondChanceTriggered) {
        sound.playError();
        setSecondChanceTriggered(true);
        setHasSecondChance(false);
        setHiddenOptionIds((prev) => [...prev, option.id]);
        setBattleLog(lang === 'id' ? 'Perhitungan meleset! Power-up Kesempatan Kedua melindungi Cyber-Spark!' : 'Calculation error! Second Chance power-up protected Cyber-Spark!');
        return;
      }

      // Enemy counter-attack
      setPhase('attack_enemy');
      sound.playError();
      setAttackVfx(lang === 'id' ? 'ENTROPY SHADE membalas dengan GELOMBANG KEGELAPAN!' : 'ENTROPY SHADE counters with COSMIC SHADOW PULSE!');
      setBattleLog(lang === 'id' ? 'Perhitungan salah! Cyber-Spark terkena serangan balasan!' : 'Formula miscalculated! Cyber-Spark absorbed recoil damage!');

      setTimeout(() => {
        sound.playError();
        setShakePlayer(true);
        setPlayerHp(20);

        setTimeout(() => {
          setShakePlayer(false);
          setPhase('defeat');
          onFinish({
            questionId: question.id,
            genre: 'rpg',
            isCorrect: false,
            scoreAwarded: 0,
            accuracy: 0,
            timeTakenSec,
            combo: 0,
          });
        }, 1200);
      }, 700);
    }
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

      {/* Objective Header */}
      <div className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl p-3.5 mb-2.5 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-500/20 border border-purple-400/40 rounded-xl text-purple-400">
            <Sword className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
              <span>{lang === 'id' ? 'PERTARUNGAN MONSTER POKÉ-STYLE' : 'CREATURE BATTLE ARENA'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 font-normal">{lang === 'id' && question.titleId ? question.titleId : question.title}</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {lang === 'id' && question.objectiveTextId ? question.objectiveTextId : question.objectiveText}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-bold text-slate-400">EXP BOUNTY</div>
          <div className="text-base font-extrabold text-amber-400 font-mono">+{question.points + 50} XP</div>
        </div>
      </div>

      {/* Pokémon-Style Battle Stage Box */}
      <div className="w-full relative rounded-2xl overflow-hidden border-4 border-slate-700/80 shadow-2xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 p-4 min-h-[360px] flex flex-col justify-between">
        {/* Background Retro Grid & Battle Pedestals */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top-Right: Enemy Creature Status & Sprite */}
        <div className="flex justify-between items-start z-10">
          <div />

          {/* Enemy Info Card */}
          <div className="bg-black/75 backdrop-blur-md border-2 border-purple-500/40 rounded-2xl p-3 w-64 shadow-xl">
            <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
              <span className="text-purple-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> ENTROPY SHADE
              </span>
              <span className="text-[11px] font-mono text-amber-300">Lv. 25</span>
            </div>

            {/* Enemy HP Meter */}
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-700 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  enemyHp > 50
                    ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                    : enemyHp > 20
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-600 to-red-500'
                }`}
                style={{ width: `${enemyHp}%` }}
              />
            </div>
            <div className="text-[10px] text-right font-mono text-slate-400 mt-0.5">
              HP: {enemyHp}/100
            </div>
          </div>
        </div>

        {/* Center Arena: Dual perspective Creature Sprites */}
        <div className="relative flex justify-between items-center px-6 my-2 z-10">
          {/* Player Companion: Cyber-Spark (Electric Sprite) */}
          <div
            className={`flex flex-col items-center transition-all ${
              shakePlayer ? 'animate-bounce text-rose-500' : ''
            }`}
          >
            {/* Cyber-Spark 2D Avatar Sprite with Electric Aura */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 border-3 border-amber-300 shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center text-5xl animate-pulse">
                ⚡
              </div>
              {/* Electric spark particles */}
              <div className="absolute -top-2 -right-2 text-yellow-300 text-lg animate-ping">✨</div>
              <div className="absolute -bottom-2 -left-2 text-cyan-300 text-sm">✦</div>
            </div>

            {/* Grass Battle Pedestal */}
            <div className="w-32 h-6 bg-slate-800/80 rounded-full border border-cyan-500/40 -mt-2 -z-10 shadow-lg" />
            <span className="text-xs font-black text-cyan-300 tracking-wider mt-1">CYBER-SPARK</span>
          </div>

          {/* Floating Attack VFX Banner */}
          {attackVfx && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 border-2 border-amber-400 px-5 py-2.5 rounded-2xl text-amber-300 font-black text-xs sm:text-sm shadow-2xl z-30 animate-in zoom-in-95">
              {attackVfx}
            </div>
          )}

          {/* Enemy Sprite: Entropy Shade */}
          <div
            className={`flex flex-col items-center transition-all ${
              shakeEnemy ? 'animate-ping scale-75 opacity-50' : ''
            }`}
          >
            <div className="relative">
              <div
                className={`w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-950 via-rose-950 to-indigo-950 border-4 border-rose-500 shadow-[0_0_35px_rgba(244,63,94,0.7)] flex items-center justify-center text-5xl ${
                  enemyHp === 0 ? 'opacity-20 scale-50' : 'animate-bounce'
                }`}
                style={{ animationDuration: '3s' }}
              >
                👾
              </div>
            </div>
            {/* Dark Matter Battle Pedestal */}
            <div className="w-36 h-6 bg-purple-950/80 rounded-full border border-rose-500/40 -mt-2 -z-10 shadow-lg" />
            <span className="text-xs font-black text-rose-400 tracking-wider mt-1">
              {enemyHp > 0 ? 'ENTROPY SHADE' : 'DEFEATED!'}
            </span>
          </div>
        </div>

        {/* Bottom Section: Player Creature Status & Dialogue / Move Console */}
        <div className="z-10 space-y-2">
          {/* Player Creature Info Box */}
          <div className="flex justify-start">
            <div className="bg-black/75 backdrop-blur-md border-2 border-cyan-500/40 rounded-2xl p-2.5 w-60 shadow-xl">
              <div className="flex justify-between items-center text-xs font-bold text-white mb-0.5">
                <span className="text-cyan-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" /> CYBER-SPARK
                </span>
                <span className="text-[11px] font-mono text-cyan-300">Lv. 24</span>
              </div>
              {/* Player HP */}
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-700 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
              <div className="text-[10px] text-right font-mono text-slate-400 mt-0.5">
                HP: {playerHp}/100
              </div>
            </div>
          </div>

          {/* Dialogue & Command Box */}
          <div className="bg-slate-950/95 border-2 border-indigo-400/50 rounded-2xl p-3.5 shadow-2xl">
            <div className="text-xs text-amber-300 font-mono mb-2 flex items-center justify-between">
              <span className="font-bold">&gt; {battleLog}</span>
              {hasSecondChance && (
                <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Second Chance
                </span>
              )}
            </div>

            {/* Move / Formula Selection Grid */}
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((opt, idx) => {
                const isHidden = hiddenOptionIds.includes(opt.id);
                if (isHidden) {
                  return (
                    <div
                      key={opt.id}
                      className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/30 text-slate-600 text-xs text-center font-mono"
                    >
                      [ 50:50 DISABLED ]
                    </div>
                  );
                }

                return (
                  <button
                    key={opt.id}
                    disabled={phase !== 'dialogue'}
                    onClick={() => handleCommandAttack(opt)}
                    className="p-3 rounded-xl border border-indigo-500/40 hover:border-cyan-300 bg-gradient-to-r from-slate-900 to-indigo-950/70 hover:from-cyan-950 hover:to-indigo-900 text-white shadow-lg active:scale-98 transition-all cursor-pointer text-left flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-[10px] text-cyan-300 uppercase font-semibold">
                        ⚡ {lang === 'id' ? `JURUS 0${idx + 1}` : `MOVE 0${idx + 1}`}
                      </div>
                      <div className="text-sm font-extrabold text-amber-300 font-mono group-hover:text-yellow-200">
                        {lang === 'id' && opt.textId ? opt.textId : opt.text}
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-lg">
                      {lang === 'id' ? 'SERANG' : 'STRIKE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Victory Screen */}
        {phase === 'victory' && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-40 animate-in zoom-in-95">
            <div className="text-3xl font-black text-cyan-300 drop-shadow mb-1 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-amber-300 animate-spin" />
              <span>{lang === 'id' ? 'KEMENANGAN TELAK!' : 'VICTORY ACHIEVED!'}</span>
            </div>
            <p className="text-sm text-slate-200 font-medium mb-2">
              {lang === 'id' ? 'Entropy Shade berhasil dikalahkan dengan pembuktian rumus ilmiah!' : 'Entropy Shade defeated with flawless scientific calculation!'}
            </p>
            <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3.5 max-w-md text-left text-xs text-slate-300">
              <span className="font-bold text-cyan-400">{lang === 'id' ? 'Teorema Pertarungan: ' : 'Battle Theorem: '}</span>
              {lang === 'id' && question.explanationId ? question.explanationId : question.explanation}
              {question.formula && (
                <div className="mt-1 font-mono text-amber-300 bg-black/50 p-2 rounded border border-purple-900">
                  {question.formula}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
