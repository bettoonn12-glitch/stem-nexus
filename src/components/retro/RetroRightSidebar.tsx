import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Gift, BarChart3, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  totalScore: number;
  maxScore: number;
  overallPercentage: number;
  onOpenScorecard: () => void;
  onClaimDailyBonus: () => void;
}

const DAILY_REWARD_KEY = 'stem_nexus_daily_reward_claimed_date';

export const RetroRightSidebar: React.FC<Props> = ({
  totalScore,
  maxScore,
  overallPercentage,
  onOpenScorecard,
  onClaimDailyBonus,
}) => {
  const todayStr = new Date().toISOString().slice(0, 10);

  const [bonusClaimed, setBonusClaimed] = useState<boolean>(() => {
    try {
      const savedDate = localStorage.getItem(DAILY_REWARD_KEY);
      return savedDate === todayStr;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const savedDate = localStorage.getItem(DAILY_REWARD_KEY);
      if (savedDate === todayStr) {
        setBonusClaimed(true);
      }
    } catch {
      // ignore
    }
  }, [todayStr]);

  const missions = [
    { title: 'Complete 1 Challenge', xp: '+200 XP', done: totalScore > 0 },
    { title: 'Study for 10 Minutes', xp: '+100 XP', done: true },
    { title: 'Get 80%+ in a Quiz', xp: '+300 XP', done: overallPercentage >= 70 },
  ];

  const completedMissionsCount = missions.filter((m) => m.done).length;

  const handleClaim = () => {
    if (bonusClaimed) return;
    try {
      localStorage.setItem(DAILY_REWARD_KEY, todayStr);
    } catch {
      // ignore
    }
    sound.playLevelUp();
    setBonusClaimed(true);
    onClaimDailyBonus();
  };

  // Rank computation
  const getRank = (pct: number) => {
    if (pct >= 85) return { grade: 'S', label: 'Master Elite', color: 'from-amber-300 to-yellow-500' };
    if (pct >= 65) return { grade: 'A', label: 'STEM Vanguard', color: 'from-amber-400 to-orange-500' };
    if (pct >= 40) return { grade: 'B', label: 'Explorer', color: 'from-cyan-400 to-blue-500' };
    return { grade: 'C', label: 'Cadet', color: 'from-slate-400 to-slate-500' };
  };

  const rankInfo = getRank(overallPercentage);
  const totalXp = 124300 + totalScore * 100;

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-3.5 select-none">
      {/* 1. Daily Missions Card */}
      <div className="rounded-3xl aero-window border-2 border-[#6ec3ff] p-4 bg-[#143d83]/90 shadow-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-400/40 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 border border-blue-300 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="font-game font-bold text-sm text-white drop-shadow">
              Daily Missions
            </h3>
          </div>
          <span className="font-mono font-bold text-xs bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-400/40 text-cyan-200">
            {completedMissionsCount} / 3
          </span>
        </div>

        {/* Missions Checklist */}
        <div className="space-y-2">
          {missions.map((m, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl flex items-center justify-between gap-2 text-xs transition-colors ${
                m.done ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-100' : 'bg-blue-950/40 border border-blue-800/40 text-blue-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${
                    m.done ? 'text-emerald-400 fill-emerald-950' : 'text-slate-500'
                  }`}
                />
                <span className="font-game font-bold leading-tight">{m.title}</span>
              </div>
              <span className="font-mono font-bold text-[11px] text-cyan-300 shrink-0">
                {m.xp}
              </span>
            </div>
          ))}
        </div>

        {/* Daily Bonus Claim Button - Strictly Once Per Day */}
        <button
          type="button"
          onClick={handleClaim}
          disabled={bonusClaimed || completedMissionsCount === 0}
          className={`w-full py-2 rounded-xl font-game font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
            bonusClaimed
              ? 'bg-slate-800/80 text-slate-400 border border-slate-700 cursor-not-allowed'
              : 'aero-button text-white hover:scale-102 border-2 border-white cursor-pointer'
          }`}
        >
          <Gift className="w-3.5 h-3.5 text-yellow-300" />
          <span>{bonusClaimed ? 'Klaim Harian Selesai (Besok Lagi)' : 'Klaim Hadiah Harian (+300 🪙)'}</span>
        </button>
      </div>

      {/* 2. Your Progress Card */}
      <div className="rounded-3xl aero-window border-2 border-[#6ec3ff] p-4 bg-[#143d83]/90 shadow-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-400/40 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-600 border border-cyan-300 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="font-game font-bold text-sm text-white drop-shadow">
              Your Progress
            </h3>
          </div>
          <span className="text-yellow-300 text-xs animate-pulse">✦</span>
        </div>

        {/* STEM Rank Banner with Winged Badge */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-blue-950/70 border border-blue-400/30">
          <div>
            <div className="text-[11px] text-blue-200 font-game">STEM Rank:</div>
            <div className="text-lg font-black font-game text-yellow-300 drop-shadow">
              Rank: {rankInfo.grade}
            </div>
            <div className="text-[10px] text-cyan-200">{rankInfo.label}</div>
          </div>

          {/* Winged Golden Medal Badge */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
              <path d="M26 32 Q12 16 2 24 Q6 36 24 38 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
              <path d="M24 34 Q14 24 8 28" stroke="#FDE68A" strokeWidth="1" fill="none" />
              <path d="M38 32 Q52 16 62 24 Q58 36 40 38 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
              <path d="M40 34 Q50 24 56 28" stroke="#FDE68A" strokeWidth="1" fill="none" />
              <path d="M22 20 L42 20 L40 38 Q32 48 24 38 Z" fill="#D97706" stroke="#FEF08A" strokeWidth="2" />
              <text x="32" y="34" fill="#FEF08A" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                {rankInfo.grade}
              </text>
            </svg>
            <span className="absolute -bottom-1 text-[9px] font-mono font-bold bg-amber-400 text-amber-950 px-1 rounded shadow">
              {Math.max(60, Math.round(overallPercentage))}%
            </span>
          </div>
        </div>

        {/* Progress Bar & Total XP */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-game">
            <span className="text-blue-200">Curriculum Mastery:</span>
            <span className="font-mono text-yellow-300 font-bold tabular-nums">
              {overallPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="relative h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-yellow-400/50 p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-500 relative"
              style={{ width: `${Math.max(8, overallPercentage)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono pt-1 text-slate-300">
            <span>Total XP Earned:</span>
            <span className="text-cyan-300 font-bold tabular-nums">{totalXp.toLocaleString()}</span>
          </div>
        </div>

        {/* Full Scorecard Inspector CTA */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenScorecard();
          }}
          className="w-full py-2.5 rounded-2xl aero-button font-game font-bold text-xs text-white flex items-center justify-center gap-2 shadow-lg hover:scale-102 active:scale-95 transition-all border-2 border-white/90 cursor-pointer"
        >
          <Award className="w-4 h-4 text-yellow-300" />
          <span>View Detailed Scorecard</span>
        </button>
      </div>
    </aside>
  );
};
