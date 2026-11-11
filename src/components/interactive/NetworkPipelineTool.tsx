import React, { useState } from 'react';
import { Radio, Wifi, Clock, ArrowRight } from 'lucide-react';

export const NetworkPipelineTool: React.FC = () => {
  const [packetCount, setPacketCount] = useState<number>(5000);
  const [packetBytes, setPacketBytes] = useState<number>(64);
  const [bandwidthKbps, setBandwidthKbps] = useState<number>(256);
  const [propagationLatencyMs, setPropagationLatencyMs] = useState<number>(120);

  const totalBytes = packetCount * packetBytes;
  const totalBits = totalBytes * 8;
  const bandwidthBps = bandwidthKbps * 1000;
  const serializationTimeSec = totalBits / bandwidthBps;
  const propagationTimeSec = propagationLatencyMs / 1000;
  const totalDeliverySec = serializationTimeSec + propagationTimeSec;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Satellite Telemetry Transmission Pipeline</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Link: <span className="text-cyan-300 font-bold tabular-nums">256 kbps Uplink</span>
        </div>
      </div>

      {/* Input Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Telemetry Batch Packets:</span>
            <span className="font-mono text-cyan-300 font-bold tabular-nums">{packetCount.toLocaleString()} pkts</span>
          </div>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={packetCount}
            onChange={(e) => setPacketCount(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>1,000</span>
            <span className="text-cyan-300 font-semibold">5,000 pkts</span>
            <span>10,000</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Orbital Propagation Latency:</span>
            <span className="font-mono text-cyan-300 font-bold tabular-nums">{propagationLatencyMs} ms</span>
          </div>
          <input
            type="range"
            min="20"
            max="300"
            step="10"
            value={propagationLatencyMs}
            onChange={(e) => setPropagationLatencyMs(Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>20 ms (LEO)</span>
            <span className="text-cyan-300 font-semibold">120 ms</span>
            <span>300 ms (GEO)</span>
          </div>
        </div>
      </div>

      {/* Pipeline Breakdown Diagram */}
      <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span>Payload Serialization: <strong className="text-cyan-300 font-mono tabular-nums">{serializationTimeSec.toFixed(2)} s</strong></span>
          <span>Light-Speed Propagation: <strong className="text-amber-400 font-mono tabular-nums">{propagationTimeSec.toFixed(3)} s</strong></span>
        </div>

        {/* Visual Pipeline Bar */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="bg-cyan-500 h-full"
            style={{ width: `${(serializationTimeSec / totalDeliverySec) * 100}%` }}
            title="Serialization Delay"
          />
          <div
            className="bg-amber-400 h-full"
            style={{ width: `${(propagationTimeSec / totalDeliverySec) * 100}%` }}
            title="Propagation Delay"
          />
        </div>

        {/* Result Gauge */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Total Payload</span>
            <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">{(totalBytes / 1024).toFixed(1)} KB</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Total Bits</span>
            <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">{totalBits.toLocaleString()} b</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Total Delivery Time</span>
            <span className="font-mono text-base font-bold text-cyan-300 tabular-nums">{totalDeliverySec.toFixed(2)} s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
