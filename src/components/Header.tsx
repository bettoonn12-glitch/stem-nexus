import React from 'react';
import { Award } from 'lucide-react';
import { SubjectType } from '../types';

interface Props {
  activeTab: SubjectType | 'all';
  onSelectTab: (tab: SubjectType | 'all') => void;
  onOpenResults: () => void;
  totalScore: number;
  maxScore: number;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onOpenResults,
  totalScore,
  maxScore,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('all')}
          className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          STEM Nexus
        </button>

        {/* Zone 2: Navigation Links (Single-line, unboxed, subtle active state) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={() => onSelectTab('all')}
            className={`hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'all' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            All Challenges
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('math')}
            className={`hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'math' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Mathematics
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('science')}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'science' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Science
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('ict')}
            className={`hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'ict' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            ICT Lab
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('integrated')}
            className={`hover:text-blue-300 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'integrated' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Integrated Quests
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResults}
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md shadow-cyan-500/20 transition-all whitespace-nowrap shrink-0"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>Scorecard</span>
            <span className="font-mono bg-cyan-500/30 px-1.5 py-0.5 rounded text-slate-950 font-bold tabular-nums">
              {totalScore}/{maxScore}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row (Below top bar contract) */}
      <div className="md:hidden flex items-center gap-2 px-4 py-2 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
        {(['all', 'math', 'science', 'ict', 'integrated'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab(tab)}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === tab
                ? 'bg-slate-800 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'all' ? 'All' : tab === 'math' ? 'Math' : tab === 'science' ? 'Science' : tab === 'ict' ? 'ICT' : 'Quests'}
          </button>
        ))}
      </div>
    </header>
  );
};
