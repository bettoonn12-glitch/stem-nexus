import React, { useState } from 'react';
import { ArrowDown, Flame, ShieldAlert } from 'lucide-react';

export const GravityDropTool: React.FC = () => {
  const [altitude, setAltitude] = useState<number>(80); // meters
  const [dragLossPercent, setDragLossPercent] = useState<number>(15); // % lost to thermal air friction
  const massKg = 2.5;
  const g = 9.8; // m/s^2

  const potentialEnergyJ = massKg * g * altitude; // m*g*h
  const dragLostJ = potentialEnergyJ * (dragLossPercent / 100);
  const kineticEnergyJ = potentialEnergyJ - dragLostJ;
  // Ek = 0.5 * m * v^2 => v = sqrt(2 * Ek / m)
  const impactVelocity = Math.sqrt((2 * kineticEnergyJ) / massKg);
  const idealVelocity = Math.sqrt(2 * g * altitude); // without drag

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Gravity Drop & Aerodynamic Drag</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Mass: <span className="text-cyan-300 font-bold">2.5 kg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Drop Altitude:</span>
            <span className="font-mono text-cyan-300 font-bold tabular-nums">{altitude} meters</span>
          </div>
          <input
            type="range"
            min="20"
            max="120"
            step="5"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>20m</span>
            <span className="text-cyan-300 font-semibold">Challenge: 80m</span>
            <span>120m</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Atmospheric Drag Loss:</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">{dragLossPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="35"
            step="1"
            value={dragLossPercent}
            onChange={(e) => setDragLossPercent(Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>0% (Vacuum)</span>
            <span className="text-amber-400 font-semibold">15% (Challenge)</span>
            <span>35% (High Drag)</span>
          </div>
        </div>
      </div>

      {/* Energy Partition Bar */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="flex justify-between text-xs">
          <span>Kinetic Energy (Impact): <strong className="text-cyan-300 font-mono tabular-nums">{kineticEnergyJ.toFixed(0)} J</strong></span>
          <span>Thermal Friction Loss: <strong className="text-amber-400 font-mono tabular-nums">{dragLostJ.toFixed(0)} J</strong></span>
        </div>
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="bg-cyan-500 h-full transition-all duration-200"
            style={{ width: `${100 - dragLossPercent}%` }}
            title="Kinetic Energy"
          />
          <div
            className="bg-amber-500 h-full transition-all duration-200"
            style={{ width: `${dragLossPercent}%` }}
            title="Thermal Drag Loss"
          />
        </div>

        <div className="grid grid-cols-2 pt-2 border-t border-slate-800 text-center text-xs">
          <div>
            <span className="text-[11px] text-slate-400 block">Actual Impact Velocity</span>
            <span className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
              {impactVelocity.toFixed(1)} <span className="text-xs font-normal text-slate-400">m/s</span>
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Ideal Vacuum Velocity</span>
            <span className="font-mono text-lg font-bold text-slate-400 tabular-nums">
              {idealVelocity.toFixed(1)} <span className="text-xs font-normal text-slate-400">m/s</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
