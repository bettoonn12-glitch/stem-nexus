import React from 'react';
import { Award, Compass, Calculator, Zap, Cpu, CheckCircle } from 'lucide-react';
import { SubjectScoreBreakdown, SubjectType } from '../types';

interface Props {
  breakdowns: SubjectScoreBreakdown[];
  totalScore: number;
  maxScore: number;
  overallPercentage: number;
  totalCompleted: number;
  totalChallenges: number;
  activeFilter: SubjectType | 'all';
  onFilterChange: (filter: SubjectType | 'all') => void;
}

export const DashboardStats: React.FC<Props> = ({
  breakdowns,
  totalScore,
  maxScore,
  overallPercentage,
  totalCompleted,
  totalChallenges,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* 4 Quantitative Rigor Score KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Score */}
        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Score</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-white tabular-nums">
            {totalScore} <span className="text-xs font-normal text-slate-500">/ {maxScore}</span>
          </div>
          <div className="text-[11px] text-cyan-400 font-mono">
            {overallPercentage.toFixed(1)}% Mastery Rate
          </div>
        </div>

        {/* Math Score */}
        {breakdowns.map((b) => {
          const icon =
            b.subject === 'math' ? <Calculator className="w-4 h-4 text-cyan-400" /> :
            b.subject === 'science' ? <Zap className="w-4 h-4 text-amber-400" /> :
            b.subject === 'ict' ? <Cpu className="w-4 h-4 text-emerald-400" /> :
            <Compass className="w-4 h-4 text-blue-400" />;

          const color =
            b.subject === 'math' ? 'text-cyan-400' :
            b.subject === 'science' ? 'text-amber-400' :
            b.subject === 'ict' ? 'text-emerald-400' : 'text-blue-400';

          return (
            <div key={b.subject} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{b.label}</span>
                {icon}
              </div>
              <div className="font-mono text-2xl font-bold text-white tabular-nums">
                {b.current} <span className="text-xs font-normal text-slate-500">/ {b.max}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className={color}>{b.percentage.toFixed(0)}%</span>
                <span className="text-slate-500">{b.completedCount}/{b.totalCount} Done</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Categorization Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-lg border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'all', label: 'All Challenges' },
            { id: 'math', label: 'Mathematics' },
            { id: 'science', label: 'Science' },
            { id: 'ict', label: 'ICT Systems' },
            { id: 'integrated', label: 'Grand Missions' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeFilter === f.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Unboxed Metadata Summary (Anti-Pill compliant) */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>{totalCompleted} of {totalChallenges} Solved</span>
          <span aria-hidden="true">·</span>
          <span>Automatic Grading Active</span>
        </div>
      </div>
    </div>
  );
};
