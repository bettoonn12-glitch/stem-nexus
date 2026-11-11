import React, { useState } from 'react';
import { Sprout, TrendingUp, Sparkles } from 'lucide-react';

export const BiomassGrowthTool: React.FC = () => {
  const [hours, setHours] = useState<number>(18);
  const initialMass = 150; // grams
  const doublingTime = 6; // hours

  const cycles = hours / doublingTime;
  const currentMass = initialMass * Math.pow(2, cycles);
  const percentIncrease = ((currentMass - initialMass) / initialMass) * 100;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-semibold text-slate-100">Algal Photobioreactor Timeline</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Doubling Time: <span className="text-emerald-300 font-bold">6.0 hrs</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">Cultivation Time Elapsed:</span>
          <span className="font-mono text-emerald-300 font-bold tabular-nums">{hours} hours ({cycles.toFixed(1)} doublings)</span>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          step="3"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>0h (Seed)</span>
          <span>6h (Cycle 1)</span>
          <span>12h (Cycle 2)</span>
          <span className="text-emerald-300 font-semibold">18h (Challenge)</span>
          <span>24h (Cycle 4)</span>
        </div>
      </div>

      {/* Cycle Cards */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[0, 6, 12, 18].map((t) => {
          const c = t / 6;
          const mass = initialMass * Math.pow(2, c);
          const isActive = hours === t;
          return (
            <button
              key={t}
              onClick={() => setHours(t)}
              className={`p-2.5 rounded-lg border transition-all text-left ${
                isActive
                  ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="text-[10px] text-slate-400 uppercase font-mono">T = {t} hrs</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5 tabular-nums">{mass.toLocaleString()} g</div>
              <div className="text-[10px] text-emerald-400 font-mono">2^{c} = {Math.pow(2, c)}×</div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Summary Card */}
      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>
            Biomass: <strong className="text-emerald-300 font-mono tabular-nums">{Math.round(currentMass).toLocaleString()} g</strong>
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          Increase: <span className="text-cyan-300 font-bold tabular-nums">+{Math.round(percentIncrease)}%</span>
        </div>
      </div>
    </div>
  );
};
