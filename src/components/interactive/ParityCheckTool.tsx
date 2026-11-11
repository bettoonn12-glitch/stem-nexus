import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Zap, RotateCcw } from 'lucide-react';

export const ParityCheckTool: React.FC = () => {
  // 7 data bits for ASCII 'S': 1, 0, 1, 0, 0, 1, 1
  const [dataBits, setDataBits] = useState<number[]>([1, 0, 1, 0, 0, 1, 1]);
  // 8th parity bit
  const [parityBit, setParityBit] = useState<number>(0);

  const toggleDataBit = (idx: number) => {
    const next = [...dataBits];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setDataBits(next);
  };

  const dataOnesCount = dataBits.reduce((sum, b) => sum + b, 0);
  const totalOnesCount = dataOnesCount + parityBit;
  const isEvenParityValid = totalOnesCount % 2 === 0;

  const simulateNoiseGlitch = () => {
    // Flip 3rd bit (index 2) to simulate noise
    const next = [...dataBits];
    next[2] = next[2] === 1 ? 0 : 1;
    setDataBits(next);
  };

  const resetBits = () => {
    setDataBits([1, 0, 1, 0, 0, 1, 1]);
    setParityBit(0);
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Even Parity Error Detection Engine</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Protocol: <span className="text-cyan-300 font-bold">Even Parity</span>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        In Even Parity, the total count of 1-bits in the 8-bit transmitted word must always sum to an even number.
      </p>

      {/* Bit Cells */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-300 font-mono">7-Bit Data Word (ASCII 'S'):</span>
          <span className="text-amber-300 font-mono">8th Parity Bit:</span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          {/* 7 data bits */}
          <div className="grid grid-cols-7 gap-1.5 flex-1">
            {dataBits.map((b, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-mono">b{idx}</span>
                <button
                  type="button"
                  onClick={() => toggleDataBit(idx)}
                  className={`w-full aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-sm border transition-all ${
                    b === 1
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {b}
                </button>
              </div>
            ))}
          </div>

          <div className="w-px h-10 bg-slate-700 mx-1 shrink-0" />

          {/* 8th Parity bit */}
          <div className="flex flex-col items-center w-12 shrink-0">
            <span className="text-[10px] text-amber-300 font-mono">PARITY</span>
            <button
              type="button"
              onClick={() => setParityBit(parityBit === 0 ? 1 : 0)}
              className={`w-full aspect-square rounded-lg flex items-center justify-center font-mono font-bold text-sm border transition-all ${
                parityBit === 1
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-950 text-slate-400 border-slate-700 hover:border-slate-600'
              }`}
            >
              {parityBit}
            </button>
          </div>
        </div>
      </div>

      {/* Integrity Verification Card */}
      <div className={`p-3 rounded-lg border flex items-center justify-between ${
        isEvenParityValid
          ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-200'
          : 'bg-rose-950/40 border-rose-600/70 text-rose-200'
      }`}>
        <div className="flex items-center gap-2">
          {isEvenParityValid ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <div className="text-xs">
            <div className="font-bold">
              {isEvenParityValid
                ? `PARITY VALID (Total 1s = ${totalOnesCount}, Even)`
                : `TRANSMISSION ERROR (Total 1s = ${totalOnesCount}, Odd)`}
            </div>
            <div className="text-[11px] opacity-80">
              {isEvenParityValid
                ? 'Invariant satisfied: packet accepted by receiver.'
                : 'Parity invariant violated: receiver requests packet retransmission!'}
            </div>
          </div>
        </div>
        <div className="text-right text-xs font-mono">
          Sum: <strong className="text-sm">{totalOnesCount}</strong>
        </div>
      </div>

      {/* Simulator Actions */}
      <div className="flex items-center justify-between text-xs pt-1">
        <button
          type="button"
          onClick={simulateNoiseGlitch}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 rounded border border-rose-800 transition-colors"
        >
          <Zap className="w-3.5 h-3.5" />
          Simulate Cosmic Noise Bit Flip
        </button>

        <button
          type="button"
          onClick={resetBits}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>
    </div>
  );
};
