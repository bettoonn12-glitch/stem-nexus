import React from 'react';
import { X, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceViewerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm select-none">
      <div className="aero-window rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden bg-[#103577] border-2 border-cyan-300">
        {/* Title Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 text-sm">🎨</span>
            <h3 className="font-game font-bold text-base text-white drop-shadow">
              UI Design Reference & Implementation Showcase
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3 rounded-2xl bg-blue-950/80 border border-blue-400/40 text-xs font-game text-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>
                Referenced UI design loaded from <code className="text-yellow-200">WhatsApp_Image_2026-11-10_at_09.52.56_3bfc8d6a.jpeg</code>. Every interactive widget, calculation engine, and mascot is fully simulated in real-time!
              </span>
            </div>
          </div>

          {/* Reference Image Box */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-xl bg-slate-950">
            <img
              src="/public/assets/aistudio/WhatsApp_Image_2026-11-10_at_09.52.56_3bfc8d6a.jpeg"
              alt="Reference UI Design"
              className="w-full h-auto object-contain max-h-[60vh] mx-auto"
            />
          </div>

          {/* Feature checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-game">
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/30 text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sleeping Corgi (Click to Pet!)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/30 text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Penguin Mascot with Goggles</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/30 text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Poppable Soap Bubbles</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/30 text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Retro XP Taskbar & Clock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
