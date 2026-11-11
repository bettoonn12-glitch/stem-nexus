import React from 'react';
import { X, Bell, Gift, Sparkles, Trophy, Calendar } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClaimReward: () => void;
}

export const NotificationsModal: React.FC<Props> = ({ isOpen, onClose, onClaimReward }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm select-none">
      <div className="aero-window rounded-3xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden bg-[#103577] border-2 border-cyan-300">
        {/* Title Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-300" />
            <h3 className="font-game font-bold text-base text-white drop-shadow">
              STEM Nexus Announcements
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

        {/* Body */}
        <div className="p-5 space-y-3 font-game text-xs">
          {/* Notification 1: Daily Login Bonus */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-yellow-950/40 border-2 border-amber-400/60 shadow space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-yellow-300 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-yellow-400" />
                Daily Cadet Bonus!
              </span>
              <span className="text-[10px] text-amber-200">Today</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              Welcome back to STEM Nexus! Solve daily missions to earn gold coins and advance your STEM Rank.
            </p>
            <button
              type="button"
              onClick={() => {
                sound.playCoin();
                onClaimReward();
                onClose();
              }}
              className="w-full py-1.5 rounded-xl aero-button text-white font-bold flex items-center justify-center gap-1.5 border border-white/80"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Claim +150 Coins & +50 Gems</span>
            </button>
          </div>

          {/* Notification 2: STEM Challenge Week Event */}
          <div className="p-3.5 rounded-2xl bg-blue-950/70 border border-blue-400/40 space-y-1.5 text-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-300" />
                STEM Challenge Week Active
              </span>
              <span className="text-[10px] text-cyan-400">Live</span>
            </div>
            <p className="text-[11px] text-blue-200">
              The Martian Rover power simulation and Hydroponic Greenhouse quest have double XP rewards this week.
            </p>
          </div>

          {/* Notification 3: Audio Study Melody */}
          <div className="p-3.5 rounded-2xl bg-blue-950/70 border border-blue-400/40 space-y-1 text-slate-200">
            <span className="font-bold text-pink-300 flex items-center gap-1.5">
              <span>🎵</span>
              Study Music Generator
            </span>
            <p className="text-[11px] text-blue-200">
              Click the music icon in the taskbar anytime to listen to relaxing 8-bit study chimes while solving equations!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
