import React from 'react';
import { Moon, Power, RotateCcw, LogOut, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onLogOff: () => void;
  onSleep: () => void;
  onShutdown: () => void;
}

export const PowerDialogModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onRestart,
  onLogOff,
  onSleep,
  onShutdown,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-gradient-to-b from-[#003399] via-[#004cd1] to-[#002a80] border-2 border-[#ffffff]/40 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden font-sans text-white p-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-400/40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-black text-xs text-white shadow border border-white">
              XP
            </div>
            <h2 className="font-extrabold text-lg tracking-wide drop-shadow">
              Turn off computer
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-5 h-5 rounded bg-blue-900/60 hover:bg-red-600 border border-white/50 flex items-center justify-center text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Power Action Buttons in XP Style */}
        <div className="py-6 px-2 flex items-center justify-around gap-2">
          {/* Stand By / Sleep */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSleep();
            }}
            className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform">
              <Moon className="w-7 h-7 text-white fill-white" />
            </div>
            <span className="text-xs font-bold drop-shadow">Stand By</span>
          </button>

          {/* Turn Off / Shutdown */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onShutdown();
            }}
            className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-red-500 to-red-700 border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform">
              <Power className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-bold drop-shadow">Turn Off</span>
          </button>

          {/* Restart */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700 border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform">
              <RotateCcw className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-bold drop-shadow">Restart</span>
          </button>

          {/* Log Off */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onLogOff();
            }}
            className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform">
              <LogOut className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-bold drop-shadow">Log Off</span>
          </button>
        </div>

        {/* Footer with Cancel Button */}
        <div className="pt-2 border-t border-blue-400/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded bg-[#ece9d8] hover:bg-white active:bg-[#dcd8ce] text-slate-900 border border-[#7f9db9] font-bold text-xs shadow cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
