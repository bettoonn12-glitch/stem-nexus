import React, { useState } from 'react';
import { Compass, Sun, Binary, Cpu, Droplets, Wind, Zap, Gauge } from 'lucide-react';
import { Challenge } from '../../types';

interface Props {
  challenge: Challenge;
}

export const IntegratedMissionTool: React.FC<Props> = ({ challenge }) => {
  // For Mission 1 (Mars Rover)
  const [roverSpeed, setRoverSpeed] = useState<number>(0.6); // km/h
  const [roverDist, setRoverDist] = useState<number>(1.8); // km
  const [motorWatts, setMotorWatts] = useState<number>(300); // W
  const driveHours = roverDist / roverSpeed; // 3.0 h
  const motorEnergyWh = motorWatts * driveHours; // 900 Wh

  const solarPowerW = 500 * 0.20 * 1.5; // 150 W
  const solarEnergyWh = solarPowerW * driveHours; // 450 Wh

  // For Mission 2 (Eco Greenhouse)
  const [tankCapacity, setTankCapacity] = useState<number>(500); // L
  const concentrateL = tankCapacity / 5; // 100 L
  const waterL = tankCapacity * (4 / 5); // 400 L

  // For Mission 3 (Smart Grid)
  const [h1Demand, setH1Demand] = useState<number>(4.2);
  const [h2Demand, setH2Demand] = useState<number>(5.8);
  const [h3Demand, setH3Demand] = useState<number>(6.5);
  const meanDemand = (h1Demand + h2Demand + h3Demand) / 3;

  if (challenge.id === 'int-1') {
    return (
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-semibold text-slate-100">Mars Rover Flight Telemetry & Energy Dispatch</h4>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Sector: <span className="text-amber-300 font-bold">Helios Crater 18.3°N</span>
          </div>
        </div>

        {/* 3 Unified Pillar Telemetry Strips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Pillar 1: Mathematics */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold border-b border-slate-800/60 pb-1">
              <span>Mathematics: Power Draw</span>
              <Gauge className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Traverse Distance:</span>
                <span className="font-mono text-slate-200 tabular-nums">{roverDist} km</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Drive Velocity:</span>
                <span className="font-mono text-slate-200 tabular-nums">{roverSpeed} km/h</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Motor Power:</span>
                <span className="font-mono text-slate-200 tabular-nums">{motorWatts} W</span>
              </div>
              <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-cyan-300">
                <span>Drive Energy:</span>
                <span className="font-mono tabular-nums">{motorEnergyWh.toFixed(0)} Wh</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Science */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300 font-semibold border-b border-slate-800/60 pb-1">
              <span>Science: Solar Insolation</span>
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Solar Irradiance:</span>
                <span className="font-mono text-slate-200 tabular-nums">500 W/m²</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>PV Efficiency:</span>
                <span className="font-mono text-slate-200 tabular-nums">20% (η = 0.20)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Panel Area:</span>
                <span className="font-mono text-slate-200 tabular-nums">1.5 m²</span>
              </div>
              <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-amber-300">
                <span>Output Rate:</span>
                <span className="font-mono tabular-nums">{solarPowerW.toFixed(0)} Watts</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: ICT */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold border-b border-slate-800/60 pb-1">
              <span>ICT: Binary Nibble</span>
              <Binary className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Telemetry Nibble:</span>
                <span className="font-mono text-emerald-300 font-bold">1100₂</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Weight Expansion:</span>
                <span className="font-mono text-slate-300 text-[11px]">(8 + 4 + 0 + 0)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Decimal Status:</span>
                <span className="font-mono text-slate-200 tabular-nums">12₁₀</span>
              </div>
              <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-emerald-300">
                <span>Health Code:</span>
                <span className="font-mono">RESERVE_OK</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-xs flex justify-between items-center text-slate-300">
          <span>Net Energy Deficit during 3h drive: <strong className="text-rose-400 font-mono tabular-nums">-{motorEnergyWh - solarEnergyWh} Wh</strong> (Recovers in {(motorEnergyWh / solarPowerW).toFixed(1)} h stationary)</span>
        </div>
      </div>
    );
  }

  if (challenge.id === 'int-2') {
    return (
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-semibold text-slate-100">Smart Eco-Greenhouse Automation Deck</h4>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Mode: <span className="text-emerald-300 font-bold">Hydroponics Closed-Loop</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Pillar 1: Mathematics */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="text-xs text-cyan-300 font-semibold border-b border-slate-800/60 pb-1">
              Mathematics: 1 : 4 Ratio
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Total Reservoir:</span>
                <span className="font-mono text-slate-200 tabular-nums">{tankCapacity} L</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Parts:</span>
                <span className="font-mono text-slate-200 tabular-nums">1 + 4 = 5 parts</span>
              </div>
              <div className="flex justify-between font-bold text-cyan-300 pt-1 border-t border-slate-800">
                <span>Concentrate Needed:</span>
                <span className="font-mono tabular-nums">{concentrateL.toFixed(0)} L (20%)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Water Balance:</span>
                <span className="font-mono text-slate-200 tabular-nums">{waterL.toFixed(0)} L (80%)</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Science */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="text-xs text-amber-300 font-semibold border-b border-slate-800/60 pb-1">
              Science: Transpiration Physics
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Relative Humidity:</span>
                <span className="font-mono text-amber-300 font-bold tabular-nums">38% (Low)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>VPD Deficit:</span>
                <span className="font-mono text-slate-200 tabular-nums">1.45 kPa</span>
              </div>
              <div className="flex justify-between font-bold text-amber-300 pt-1 border-t border-slate-800">
                <span>Water Loss Rate:</span>
                <span className="font-mono tabular-nums">2.5× Baseline</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Accelerates stoma dehydration risk
              </div>
            </div>
          </div>

          {/* Pillar 3: ICT */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="text-xs text-emerald-300 font-semibold border-b border-slate-800/60 pb-1">
              ICT: Actuator Controller
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Condition:</span>
                <span className="font-mono text-emerald-300 text-[11px]">(H &lt; 40 ∨ T &gt; 30)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Reservoir Sensor:</span>
                <span className="font-mono text-emerald-300">Level 85% (OK)</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-300 pt-1 border-t border-slate-800">
                <span>Misting Nozzles:</span>
                <span className="font-mono">FIRING [ON]</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Ultrasonic mist active
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mission 3 (Smart Grid)
  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-100">Smart Renewable Power Grid Balancer</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Substation: <span className="text-cyan-300 font-bold">Offshore Wind Node 04</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Pillar 1: Mathematics */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="text-xs text-cyan-300 font-semibold border-b border-slate-800/60 pb-1">
            Mathematics: 3-Hour Mean
          </div>
          <div className="text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>H1 Demand:</span>
              <span className="font-mono text-slate-200 tabular-nums">{h1Demand} MW</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>H2 Demand:</span>
              <span className="font-mono text-slate-200 tabular-nums">{h2Demand} MW</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>H3 Demand:</span>
              <span className="font-mono text-slate-200 tabular-nums">{h3Demand} MW</span>
            </div>
            <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-cyan-300">
              <span>Mean Demand:</span>
              <span className="font-mono tabular-nums">{meanDemand.toFixed(1)} MW</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Science */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="text-xs text-amber-300 font-semibold border-b border-slate-800/60 pb-1">
            Science: Cubic Wind Power
          </div>
          <div className="text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Equation:</span>
              <span className="font-mono text-slate-300 text-[11px]">P = 0.5·ρ·A·v³</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Velocity Double:</span>
              <span className="font-mono text-amber-300 font-bold">2× speed</span>
            </div>
            <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-amber-300">
              <span>Power Increase:</span>
              <span className="font-mono">2³ = 8.0× Boost</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Air density ρ = 1.225 kg/m³
            </div>
          </div>
        </div>

        {/* Pillar 3: ICT */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="text-xs text-emerald-300 font-semibold border-b border-slate-800/60 pb-1">
            ICT: SCADA CRC Check
          </div>
          <div className="text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Protocol:</span>
              <span className="font-mono text-slate-300">IEC 61850</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Packet Size:</span>
              <span className="font-mono text-slate-200">128 Bytes</span>
            </div>
            <div className="pt-1 border-t border-slate-800 flex justify-between font-bold text-emerald-300">
              <span>Integrity:</span>
              <span className="font-mono">CRC-16 PASS</span>
            </div>
            <div className="text-[10px] text-slate-400">
              0x4B2E verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
