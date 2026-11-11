import React from 'react';
import { X, Users, Trophy, Medal, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  totalScore: number;
}

export const LeaderboardModal: React.FC<Props> = ({ isOpen, onClose, playerName, totalScore }) => {
  if (!isOpen) return null;

  const currentXp = 124300 + totalScore * 100;

  // Classroom student leaderboard mock + live user
  const leaders = [
    { rank: 1, name: 'Maya Lin', level: 28, xp: 148200, badge: '🥇 S-Rank', title: 'Solar Physicist' },
    { rank: 2, name: 'David Chen', level: 26, xp: 139100, badge: '🥈 A-Rank', title: 'Robotics Engineer' },
    { rank: 3, name: playerName, level: 24 + Math.floor(totalScore / 100), xp: currentXp, badge: '🥉 A-Rank', title: 'STEM Pioneer (You!)', isUser: true },
    { rank: 4, name: 'Elena Rostova', level: 23, xp: 119400, badge: 'B-Rank', title: 'Bio-Chemist' },
    { rank: 5, name: 'Jamal Washington', level: 22, xp: 112800, badge: 'B-Rank', title: 'Network Architect' },
    { rank: 6, name: 'Aoi Tanaka', level: 21, xp: 104500, badge: 'C-Rank', title: 'Hydroponics Tech' },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm select-none">
      <div className="aero-window rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden bg-[#103577] border-2 border-cyan-300">
        {/* Title Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-200" />
            <h3 className="font-game font-bold text-base text-white drop-shadow">
              STEM Class 10A Leaderboard & Honors
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

        {/* Podium Top 3 */}
        <div className="p-4 bg-gradient-to-b from-blue-950/90 to-blue-900/60 border-b border-blue-400/30 grid grid-cols-3 gap-2 text-center font-game">
          {/* Rank 2 */}
          <div className="p-2.5 rounded-2xl bg-blue-900/60 border border-slate-300/40 flex flex-col items-center justify-end">
            <span className="text-xl">🥈</span>
            <div className="text-xs font-bold text-slate-200 truncate w-full">{leaders[1]?.name}</div>
            <div className="text-[10px] text-cyan-300 font-mono font-bold">{leaders[1]?.xp.toLocaleString()} XP</div>
            <div className="w-full h-8 bg-slate-400/40 rounded-t-lg mt-1 flex items-center justify-center text-xs font-bold text-white">#2</div>
          </div>

          {/* Rank 1 */}
          <div className="p-2.5 rounded-2xl bg-amber-950/40 border-2 border-yellow-400 shadow flex flex-col items-center justify-end scale-105">
            <span className="text-2xl animate-bounce">👑</span>
            <div className="text-xs font-black text-yellow-300 truncate w-full">{leaders[0]?.name}</div>
            <div className="text-[10px] text-amber-200 font-mono font-bold">{leaders[0]?.xp.toLocaleString()} XP</div>
            <div className="w-full h-12 bg-gradient-to-t from-yellow-500 to-amber-400 rounded-t-lg mt-1 flex items-center justify-center text-sm font-black text-amber-950">#1</div>
          </div>

          {/* Rank 3 */}
          <div className="p-2.5 rounded-2xl bg-blue-900/60 border border-amber-600/40 flex flex-col items-center justify-end">
            <span className="text-xl">🥉</span>
            <div className="text-xs font-bold text-amber-200 truncate w-full">{leaders[2]?.name}</div>
            <div className="text-[10px] text-cyan-300 font-mono font-bold">{leaders[2]?.xp.toLocaleString()} XP</div>
            <div className="w-full h-6 bg-amber-700/50 rounded-t-lg mt-1 flex items-center justify-center text-xs font-bold text-white">#3</div>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="p-4 overflow-y-auto space-y-2 font-game text-xs">
          {leaders.map((student) => (
            <div
              key={student.name}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                student.isUser
                  ? 'bg-gradient-to-r from-blue-700/60 to-cyan-700/60 border-2 border-cyan-300 shadow-lg text-white'
                  : 'bg-blue-950/40 border-blue-800/40 text-blue-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-sm w-6 text-center text-yellow-300">
                  #{student.rank}
                </span>
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{student.name}</span>
                    {student.isUser && (
                      <span className="text-[10px] bg-yellow-400 text-blue-950 font-black px-1.5 py-0.2 rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-blue-200">{student.title} • Lv. {student.level}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-sm text-yellow-300 tabular-nums">
                  {student.xp.toLocaleString()} XP
                </div>
                <div className="text-[10px] text-cyan-300">{student.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
