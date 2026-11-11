import React from 'react';
import { X, Trophy, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { UserAnswerRecord } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  records: Record<string, UserAnswerRecord>;
}

export const AchievementsModal: React.FC<Props> = ({ isOpen, onClose, records }) => {
  if (!isOpen) return null;

  const solvedCount = Object.values(records).filter((r) => r.isCorrect).length;

  const achievements = [
    {
      id: 'first_step',
      title: 'First Discovery',
      desc: 'Solve your first STEM challenge correctly',
      icon: '🌱',
      unlocked: solvedCount >= 1,
      reward: '+100 XP · 50 🪙',
    },
    {
      id: 'circuit_wizard',
      title: 'Ohmic Electrician',
      desc: 'Solve the 24V Parallel Circuit challenge',
      icon: '⚡',
      unlocked: records['sci-1']?.isCorrect ?? false,
      reward: '+200 XP · 100 🪙',
    },
    {
      id: 'hydro_master',
      title: 'Hydronium Buffer',
      desc: 'Master the logarithmic pH scale neutralization',
      icon: '🧪',
      unlocked: records['sci-2']?.isCorrect ?? false,
      reward: '+200 XP · 100 🪙',
    },
    {
      id: 'binary_sage',
      title: 'Bitwise Architect',
      desc: 'Decode 8-bit binary telemetry byte into decimal',
      icon: '💾',
      unlocked: records['ict-1']?.isCorrect ?? false,
      reward: '+200 XP · 100 🪙',
    },
    {
      id: 'logic_shield',
      title: 'Fail-Safe Commander',
      desc: 'Configure the robotic Boolean safety logic interlock',
      icon: '🛡️',
      unlocked: records['ict-2']?.isCorrect ?? false,
      reward: '+200 XP · 100 🪙',
    },
    {
      id: 'mars_explorer',
      title: 'Martian Navigator',
      desc: 'Complete the Ares-4 Rover Grand Integrated Quest',
      icon: '🚀',
      unlocked: records['int-1']?.isCorrect ?? false,
      reward: '+400 XP · 50 💎',
    },
    {
      id: 'eco_grower',
      title: 'Smart Agronomist',
      desc: 'Balance the automated vertical hydroponics greenhouse',
      icon: '🌿',
      unlocked: records['int-2']?.isCorrect ?? false,
      reward: '+400 XP · 50 💎',
    },
    {
      id: 'stem_master',
      title: 'Grand Nexus Polymath',
      desc: 'Solve 8 or more challenges across all disciplines',
      icon: '👑',
      unlocked: solvedCount >= 8,
      reward: '+1,000 XP · 200 💎',
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm select-none">
      <div className="aero-window rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden bg-[#103577] border-2 border-cyan-300">
        {/* Title Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <h3 className="font-game font-bold text-base text-white drop-shadow">
              STEM Badges & Achievements
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-500 border border-white text-white flex items-center justify-center shadow"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subheader */}
        <div className="px-5 py-2.5 bg-blue-950/80 border-b border-blue-400/30 flex items-center justify-between text-xs font-game text-sky-200">
          <span>Unlock badges by completing Math, Science, ICT & Integrated missions!</span>
          <span className="font-mono font-bold text-yellow-300 bg-blue-900/90 px-2 py-0.5 rounded-full border border-blue-400/40">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>

        {/* Achievements Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 font-game">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                ach.unlocked
                  ? 'bg-gradient-to-br from-amber-950/40 to-yellow-950/20 border-amber-400/80 shadow-md'
                  : 'bg-blue-950/40 border-blue-900/60 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow border ${
                  ach.unlocked
                    ? 'bg-gradient-to-br from-yellow-300 to-amber-500 border-white/80'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                {ach.unlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-extrabold text-sm text-white drop-shadow truncate">
                    {ach.title}
                  </h4>
                  {ach.unlocked && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/40 shrink-0">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-blue-200 line-clamp-2 leading-tight">
                  {ach.desc}
                </p>
                <div className="text-[10px] text-amber-300 font-mono pt-1">
                  {ach.reward}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
