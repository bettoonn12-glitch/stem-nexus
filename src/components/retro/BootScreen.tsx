import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export const BootScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none cursor-pointer"
    >
      {/* Retro Windows XP Style Logo & Name */}
      <div className="flex flex-col items-center mb-16 animate-in fade-in duration-500">
        <div className="flex items-center gap-3 mb-2">
          {/* Windows 4-color glossy flag */}
          <div className="grid grid-cols-2 gap-1.5 w-12 h-12 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
            <div className="bg-[#f25022] rounded-tl-lg transform -skew-y-6" />
            <div className="bg-[#7fba00] rounded-tr-lg transform skew-y-6" />
            <div className="bg-[#00a4ef] rounded-bl-lg transform skew-y-6" />
            <div className="bg-[#ffb900] rounded-br-lg transform -skew-y-6" />
          </div>
          <div className="text-left">
            <div className="text-white text-3xl font-extrabold tracking-tight font-sans flex items-baseline gap-1">
              <span>STEM</span>
              <span className="text-[#38bdf8] font-black italic">NEXUS</span>
              <span className="text-xs text-[#f59e0b] font-bold align-top">XP</span>
            </div>
            <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">
              Professional Workstation
            </div>
          </div>
        </div>
      </div>

      {/* Windows XP 3-segment scrolling progress bar */}
      <div className="w-64 sm:w-72 h-4 border-2 border-slate-600 rounded-sm bg-[#060b19] p-0.5 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 rounded-xs shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 text-xs text-slate-500 font-mono tracking-widest animate-pulse">
        {progress < 100 ? 'INITIALIZING SUBSYSTEMS...' : 'READY'}
      </div>

      <div className="absolute bottom-6 text-[10px] text-slate-600 font-mono">
        Click anywhere to skip boot sequence
      </div>
    </div>
  );
};
