import React, { useState } from 'react';
import { Binary, Cpu, RotateCcw } from 'lucide-react';

export const BinaryRegisterTool: React.FC = () => {
  // 8 bits: index 0 is MSB (bit 7 = 128), index 7 is LSB (bit 0 = 1)
  // Default is challenge value: 10101100
  const [bits, setBits] = useState<number[]>([1, 0, 1, 0, 1, 1, 0, 0]);

  const weights = [128, 64, 32, 16, 8, 4, 2, 1];

  const toggleBit = (idx: number) => {
    const next = [...bits];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setBits(next);
  };

  const decimalValue = bits.reduce((sum, b, i) => sum + b * weights[i], 0);
  const hexValue = decimalValue.toString(16).toUpperCase().padStart(2, '0');

  // Frame resolution calculation demo: 640 x 480 8-bit
  const frameBytes = 640 * 480 * 1;
  const frameKb = frameBytes / 1024;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">8-Bit Digital Telemetry Register</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Architecture: <span className="text-cyan-300 font-bold">1 Byte (8 Bits)</span>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Click any bit below to toggle between 0 (LOW) and 1 (HIGH). Observe how base-2 positional weights combine into decimal and hexadecimal notations.
      </p>

      {/* 8-Bit Interactive Register Grid */}
      <div className="grid grid-cols-8 gap-1.5 md:gap-2">
        {bits.map((bit, idx) => {
          const bitIndex = 7 - idx; // bit 7 down to bit 0
          const weight = weights[idx];
          return (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-mono mb-1">
                2^{bitIndex}
              </span>
              <button
                type="button"
                onClick={() => toggleBit(idx)}
                className={`w-full aspect-square rounded-lg flex items-center justify-center font-mono text-base md:text-lg font-bold border transition-all ${
                  bit === 1
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700'
                }`}
              >
                {bit}
              </button>
              <span className={`text-[11px] font-mono mt-1 ${bit === 1 ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                {weight}
              </span>
            </div>
          );
        })}
      </div>

      {/* Conversion Output Panel */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
        <div>
          <span className="text-[10px] text-slate-400 block font-mono">Binary (Base-2)</span>
          <span className="font-mono text-xs md:text-sm text-cyan-300 font-bold tracking-wider">
            {bits.join('')}₂
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-mono">Decimal (Base-10)</span>
          <span className="font-mono text-base md:text-lg text-emerald-400 font-bold tabular-nums">
            {decimalValue}₁₀
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-mono">Hexadecimal (Base-16)</span>
          <span className="font-mono text-base md:text-lg text-amber-300 font-bold">
            0x{hexValue}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Sensor Frame memory: <strong className="text-slate-200">640×480 × 1 byte = {frameKb} KB</strong></span>
        <button
          type="button"
          onClick={() => setBits([1, 0, 1, 0, 1, 1, 0, 0])}
          className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to 10101100
        </button>
      </div>
    </div>
  );
};
