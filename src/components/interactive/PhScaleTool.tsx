import React, { useState } from 'react';
import { TestTube, Info } from 'lucide-react';

export const PhScaleTool: React.FC = () => {
  const [ph, setPh] = useState<number>(4.0);

  // [H+] = 10^-pH
  const hConcentration = Math.pow(10, -ph);
  const baselinePh4 = Math.pow(10, -4);
  const factorReduction = baselinePh4 / hConcentration;

  const getPhColor = (val: number) => {
    if (val < 3) return 'from-red-600 to-rose-500';
    if (val < 6) return 'from-orange-500 to-amber-500';
    if (val < 8) return 'from-emerald-500 to-teal-500';
    if (val < 11) return 'from-cyan-500 to-blue-500';
    return 'from-indigo-500 to-purple-600';
  };

  const getPhLabel = (val: number) => {
    if (val < 6.5) return 'Acidic (Hazardous to Fish Larvae)';
    if (val <= 7.5) return 'Neutral (Optimal for Aquatic Life)';
    return 'Alkaline / Basic';
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Logarithmic pH & [H⁺] Visualizer</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Scale: <span className="text-cyan-300 font-bold">0.0 – 14.0</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">Water Acidity:</span>
          <span className="font-mono text-cyan-300 font-bold text-sm tabular-nums">pH {ph.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="1.0"
          max="12.0"
          step="0.5"
          value={ph}
          onChange={(e) => setPh(Number(e.target.value))}
          className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>pH 1.0 (Acid)</span>
          <span className="text-rose-400">Runoff: pH 4.0</span>
          <span className="text-emerald-400 font-semibold">Target: pH 7.0</span>
          <span>pH 12.0 (Base)</span>
        </div>
      </div>

      {/* Visual Spectrum Bar */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-400 block text-[11px]">Water State:</span>
            <span className="font-semibold text-slate-200">{getPhLabel(ph)}</span>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-400 block text-[11px]">Hydronium [H⁺]:</span>
            <span className="font-mono font-bold text-cyan-300 tabular-nums">
              10^{(-ph).toFixed(1)} mol/L
            </span>
          </div>
        </div>

        <div className="h-3 w-full rounded-full overflow-hidden bg-slate-800">
          <div
            className={`h-full bg-gradient-to-r ${getPhColor(ph)} transition-all duration-200`}
            style={{ width: `${(ph / 14) * 100}%` }}
          />
        </div>

        {/* Comparison with pH 4 baseline */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Relative to pH 4.0 runoff:
          </span>
          <span className="font-mono font-bold text-emerald-300 tabular-nums">
            {factorReduction >= 1 
              ? `${factorReduction.toLocaleString()}× less concentrated`
              : `${(1/factorReduction).toLocaleString()}× more acidic`}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">
          Shifting from pH 4 to 7 = 3 orders of magnitude ($10^3 = 1000$).
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPh(4.0)}
            className="text-[11px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
          >
            pH 4.0
          </button>
          <button
            onClick={() => setPh(7.0)}
            className="text-[11px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded border border-slate-700"
          >
            pH 7.0
          </button>
        </div>
      </div>
    </div>
  );
};
