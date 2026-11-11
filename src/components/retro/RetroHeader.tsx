import React, { useState } from 'react';
import { Sparkles, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { sound } from '../../utils/audio';
import { Language } from '../../utils/i18n';
import { GradeLevel } from '../../types/game';
import { CharacterCustomization } from '../../types/character';

interface Props {
  totalScore: number;
  maxScore: number;
  playerName: string;
  character: CharacterCustomization;
  gradeLevel: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  lang?: Language;
}

const GRADES_LIST: { id: GradeLevel; labelId: string; labelEn: string }[] = [
  { id: 'sd-1', labelId: 'SD Kelas 1', labelEn: 'SD Grade 1' },
  { id: 'sd-2', labelId: 'SD Kelas 2', labelEn: 'SD Grade 2' },
  { id: 'sd-3', labelId: 'SD Kelas 3', labelEn: 'SD Grade 3' },
  { id: 'sd-4', labelId: 'SD Kelas 4', labelEn: 'SD Grade 4' },
  { id: 'sd-5', labelId: 'SD Kelas 5', labelEn: 'SD Grade 5' },
  { id: 'sd-6', labelId: 'SD Kelas 6', labelEn: 'SD Grade 6' },
  { id: 'smp-1', labelId: 'SMP Kelas 7 (1)', labelEn: 'SMP Class 7' },
  { id: 'smp-2', labelId: 'SMP Kelas 8 (2)', labelEn: 'SMP Class 8' },
  { id: 'smp-3', labelId: 'SMP Kelas 9 (3)', labelEn: 'SMP Class 9' },
  { id: 'all', labelId: 'Semua Tingkat', labelEn: 'All Grades' },
];

export const RetroHeader: React.FC<Props> = ({
  totalScore,
  playerName,
  character,
  gradeLevel,
  onSelectGrade,
  lang = 'id',
}) => {
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState<boolean>(false);

  const playerLevel = 24 + Math.floor(totalScore / 100);
  const currentXp = 12430 + totalScore * 10;
  const targetXp = 18000;
  const xpPercent = Math.min(100, Math.round(((currentXp % 6000) / 6000) * 100));

  const currentGradeObj = GRADES_LIST.find((g) => g.id === gradeLevel) || GRADES_LIST[4];
  const gradeDisplay = lang === 'id' ? currentGradeObj.labelId : currentGradeObj.labelEn;

  // Character avatar icon logic matching customization
  const getAvatarIcon = () => {
    if (character.headwear === 'head_crown') return '👑';
    if (character.headwear === 'head_helmet') return '🪖';
    if (character.headwear === 'head_cap') return '🧢';
    if (character.headwear === 'head_goggles') return '𥽽';
    if (character.baseStyle === 'scout') return '🧝';
    if (character.baseStyle === 'cyborg') return '🤖';
    return '🧑‍🚀';
  };

  return (
    <header className="relative z-30 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 select-none">
      {/* Left: Pixel Logo Lockup + Grade Switcher Button */}
      <div className="flex items-center gap-3">
        {/* 3D Planet Globe with Orbit Ring */}
        <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1d4ed8] via-[#0284c7] to-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.7)] border-2 border-white/80 overflow-hidden">
            <div className="absolute top-1 left-2 w-5 h-4 bg-[#22c55e] rounded-full opacity-90 blur-[0.5px]" />
            <div className="absolute bottom-2 right-1 w-6 h-5 bg-[#16a34a] rounded-full opacity-80" />
            <div className="absolute top-4 right-3 w-3 h-2 bg-[#4ade80] rounded-full opacity-90" />
          </div>
          <div className="absolute w-14 h-5 border-2 border-cyan-300 rounded-[50%] rotate-[-25deg] shadow-[0_0_8px_rgba(34,211,238,0.8)] pointer-events-none" />
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse pointer-events-none" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl sm:text-2xl font-black font-tech tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,35,90,0.9)]">
              STEM NEXUS
            </h1>
            <span className="text-xs text-yellow-300 animate-bounce">✨</span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-bold text-cyan-100 tracking-wide drop-shadow-[0_1px_2px_rgba(0,20,70,0.8)]">
            Science • Technology • Engineering • Mathematics
          </p>
        </div>

        {/* Grade Selector Button (In Homescreen Top-Left) */}
        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsGradeDropdownOpen(!isGradeDropdownOpen);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-game"
            title="Klik untuk memilih Jenjang Kelas Siswa"
          >
            <GraduationCap className="w-3.5 h-3.5 text-slate-950" />
            <span>{gradeDisplay}</span>
            {isGradeDropdownOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Popover Grade Dropdown */}
          {isGradeDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsGradeDropdownOpen(false)}
              />
              <div className="absolute top-10 left-0 z-50 w-64 bg-[#0d2757] border-2 border-cyan-400 rounded-xl p-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Ganti Jenjang Kelas Siswa:' : 'Change Student Grade:'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
                  {GRADES_LIST.map((g) => {
                    const isSelected = gradeLevel === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          onSelectGrade(g.id);
                          setIsGradeDropdownOpen(false);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-black shadow ring-2 ring-yellow-200'
                            : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {lang === 'id' ? g.labelId : g.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Middle: Player HUD (Display-Only, Consistent Avatar) */}
      <div
        className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl aero-glass-panel border-2 border-cyan-300/60 shadow-lg"
      >
        <div
          className="relative w-10 h-10 rounded-full border-2 border-white/90 shadow shrink-0 flex items-center justify-center text-xl overflow-hidden transition-all"
          style={{ backgroundColor: character.primaryColor || '#3b82f6' }}
        >
          {getAvatarIcon()}
        </div>

        <div className="min-w-[140px] space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-white drop-shadow font-game">{playerName}</span>
            <span className="text-yellow-300 font-mono text-[11px] bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-400/40">
              Lv. {playerLevel}
            </span>
          </div>
          <div className="relative h-3 w-full bg-slate-950/80 rounded-full overflow-hidden border border-yellow-400/50 p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-400 transition-all duration-500 relative"
              style={{ width: `${Math.max(12, xpPercent)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-slate-900 tracking-tight leading-none">
              {currentXp.toLocaleString()} / {targetXp.toLocaleString()} XP
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
