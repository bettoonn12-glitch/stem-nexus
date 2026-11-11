import React from 'react';
import { Play, ChevronRight, Sparkles, BookOpen, Star, Cpu, Cog, Calculator, FlaskConical, Rocket, Gamepad2, UserCheck } from 'lucide-react';
import { sound } from '../../utils/audio';
import { SubjectType } from '../../types';
import { GameGenre } from '../../types/game';
import { Language, TRANSLATIONS } from '../../utils/i18n';

interface Props {
  onSelectCategory: (category: SubjectType) => void;
  onOpenQuickPlay: () => void;
  onOpenEvent: () => void;
  onOpenArcade?: () => void;
  onOpenGenre?: (genre: GameGenre) => void;
  onOpenCharacterStudio?: () => void;
  completedCount: number;
  totalCount: number;
  lang?: Language;
}

export const RetroDashboard: React.FC<Props> = ({
  onSelectCategory,
  onOpenQuickPlay,
  onOpenEvent,
  onOpenArcade,
  onOpenGenre,
  onOpenCharacterStudio,
  completedCount,
  totalCount,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // 7 Active genres (rhythm & platformer removed as requested)
  const activeGenres: { id: GameGenre; icon: string; label: string }[] = [
    { id: 'racing', icon: '🏎️', label: t.racing },
    { id: 'adventure', icon: '🏃', label: t.adventure },
    { id: 'rpg', icon: '⚔️', label: t.rpg },
    { id: 'basketball', icon: '🏀', label: t.basketball },
    { id: 'soccer', icon: '⚽', label: t.soccer },
    { id: 'shooter', icon: '🎯', label: t.shooter },
    { id: 'puzzle', icon: '🧩', label: t.puzzle },
  ];

  return (
    <div className="space-y-3.5 flex-1 select-none">
      {/* 1. Hero Welcome Banner (Satellite Dish & Skyline) */}
      <div className="relative rounded-3xl overflow-hidden aero-window border-2 border-[#6ec3ff] p-5 sm:p-6 shadow-2xl bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,#fff_0%,transparent_60%)]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Satellite Dish Art & Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-950 to-sky-700 border-2 border-white/80 shadow-[0_0_20px_rgba(56,189,248,0.5)] p-2 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
                <path d="M22 52 L42 52 L36 42 L28 42 Z" fill="#94A3B8" />
                <rect x="26" y="52" width="12" height="4" rx="2" fill="#64748B" />
                <ellipse cx="32" cy="28" rx="22" ry="14" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" transform="rotate(-25 32 28)" />
                <ellipse cx="30" cy="29" rx="16" ry="9" fill="#CBD5E1" transform="rotate(-25 30 29)" />
                <path d="M24 26 L12 18" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
                <path d="M34 32 L14 20" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="18" r="3.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
                <path d="M8 14 Q2 10 0 4" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
                <path d="M12 10 Q6 6 4 0" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
              </svg>
              <div className="absolute top-1 right-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-game text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
                {t.welcomeTitle}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-cyan-100 drop-shadow flex items-center gap-1.5 font-game">
                <span>{lang === 'id' ? 'Belajar' : 'Learn'}</span>
                <span className="text-yellow-300">✦</span>
                <span>{lang === 'id' ? 'Kuis' : 'Quiz'}</span>
                <span className="text-yellow-300">✦</span>
                <span>{lang === 'id' ? 'Bangun' : 'Build'}</span>
                <span className="text-yellow-300">✦</span>
                <span>{lang === 'id' ? 'Jelajahi' : 'Discover'}</span>
              </p>
              <p className="text-[11px] sm:text-xs text-blue-200 line-clamp-1 max-w-md">
                {t.welcomeSub}
              </p>
            </div>
          </div>

          {/* Quick Play CTA Button */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenQuickPlay();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl aero-button font-game font-black text-sm text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-white cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t.startChallenge}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Four Giant Glossy Category Buttons (Science, Technology, Engineering, Mathematics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* Category 1: Science */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectCategory('science');
          }}
          className="group relative rounded-3xl p-3 sm:p-4 border-2 border-[#57e389] bg-gradient-to-b from-[#34d399]/30 via-[#059669]/60 to-[#065f46]/90 shadow-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(52,211,153,0.7)] hover:border-white active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-120 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300 ease-out">
            <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 64 64" fill="none">
              <rect x="28" y="8" width="8" height="14" fill="#E2E8F0" stroke="#059669" strokeWidth="2" />
              <rect x="26" y="6" width="12" height="4" rx="2" fill="#F1F5F9" />
              <path d="M28 22 L14 48 Q10 56 22 56 L42 56 Q54 56 50 48 L36 22 Z" fill="#F43F5E" stroke="#059669" strokeWidth="2.5" />
              <path d="M18 42 Q32 36 46 42 L43 50 Q32 54 21 50 Z" fill="#FB7185" />
              <circle cx="26" cy="46" r="2.5" fill="#FFFFFF" />
              <circle cx="36" cy="42" r="3.5" fill="#FFFFFF" />
              <circle cx="32" cy="48" r="2" fill="#FFFFFF" />
            </svg>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-game font-extrabold text-xs sm:text-sm shadow border border-emerald-300">
            Science
          </div>
        </button>

        {/* Category 2: Technology */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectCategory('ict');
          }}
          className="group relative rounded-3xl p-3 sm:p-4 border-2 border-[#38bdf8] bg-gradient-to-b from-[#38bdf8]/30 via-[#0284c7]/60 to-[#075985]/90 shadow-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:border-white active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-120 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300 ease-out">
            <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 64 64" fill="none">
              <rect x="14" y="14" width="36" height="36" rx="8" fill="#1E293B" stroke="#0284C7" strokeWidth="2.5" />
              <rect x="22" y="22" width="20" height="20" rx="4" fill="#0284C7" />
              <circle cx="32" cy="32" r="5" fill="#38BDF8" />
              <path d="M10 24 L14 24 M10 32 L14 32 M10 40 L14 40" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <path d="M50 24 L54 24 M50 32 L54 32 M50 40 L54 40" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 10 L24 14 M32 10 L32 14 M40 10 L40 14" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 50 L24 54 M32 50 L32 54 M40 50 L40 54" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white font-game font-extrabold text-xs sm:text-sm shadow border border-cyan-300">
            Technology
          </div>
        </button>

        {/* Category 3: Engineering */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectCategory('integrated');
          }}
          className="group relative rounded-3xl p-3 sm:p-4 border-2 border-[#f59e0b] bg-gradient-to-b from-[#f59e0b]/30 via-[#d97706]/60 to-[#92400e]/90 shadow-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:border-white active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-120 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300 ease-out">
            <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="16" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
              <circle cx="32" cy="32" r="8" fill="#1E293B" stroke="#FBBF24" strokeWidth="2" />
              <path d="M30 6 L34 6 L35 16 L29 16 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M30 48 L34 48 L35 58 L29 58 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M6 30 L6 34 L16 35 L16 29 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M48 30 L48 34 L58 35 L58 29 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M14 14 L18 14 L23 21 L19 23 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M46 46 L50 46 L45 39 L41 41 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M50 14 L46 14 L41 21 L45 23 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <path d="M14 50 L18 50 L23 43 L19 41 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
            </svg>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] text-white font-game font-extrabold text-xs sm:text-sm shadow border border-amber-300">
            Engineering
          </div>
        </button>

        {/* Category 4: Mathematics */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectCategory('math');
          }}
          className="group relative rounded-3xl p-3 sm:p-4 border-2 border-[#a855f7] bg-gradient-to-b from-[#a855f7]/30 via-[#7e22ce]/60 to-[#581c87]/90 shadow-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:border-white active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-120 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300 ease-out">
            <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" viewBox="0 0 64 64" fill="none">
              <rect x="16" y="10" width="32" height="46" rx="6" fill="#1E1B4B" stroke="#9333EA" strokeWidth="2.5" />
              <rect x="20" y="16" width="24" height="10" rx="3" fill="#312E81" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="20" y="30" width="6" height="5" rx="1.5" fill="#FBBF24" />
              <rect x="29" y="30" width="6" height="5" rx="1.5" fill="#FBBF24" />
              <rect x="38" y="30" width="6" height="5" rx="1.5" fill="#F43F5E" />
              <rect x="20" y="38" width="6" height="5" rx="1.5" fill="#38BDF8" />
              <rect x="29" y="38" width="6" height="5" rx="1.5" fill="#38BDF8" />
              <rect x="38" y="38" width="6" height="5" rx="1.5" fill="#38BDF8" />
              <rect x="20" y="46" width="6" height="5" rx="1.5" fill="#38BDF8" />
              <rect x="29" y="46" width="6" height="5" rx="1.5" fill="#38BDF8" />
              <rect x="38" y="46" width="6" height="5" rx="1.5" fill="#10B981" />
            </svg>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#9333ea] to-[#7e22ce] text-white font-game font-extrabold text-xs sm:text-sm shadow border border-purple-300">
            Mathematics
          </div>
        </button>
      </div>

      {/* 4. Bottom Row: Continue Learning Card & Current Event Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        {/* Left: Continue Learning Card */}
        <div className="rounded-3xl aero-window border-2 border-[#6ec3ff] p-4 bg-[#143d83]/90 shadow-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-600 border border-white/70 shadow p-1 flex items-center justify-center shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                <rect x="18" y="6" width="12" height="24" rx="6" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.5" />
                <path d="M24 4 L30 14 L18 14 Z" fill="#EF4444" />
                <circle cx="24" cy="20" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                <path d="M12 28 L18 24 L18 32 Z" fill="#EF4444" />
                <path d="M36 28 L30 24 L30 32 Z" fill="#EF4444" />
                <path d="M20 30 L24 40 L28 30 Z" fill="#F59E0B" />
                <path d="M22 30 L24 36 L26 30 Z" fill="#EF4444" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-200 font-game">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.continueLearning}</span>
              </div>
              <h4 className="text-sm font-bold text-white drop-shadow font-game leading-tight">
                {lang === 'id' ? 'Mesin Pembakaran Internal' : 'Internal Combustion Engines'}
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-cyan-400/40 p-0.5">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full w-[60%]" />
                </div>
                <span className="text-[10px] font-mono text-cyan-200">60%</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenQuickPlay();
            }}
            className="w-10 h-10 rounded-2xl aero-button flex items-center justify-center text-white shadow-lg shrink-0 border border-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="Resume challenge"
          >
            <Play className="w-4 h-4 fill-white" />
          </button>
        </div>

        {/* Right: Current Event Card */}
        <div className="rounded-3xl aero-window border-2 border-[#6ec3ff] p-4 bg-[#143d83]/90 shadow-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-700 to-yellow-500 border border-white/70 shadow p-1 flex items-center justify-center shrink-0">
              <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                <path d="M10 32 Q8 20 14 12 Q18 20 14 30 Z" fill="#22C55E" />
                <path d="M38 32 Q40 20 34 12 Q30 20 34 30 Z" fill="#22C55E" />
                <path d="M16 14 L32 14 L30 26 Q24 32 18 26 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="1" />
                <circle cx="24" cy="20" r="3" fill="#F59E0B" />
                <rect x="22" y="30" width="4" height="6" fill="#FBBF24" />
                <rect x="18" y="36" width="12" height="4" rx="2" fill="#D97706" />
              </svg>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-game">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{t.currentEvent}</span>
              </div>
              <h4 className="text-sm font-bold text-white drop-shadow font-game leading-tight">
                {lang === 'id' ? 'Pekan Tantangan STEM' : 'STEM Challenge Week'}
              </h4>
              <p className="text-[11px] text-blue-200 line-clamp-1 max-w-[190px]">
                {lang === 'id' ? 'Bersaing, raih lencana eksklusif, dan panjat peringkat!' : 'Compete, earn exclusive badges, and climb rankings!'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenEvent();
            }}
            className="w-10 h-10 rounded-2xl aero-button flex items-center justify-center text-white shadow-lg shrink-0 border border-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title="View current event"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
