import React, { useState } from 'react';
import { Droplets, Calculator, CheckCircle2 } from 'lucide-react';

export const DesalinationRatioTool: React.FC = () => {
  const [seawaterInput, setSeawaterInput] = useState<number>(800);
  const recoveryRate = 0.45; // 4.5 L per 10 L = 45%

  const cleanWaterYield = seawaterInput * recoveryRate;
  const brineWaste = seawaterInput * (1 - recoveryRate);
  const meetsTarget = Math.abs(cleanWaterYield - 360) <= 2;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Desalination Recovery Ratio Explorer</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Yield Rate: <span className="text-cyan-300 font-bold">45.0%</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Test intake seawater volumes to observe the resulting potable water output and brine waste. The mission goal is <span className="text-cyan-300 font-semibold">360 L of clean water</span>.
      </p>

      {/* Interactive Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-300">Raw Seawater Intake:</span>
          <span className="font-mono text-cyan-300 font-bold text-sm tabular-nums">
            {seawaterInput} Liters
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="1200"
          step="20"
          value={seawaterInput}
          onChange={(e) => setSeawaterInput(Number(e.target.value))}
          className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>200 L</span>
          <span>Target intake: ~800 L</span>
          <span>1,200 L</span>
        </div>
      </div>

      {/* Output Comparison Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Purified Water: <strong className="text-cyan-300 tabular-nums">{cleanWaterYield.toFixed(1)} L</strong></span>
          <span>High-Saline Brine: <strong className="text-amber-400 tabular-nums">{brineWaste.toFixed(1)} L</strong></span>
        </div>
        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="bg-cyan-500 h-full transition-all duration-200"
            style={{ width: `${recoveryRate * 100}%` }}
            title="Clean Water 45%"
          />
          <div
            className="bg-amber-600/70 h-full transition-all duration-200"
            style={{ width: `${(1 - recoveryRate) * 100}%` }}
            title="Brine Waste 55%"
          />
        </div>
      </div>

      {/* Real-time Target Feedback */}
      <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
        meetsTarget 
          ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200' 
          : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
      }`}>
        <div className="flex items-center gap-2">
          {meetsTarget ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Calculator className="w-4 h-4 text-cyan-400 shrink-0" />
          )}
          <span>
            {meetsTarget
              ? 'At 800 L seawater intake, clean water yield equals exactly 360 L!'
              : `Current yield is ${cleanWaterYield.toFixed(0)} L (needs ${cleanWaterYield < 360 ? '+' : ''}${(360 - cleanWaterYield).toFixed(0)} L to hit 360 L).`}
          </span>
        </div>
        <button
          onClick={() => setSeawaterInput(800)}
          className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700 transition-colors whitespace-nowrap"
        >
          Set to 800 L
        </button>
      </div>
    </div>
  );
};
