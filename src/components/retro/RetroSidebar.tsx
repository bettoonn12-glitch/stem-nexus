import React from 'react';
import { Home, Gamepad2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { Language, TRANSLATIONS } from '../../utils/i18n';

export type NavTab = 'home' | 'quiz' | 'learn' | 'lab' | 'projects' | 'achievements' | 'leaderboard' | 'settings' | 'characterStudio';

interface Props {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang?: Language;
}

export const RetroSidebar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  lang = 'en',
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const items: { id: NavTab; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'home',
      label: t.home,
      icon: <Home className="w-5 h-5 text-sky-200" />,
      color: 'from-sky-400 to-blue-600',
    },
    {
      id: 'quiz',
      label: t.quiz,
      icon: <Gamepad2 className="w-5 h-5 text-purple-200" />,
      color: 'from-indigo-400 to-purple-600',
    },
  ];

  return (
    <aside className="w-full md:w-44 shrink-0 aero-window rounded-3xl p-2.5 sm:p-3 flex flex-row md:flex-col gap-1.5 sm:gap-2 shadow-2xl border-2 border-[#6ec3ff] bg-[#103577]/90 backdrop-blur-md overflow-x-auto md:overflow-visible">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab(item.id);
            }}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-game font-bold text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 group text-left cursor-pointer hover:scale-102 ${
              isActive
                ? 'bg-gradient-to-r from-[#5eb1ff] to-[#1e6fe8] text-white shadow-[0_4px_12px_rgba(20,90,200,0.6)] border-2 border-white scale-[1.02]'
                : 'hover:bg-white/15 text-sky-100 hover:text-white border border-transparent'
            }`}
          >
            {/* Glossy Icon Badge */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110 ${
                isActive
                  ? 'bg-gradient-to-br ' + item.color + ' border border-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                  : 'bg-blue-900/60 border border-blue-400/30'
              }`}
            >
              {item.icon}
            </div>

            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] tracking-wide">
              {item.label}
            </span>

            {isActive && (
              <span className="ml-auto hidden md:inline text-xs text-yellow-300 animate-pulse">
                ✦
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};
