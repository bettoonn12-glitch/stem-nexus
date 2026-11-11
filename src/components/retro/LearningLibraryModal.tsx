import React, { useState } from 'react';
import { X, BookOpen, Calculator, Zap, Cpu, Compass, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenLab: (id?: string) => void;
}

export const LearningLibraryModal: React.FC<Props> = ({ isOpen, onClose, onOpenLab }) => {
  const [selectedTopic, setSelectedTopic] = useState<'math' | 'science' | 'ict' | 'engineering'>('math');

  if (!isOpen) return null;

  const topics = {
    math: [
      {
        title: 'Reverse Osmosis Recovery Ratios',
        formula: 'Recovery Rate = (Q_permeate / Q_feed) × 100%',
        summary: 'Direct proportions determine potable drinking water yields from high-salinity ocean seawater.',
        takeaway: 'At a 45% recovery rate, obtaining 360 L of clean water requires pumping exactly 800 L of seawater (360 / 0.45 = 800).',
        widget: 'desalination-ratio',
      },
      {
        title: 'Lithium Battery Linear Discharge Modeling',
        formula: 'Remaining % = ((E_total - (P × t)) / E_total) × 100%',
        summary: 'Lithium-polymer cells maintain constant discharge voltage under steady continuous motor draw.',
        takeaway: '48 minutes at 45 Watts consumes 36.0 Wh from a 59.94 Wh pack, leaving ~39.9% SoC remaining.',
        widget: 'battery-drain',
      },
      {
        title: 'Exponential Bioreactor Doubling',
        formula: 'Mass(t) = M_0 × 2^(t / T_d)',
        summary: 'Algae biomass reproduction under unconstrained CO2 and illumination follows geometric progression.',
        takeaway: 'Doubling every 6 hours yields 2³ = 8× initial biomass after 18 hours (150 g × 8 = 1,200 g).',
        widget: 'biomass-growth',
      },
    ],
    science: [
      {
        title: "Ohm's Law in Multi-Branch Parallel Circuits",
        formula: '1 / R_eq = ∑ (1 / R_i)  |  I_total = V / R_eq',
        summary: 'In parallel circuitry, each branch experiences identical voltage, and equivalent resistance drops as branches are added.',
        takeaway: 'Three 36 Ω LED banks in parallel yield 12 Ω total equivalent resistance, drawing exactly 2.0 A at 24V DC.',
        widget: 'parallel-circuit',
      },
      {
        title: 'Logarithmic Acidity & Hydronium Equilibrium',
        formula: 'pH = -log₁₀[H⁺]  |  Δ[H⁺] = 10^(pH_target - pH_initial)',
        summary: 'Because pH is an inverse logarithmic scale, an integer step represents a tenfold change in hydronium ions.',
        takeaway: 'Neutralizing water from pH 4.0 to pH 7.0 requires diluting/buffering hydronium concentration by 1,000 times (10³).',
        widget: 'ph-neutralization',
      },
      {
        title: 'Cardiovascular Dynamics & The Bohr Effect',
        formula: 'Q = Heart Rate (HR) × Stroke Volume (SV)',
        summary: 'Elevated cellular respiration produces CO₂ and lactic acid, lowering local muscle pH and releasing bound oxygen.',
        takeaway: 'An athlete at 140 bpm and 100 mL/beat circulates 14.0 L/min of oxygenated blood (nearly 3× resting baseline).',
        widget: 'cardiac-oxygen',
      },
    ],
    ict: [
      {
        title: 'Positional Base-2 Binary Representation',
        formula: 'Decimal = ∑ (b_i × 2^i)  |  Hex = [high_nibble][low_nibble]',
        summary: 'Digital computers represent continuous physical voltages as discrete high (1) and low (0) binary bits.',
        takeaway: 'Binary 10101100₂ evaluates to (128 + 32 + 8 + 4) = 172 in decimal, and 0xAC in hexadecimal notation.',
        widget: 'binary-register',
      },
      {
        title: 'Combinational Logic Gates & Safety Interlocks',
        formula: 'Q = (A ∧ ¬B) ∨ C',
        summary: 'Hardware interlocks use Boolean logic gates to execute sub-millisecond emergency shutdowns.',
        takeaway: 'When overheat A=1 and coolant flow B=0, NOT(B)=1, tripping the AND gate to fire emergency shutdown Q=1.',
        widget: 'logic-gates',
      },
      {
        title: 'Serialization Latency & Propagation Pipeline',
        formula: 'T_total = (Total Bits / Bandwidth) + (Distance / Speed of Light)',
        summary: 'Network delivery delay is the sum of transmission serialization and electromagnetic propagation.',
        takeaway: 'Sending 5,000 64-byte packets over 256 kbps requires 10.00 s serialization + 0.12 s orbital latency = 10.12 seconds.',
        widget: 'network-latency',
      },
    ],
    engineering: [
      {
        title: 'Planetary Rover Power Traverse Budget',
        formula: 'E = P × (d / v)  |  P_solar = Irradiance × η × Area',
        summary: 'Autonomous robots balance kinetic traction energy against solar panel photovoltaic replenishment.',
        takeaway: 'Driving 1.8 km at 0.6 km/h takes 3.0 h, consuming 900 Wh while recovering 150 W solar power under Martian sun.',
        widget: 'integrated-mission',
      },
      {
        title: 'Compound Gear Velocity Reduction',
        formula: 'RPM_out = RPM_in × (Teeth_driver / Teeth_driven)',
        summary: 'Geartrains transform high-speed motor rotation into high-torque output axle drive.',
        takeaway: 'A 16-tooth driver meshed to a 24-tooth axle with an intermediate idler yields 360 × (16/24) = 240 RPM.',
        widget: 'gear-ratio',
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm select-none">
      <div className="aero-window rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden bg-[#103577] border-2 border-cyan-300">
        {/* Title Bar */}
        <div className="px-5 py-3 bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] border-b-2 border-white/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <h3 className="font-game font-bold text-base text-white drop-shadow">
              STEM Nexus Concept Library & Formula Guides
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-rose-600/80 hover:bg-rose-500 border border-white text-white flex items-center justify-center shadow"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-5 py-2.5 bg-blue-950/80 border-b border-blue-400/30 flex items-center gap-2 overflow-x-auto text-xs font-game">
          {[
            { id: 'math', label: 'Mathematics', icon: <Calculator className="w-3.5 h-3.5" /> },
            { id: 'science', label: 'Science', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'ict', label: 'ICT Systems', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'engineering', label: 'Engineering', icon: <Compass className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedTopic(tab.id as any);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                selectedTopic === tab.id
                  ? 'bg-cyan-500 text-blue-950 font-bold border-white shadow'
                  : 'bg-blue-900/60 text-sky-200 border-blue-400/30 hover:bg-blue-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Topics */}
        <div className="p-5 overflow-y-auto space-y-3 font-game text-xs">
          {topics[selectedTopic].map((t, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-blue-950/70 border border-blue-400/40 space-y-2 shadow"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-yellow-300 drop-shadow">
                  {t.title}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenLab(t.widget);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-600/60 hover:bg-cyan-500 text-white font-bold border border-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>Open Lab</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Mathematical Formula Banner */}
              <div className="p-2 rounded-xl bg-blue-900/80 border border-blue-400/30 font-mono text-cyan-200 text-xs">
                {t.formula}
              </div>

              <p className="text-slate-200 leading-relaxed">{t.summary}</p>
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                <strong className="text-emerald-300">Key Principle:</strong> {t.takeaway}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
