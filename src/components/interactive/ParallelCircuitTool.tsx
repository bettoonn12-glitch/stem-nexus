import React, { useState } from 'react';
import { Power, Lightbulb, Zap, Activity } from 'lucide-react';

export const ParallelCircuitTool: React.FC = () => {
  const [branch1, setBranch1] = useState<boolean>(true);
  const [branch2, setBranch2] = useState<boolean>(true);
  const [branch3, setBranch3] = useState<boolean>(true);

  const voltage = 24; // Volts
  const rPerBranch = 36; // Ohms

  const activeBranches = [branch1, branch2, branch3].filter(Boolean).length;
  const req = activeBranches > 0 ? rPerBranch / activeBranches : Infinity;
  const totalCurrent = activeBranches > 0 ? voltage / req : 0;
  const currentPerActiveBranch = activeBranches > 0 ? voltage / rPerBranch : 0; // 0.667 A

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-semibold text-slate-100">Interactive 24V DC Parallel Circuit</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Supply: <span className="text-amber-300 font-bold tabular-nums">24.0 V DC</span>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Toggle individual LED bank circuit breakers below to observe how equivalent resistance and supply current change dynamically according to Ohm’s Law: I = V / R_eq.
      </p>

      {/* Circuit Diagram Simulator */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 1, active: branch1, set: setBranch1, label: 'LED Bank 1' },
            { id: 2, active: branch2, set: setBranch2, label: 'LED Bank 2' },
            { id: 3, active: branch3, set: setBranch3, label: 'LED Bank 3' },
          ].map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-lg border transition-all text-center space-y-2 ${
                b.active
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{b.label}</span>
                <Lightbulb className={`w-4 h-4 ${b.active ? 'text-amber-300 animate-pulse' : 'text-slate-600'}`} />
              </div>
              <div className="text-xs font-mono text-slate-300">R = 36 Ω</div>
              <div className="text-[11px] font-mono text-cyan-300 tabular-nums">
                {b.active ? `I = ${currentPerActiveBranch.toFixed(2)} A` : 'I = 0.00 A'}
              </div>
              <button
                type="button"
                onClick={() => b.set(!b.active)}
                className={`w-full py-1 text-xs font-medium rounded transition-colors ${
                  b.active
                    ? 'bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {b.active ? 'Switch: ON' : 'Switch: OFF'}
              </button>
            </div>
          ))}
        </div>

        {/* Meters Readout */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
          <div className="p-2 bg-slate-900/70 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Total Active Branches</span>
            <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">{activeBranches} / 3</span>
          </div>
          <div className="p-2 bg-slate-900/70 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Equivalent Resistance R_eq</span>
            <span className="font-mono text-sm font-bold text-cyan-300 tabular-nums">
              {activeBranches > 0 ? `${req.toFixed(1)} Ω` : '∞ (Open)'}
            </span>
          </div>
          <div className="p-2 bg-slate-900/70 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Total Supply Current (I)</span>
            <span className="font-mono text-sm font-bold text-amber-300 tabular-nums">
              {totalCurrent.toFixed(2)} A
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Three active 36 Ω branches yield <strong className="text-cyan-300">12.0 Ω</strong> total resistance.</span>
        <button
          onClick={() => { setBranch1(true); setBranch2(true); setBranch3(true); }}
          className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
        >
          Reset All Branches ON
        </button>
      </div>
    </div>
  );
};
