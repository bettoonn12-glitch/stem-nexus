import React, { useState } from 'react';
import { Heart, Activity, Wind } from 'lucide-react';

export const CardiacOxygenTool: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number>(140);
  const [strokeVolumeMl, setStrokeVolumeMl] = useState<number>(100);

  const strokeVolumeL = strokeVolumeMl / 1000;
  const cardiacOutputLpm = heartRate * strokeVolumeL;
  const restingBaseline = 70 * 0.07; // 4.9 L/min
  const flowMultiplier = cardiacOutputLpm / restingBaseline;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
          <h4 className="text-sm font-semibold text-slate-100">Cardiovascular Output & O₂ Delivery</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Model: <span className="text-rose-400 font-bold">Q = HR × SV</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Heart Rate:</span>
            <span className="font-mono text-rose-400 font-bold tabular-nums">{heartRate} bpm</span>
          </div>
          <input
            type="range"
            min="60"
            max="190"
            step="5"
            value={heartRate}
            onChange={(e) => setHeartRate(Number(e.target.value))}
            className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>60 (Rest)</span>
            <span className="text-rose-400 font-semibold">140 (Exercise)</span>
            <span>190 (Max)</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Stroke Volume:</span>
            <span className="font-mono text-cyan-300 font-bold tabular-nums">{strokeVolumeMl} mL/beat ({strokeVolumeL.toFixed(2)} L)</span>
          </div>
          <input
            type="range"
            min="60"
            max="140"
            step="5"
            value={strokeVolumeMl}
            onChange={(e) => setStrokeVolumeMl(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>60 mL</span>
            <span className="text-cyan-300 font-semibold">100 mL (Challenge)</span>
            <span>140 mL</span>
          </div>
        </div>
      </div>

      {/* Real-time Cardiac Output Indicator */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Computed Cardiac Output (Q)</span>
          <span className="font-mono text-2xl font-bold text-rose-400 tabular-nums">
            {cardiacOutputLpm.toFixed(1)} <span className="text-xs font-normal text-slate-400">L/min</span>
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Relative to Resting (4.9 L/min)</span>
          <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
            {flowMultiplier.toFixed(2)}× Blood Flow
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
        <span className="text-cyan-300 font-semibold">Bohr Effect in Muscles:</span> Elevated cellular respiration produces extra CO₂ and lactic acid, dropping local pH from 7.4 to 7.2. This lowers hemoglobin affinity for oxygen, dislodging and delivering more O₂ directly to working mitochondria.
      </div>
    </div>
  );
};
