import React, { useState } from 'react';
import { Cpu, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const LogicGateTool: React.FC = () => {
  // Inputs:
  // A = High Temperature (1 = Overheat, 0 = Normal)
  // B = Coolant Pump Flow (1 = Active Flow, 0 = No Flow)
  // C = High Vibration (1 = Critical Vibration, 0 = Normal)
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);
  const [inputC, setInputC] = useState<number>(0);

  // Circuit: Q = (A AND NOT B) OR C
  const notB = inputB === 0 ? 1 : 0;
  const andGate = inputA === 1 && notB === 1 ? 1 : 0;
  const outputQ = andGate === 1 || inputC === 1 ? 1 : 0;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Robotic Safety Logic Interlock</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Circuit: <span className="text-cyan-300 font-bold">Q = (A ∧ ¬B) ∨ C</span>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Toggle sensor input states below to trace signal propagation through the NOT, AND, and OR gates to the emergency trip output Q.
      </p>

      {/* Inputs Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Sensor A: Heat</span>
            <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${inputA ? 'bg-rose-950/80 text-rose-300' : 'bg-slate-800 text-slate-400'}`}>
              {inputA ? 'CRITICAL (1)' : 'NORMAL (0)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setInputA(inputA === 1 ? 0 : 1)}
            className="w-full py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
          >
            Toggle A (Currently {inputA})
          </button>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Sensor B: Coolant</span>
            <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${inputB ? 'bg-emerald-950/80 text-emerald-300' : 'bg-amber-950/80 text-amber-300'}`}>
              {inputB ? 'FLOW OK (1)' : 'LOW FLOW (0)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setInputB(inputB === 1 ? 0 : 1)}
            className="w-full py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
          >
            Toggle B (Currently {inputB})
          </button>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Sensor C: Vibration</span>
            <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${inputC ? 'bg-rose-950/80 text-rose-300' : 'bg-slate-800 text-slate-400'}`}>
              {inputC ? 'HIGH VIB (1)' : 'NORMAL (0)'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setInputC(inputC === 1 ? 0 : 1)}
            className="w-full py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
          >
            Toggle C (Currently {inputC})
          </button>
        </div>
      </div>

      {/* Logic Gate Signal Stages */}
      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">1. NOT B Inverter</span>
            <span className="font-mono font-bold text-cyan-300">NOT({inputB}) = {notB}</span>
          </div>
          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">2. AND Gate (A ∧ ¬B)</span>
            <span className="font-mono font-bold text-cyan-300">{inputA} ∧ {notB} = {andGate}</span>
          </div>
          <div className="p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-mono">3. Final OR (Stage 2 ∨ C)</span>
            <span className="font-mono font-bold text-cyan-300">{andGate} ∨ {inputC} = {outputQ}</span>
          </div>
        </div>

        {/* Master Output State Card */}
        <div className={`p-3 rounded-lg border flex items-center justify-between ${
          outputQ === 1
            ? 'bg-rose-950/50 border-rose-600/70 text-rose-200'
            : 'bg-emerald-950/50 border-emerald-600/70 text-emerald-200'
        }`}>
          <div className="flex items-center gap-2">
            {outputQ === 1 ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <div>
              <div className="font-bold text-xs">
                {outputQ === 1 ? 'OUTPUT Q = 1 (EMERGENCY SHUTDOWN ACTIVATED)' : 'OUTPUT Q = 0 (ALL SYSTEMS NORMAL)'}
              </div>
              <div className="text-[11px] opacity-80">
                {outputQ === 1
                  ? 'Actuators cut power to prevent mechanical seizure.'
                  : 'Robot arm maintains active motion cycle.'}
              </div>
            </div>
          </div>
          <div className="font-mono text-xl font-bold tabular-nums">
            Q = {outputQ}
          </div>
        </div>
      </div>
    </div>
  );
};
