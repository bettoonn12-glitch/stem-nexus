import React, { useState } from 'react';
import { X, User, Check, Edit2, Sparkles, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  onUpdateName: (name: string) => void;
  totalScore: number;
  maxScore: number;
  coins: number;
  gems: number;
}

export const PlayerProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  playerName,
  onUpdateName,
  totalScore,
  maxScore,
  coins,
  gems,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(playerName);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setEditing(false);
      sound.playSuccess();
    }
  };

  const level = 24 + Math.floor(totalScore / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm select-none">
      <div className="aero-window rounded-3xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden bg-[#103577] border-2 border-cyan-300">
        {/* Title Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-200" />
            <h3 className="font-game font-bold text-base text-white drop-shadow">
              Cadet ID & Profile Card
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

        {/* Profile Card Body */}
        <div className="p-5 space-y-4 font-game text-xs">
          {/* Avatar & Header */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-950/80 border border-blue-400/40">
            <div className="relative w-16 h-16 rounded-full border-3 border-white/90 overflow-hidden bg-gradient-to-b from-sky-400 to-indigo-600 shadow-xl shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
                <path d="M6 18 Q18 4 30 18 Q34 8 26 5 Q18 3 10 5 Q4 10 6 18 Z" fill="#1E293B" />
                <circle cx="18" cy="20" r="10" fill="#FDE68A" />
                <circle cx="14" cy="20" r="1.5" fill="#0F172A" />
                <circle cx="22" cy="20" r="1.5" fill="#0F172A" />
                <path d="M16 24 Q18 26 20 24" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M7 16 Q18 10 29 16" stroke="#06B6D4" strokeWidth="2.5" fill="none" />
              </svg>
              <div className="absolute bottom-0 inset-x-0 h-2 bg-cyan-400" />
            </div>

            <div className="space-y-1 flex-1">
              {editing ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    maxLength={20}
                    className="w-full bg-blue-900 border border-cyan-400 rounded-lg px-2 py-1 text-white font-bold text-sm focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1 rounded bg-emerald-500 hover:bg-emerald-400 text-white shadow"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-white drop-shadow">
                    {playerName}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="text-cyan-300 hover:text-white"
                    title="Change Cadet Name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="text-[11px] text-cyan-200">
                Rank Level: <strong className="text-yellow-300 font-mono">Lv. {level}</strong>
              </div>
              <div className="text-[10px] text-slate-300">
                School Project Class 10A • STEM Explorer
              </div>
            </div>
          </div>

          {/* Career Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-400/30">
              <span className="text-[10px] text-blue-300 block">Total Curriculum Score</span>
              <span className="font-mono text-base font-bold text-yellow-300">
                {totalScore} / {maxScore} pts
              </span>
            </div>
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-400/30">
              <span className="text-[10px] text-blue-300 block">Cadet Treasury</span>
              <span className="font-mono text-sm font-bold text-amber-300">
                {coins} 🪙 · {gems} 💎
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2.5 rounded-2xl aero-button text-white font-bold border border-white/80 shadow"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
