import React, { useState } from 'react';
import { Cog, Gauge, ArrowRight } from 'lucide-react';

export const GearRatioTool: React.FC = () => {
  const [motorRpm, setMotorRpm] = useState<number>(360);
  const driverTeeth = 16;
  const intermediateTeeth = 48;
  const axleTeeth = 24;

  const stage1Ratio = driverTeeth / intermediateTeeth; // 16/48 = 1/3
  const intermediateRpm = motorRpm * stage1Ratio; // 120 RPM
  const stage2Ratio = intermediateTeeth / axleTeeth; // 48/24 = 2.0
  const outputRpm = intermediateRpm * stage2Ratio; // 240 RPM
  const netRatio = driverTeeth / axleTeeth; // 16/24 = 2/3

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cog className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Rover Two-Stage Gearbox Visualizer</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Net Ratio: <span className="text-cyan-300 font-bold">16 : 24 (2/3)</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">Driver Motor Speed:</span>
          <span className="font-mono text-cyan-300 font-bold tabular-nums">{motorRpm} RPM</span>
        </div>
        <input
          type="range"
          min="180"
          max="720"
          step="30"
          value={motorRpm}
          onChange={(e) => setMotorRpm(Number(e.target.value))}
          className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>180 RPM</span>
          <span className="text-cyan-300 font-semibold">Challenge: 360 RPM</span>
          <span>720 RPM</span>
        </div>
      </div>

      {/* Geartrain Flow Graphic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center pt-1">
        {/* Stage 1: Driver Pinion */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center space-y-1">
          <div className="text-[11px] text-slate-400 font-mono">Stage 1: Driver Pinion</div>
          <div className="text-sm font-bold text-cyan-400 font-mono tabular-nums">{driverTeeth} Teeth</div>
          <div className="text-xs text-slate-200 font-semibold font-mono tabular-nums">{motorRpm} RPM</div>
          <div className="text-[10px] text-slate-400">Motor Input</div>
        </div>

        {/* Stage 2: Intermediate Idler */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-center space-y-1">
          <div className="text-[11px] text-slate-400 font-mono">Stage 2: Idler Cluster</div>
          <div className="text-sm font-bold text-amber-400 font-mono tabular-nums">{intermediateTeeth} Teeth</div>
          <div className="text-xs text-slate-200 font-semibold font-mono tabular-nums">{intermediateRpm.toFixed(0)} RPM</div>
          <div className="text-[10px] text-slate-400">Ratio 1/3 (Reduction)</div>
        </div>

        {/* Stage 3: Axle Output */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-cyan-900/60 text-center space-y-1">
          <div className="text-[11px] text-cyan-300 font-mono">Stage 3: Wheel Axle</div>
          <div className="text-sm font-bold text-emerald-400 font-mono tabular-nums">{axleTeeth} Teeth</div>
          <div className="text-xs text-emerald-300 font-bold font-mono tabular-nums">{outputRpm.toFixed(0)} RPM</div>
          <div className="text-[10px] text-slate-400">Final Wheel Drive</div>
        </div>
      </div>

      <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Gauge className="w-4 h-4 text-cyan-400" />
          <span>Formula: <code className="text-cyan-300">Output RPM = Input × (Driver / Axle) = {motorRpm} × (16/24) = {outputRpm.toFixed(0)} RPM</code></span>
        </div>
      </div>
    </div>
  );
};
