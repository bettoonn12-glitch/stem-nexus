import React, { useState } from 'react';
import { X, Award, RotateCcw, CheckCircle2, AlertCircle, BookOpen, ChevronDown, ChevronUp, Sparkles, Calculator, Zap, Cpu, Compass } from 'lucide-react';
import { Challenge, SubjectScoreBreakdown, UserAnswerRecord } from '../types';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  challenges: Challenge[];
  records: Record<string, UserAnswerRecord>;
  breakdowns: SubjectScoreBreakdown[];
  totalScore: number;
  maxScore: number;
  overallPercentage: number;
  onResetAll: () => void;
  onQuickDemo: () => void;
  onSelectChallengeToReview: (challenge: Challenge) => void;
}

export const ResultsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  challenges,
  records,
  breakdowns,
  totalScore,
  maxScore,
  overallPercentage,
  onResetAll,
  onQuickDemo,
  onSelectChallengeToReview,
}) => {
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null);

  if (!isOpen) return null;

  const getAssessmentFeedback = (pct: number) => {
    if (pct >= 85) {
      return {
        title: 'Distinguished STEM Nexus Engineer',
        color: 'text-yellow-300',
        summary:
          'Outstanding multi-disciplinary performance. You demonstrated fluid problem-solving across mathematical scaling, scientific empirical laws, and computer science logic architectures.',
      };
    }
    if (pct >= 60) {
      return {
        title: 'Proficient STEM Investigator',
        color: 'text-emerald-300',
        summary:
          'Solid foundational mastery! You handled the majority of calculations and circuit logic successfully. Review the step-by-step derivations below for the remaining challenges to solidify mastery.',
      };
    }
    return {
      title: 'Apprentice Researcher in Training',
      color: 'text-amber-300',
      summary:
        'Great learning effort! STEM Nexus challenges require combining multiple formulas simultaneously. Explore the interactive simulators in each challenge to build intuition and improve your score.',
    };
  };

  const appraisal = getAssessmentFeedback(overallPercentage);

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedChallengeId(expandedChallengeId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/80 backdrop-blur-sm overflow-y-auto select-none">
      <div className="aero-window rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto bg-[#103577] border-2 border-cyan-300">
        {/* Retro XP Aero Header Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0 font-game">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-yellow-300" />
            <h3 className="text-base sm:text-lg font-black text-white drop-shadow">
              STEM Nexus Performance & Learning Scorecard
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-500 border border-white text-white flex items-center justify-center shadow"
            aria-label="Close scorecard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Score Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Radial / Percentage Ring */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyan-400 transition-all duration-700 ease-out"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * overallPercentage) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-2xl font-black text-white tabular-nums">
                    {overallPercentage.toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Overall
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm text-cyan-300 font-bold mt-2 tabular-nums">
                {totalScore} / {maxScore} Points
              </span>
            </div>

            {/* Appraisal Summary */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Automated Formative Assessment</span>
              </div>
              <h4 className={`text-lg md:text-xl font-bold ${appraisal.color}`}>
                {appraisal.title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {appraisal.summary}
              </p>
            </div>
          </div>

          {/* Subject-by-Subject Score Breakdown Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Disciplinary Performance Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {breakdowns.map((b) => {
                const icon =
                  b.subject === 'math' ? <Calculator className="w-4 h-4 text-cyan-400" /> :
                  b.subject === 'science' ? <Zap className="w-4 h-4 text-amber-400" /> :
                  b.subject === 'ict' ? <Cpu className="w-4 h-4 text-emerald-400" /> :
                  <Compass className="w-4 h-4 text-blue-400" />;

                const color =
                  b.subject === 'math' ? 'bg-cyan-500' :
                  b.subject === 'science' ? 'bg-amber-500' :
                  b.subject === 'ict' ? 'bg-emerald-500' : 'bg-blue-500';

                return (
                  <div key={b.subject} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span>{b.label}</span>
                      {icon}
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-xl font-bold text-white tabular-nums">
                        {b.current}
                      </span>
                      <span className="font-mono text-xs text-slate-400 tabular-nums">
                        of {b.max} pts ({b.percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} transition-all duration-500`}
                        style={{ width: `${b.percentage}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono text-right">
                      {b.completedCount} / {b.totalCount} completed
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question-by-Question Review Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Question Review & Solutions (All {challenges.length} Challenges)
              </h4>
              <span className="text-xs text-slate-500">
                Click any challenge to inspect full solution
              </span>
            </div>

            <div className="space-y-2.5">
              {challenges.map((c) => {
                const record = records[c.id];
                const isAnswered = !!record;
                const isCorrect = record?.isCorrect ?? false;
                const isExpanded = expandedChallengeId === c.id;

                return (
                  <div
                    key={c.id}
                    className={`rounded-xl border transition-all ${
                      !isAnswered
                        ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
                        : isCorrect
                        ? 'bg-emerald-950/20 border-emerald-900/40'
                        : 'bg-rose-950/20 border-rose-900/40'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleExpand(c.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isAnswered ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          )
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 shrink-0 font-mono">
                            ?
                          </div>
                        )}

                        <div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-slate-200">{c.title}</span>
                            <span className="text-slate-600" aria-hidden="true">·</span>
                            <span className="text-slate-400 capitalize">{c.subject}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {isAnswered ? (
                              <span>
                                Submitted: <strong className="font-mono text-slate-300">{String(record.userAnswer)}</strong>
                                {' '}| Correct: <strong className="font-mono text-emerald-400">{String(c.correctAnswer)}{c.unit ? ` ${c.unit}` : ''}</strong>
                              </span>
                            ) : (
                              <span>Not yet submitted · Expected answer: <strong className="font-mono text-slate-400">{String(c.correctAnswer)}{c.unit ? ` ${c.unit}` : ''}</strong></span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-slate-300">
                          {isAnswered ? `${record.scoreAwarded} / ${c.points} pts` : `0 / ${c.points} pts`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Detail Solution */}
                    {isExpanded && (
                      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3 text-xs">
                        <div className="text-slate-300">
                          <strong className="text-cyan-300 block mb-1">Scenario Objective:</strong>
                          {c.question}
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <strong className="text-amber-300 block">Step-by-Step Derivation:</strong>
                          {c.explanation.steps.map((s, idx) => (
                            <div key={idx} className="p-2 bg-slate-900 rounded border border-slate-800 space-y-0.5">
                              <div className="font-semibold text-slate-200">{s.step}</div>
                              <div className="text-slate-400 text-[11px]">{s.detail}</div>
                              {s.formula && (
                                <code className="text-cyan-300 font-mono block mt-1 text-[11px]">
                                  {s.formula}
                                </code>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectChallengeToReview(c);
                              onClose();
                            }}
                            className="px-3 py-1 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 rounded border border-cyan-500/40 text-xs transition-colors"
                          >
                            Open in Interactive Simulator
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-[#0d1733]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetAll}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg border border-rose-800/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Answers</span>
            </button>

            <button
              type="button"
              onClick={onQuickDemo}
              className="px-3 py-2 text-xs font-medium text-cyan-300 hover:text-cyan-100 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
              title="Prefill all challenges with realistic answers for school presentation"
            >
              Prefill Presentation Demo
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-md shadow-cyan-500/20"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};
