import React, { useState } from 'react';
import { BatteryCharging, BatteryWarning, Zap } from 'lucide-react';

export const BatteryDrainTool: React.FC = () => {
  const [flightMinutes, setFlightMinutes] = useState<number>(48);
  const [powerWatts, setPowerWatts] = useState<number>(45);

  const totalCapacityWh = 59.94; // 5.4 Ah * 11.1 V
  const hours = flightMinutes / 60;
  const consumedWh = powerWatts * hours;
  const remainingWh = Math.max(0, totalCapacityWh - consumedWh);
  const remainingPercent = Math.max(0, (remainingWh / totalCapacityWh) * 100);

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Drone Battery & Power Sim</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Capacity: <span className="text-cyan-300 font-bold tabular-nums">59.94 Wh</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Flight Duration:</span>
            <span className="font-mono text-cyan-300 font-bold tabular-nums">{flightMinutes} min</span>
          </div>
          <input
            type="range"
            min="0"
            max="65"
            step="1"
            value={flightMinutes}
            onChange={(e) => setFlightMinutes(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>0m</span>
            <span>Question: 48m</span>
            <span>65m</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Power Consumption:</span>
            <span className="font-mono text-cyan-300 font-bold tabular-nums">{powerWatts} Watts</span>
          </div>
          <input
            type="range"
            min="20"
            max="70"
            step="5"
            value={powerWatts}
            onChange={(e) => setPowerWatts(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>20W (Cruise)</span>
            <span>Nominal: 45W</span>
            <span>70W (Climb)</span>
          </div>
        </div>
      </div>

      {/* Battery State Gauge */}
      <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {remainingPercent > 20 ? (
              <BatteryCharging className="w-5 h-5 text-emerald-400" />
            ) : (
              <BatteryWarning className="w-5 h-5 text-rose-400 animate-pulse" />
            )}
            <span className="text-xs font-semibold text-slate-200">
              State of Charge (SoC):
            </span>
          </div>
          <div className="font-mono text-base font-bold text-cyan-300 tabular-nums">
            {remainingPercent.toFixed(1)}%
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              remainingPercent > 50
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                : remainingPercent > 20
                ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                : 'bg-gradient-to-r from-rose-600 to-rose-400'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, remainingPercent))}%` }}
          />
        </div>

        <div className="grid grid-cols-3 text-center text-xs pt-1 border-t border-slate-800">
          <div>
            <div className="text-[11px] text-slate-400">Consumed Energy</div>
            <div className="font-mono text-slate-200 font-semibold tabular-nums">{consumedWh.toFixed(2)} Wh</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Remaining Energy</div>
            <div className="font-mono text-cyan-300 font-semibold tabular-nums">{remainingWh.toFixed(2)} Wh</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Total Flight Time</div>
            <div className="font-mono text-slate-200 font-semibold tabular-nums">{(totalCapacityWh / powerWatts * 60).toFixed(0)} min max</div>
          </div>
        </div>
      </div>
    </div>
  );
};
