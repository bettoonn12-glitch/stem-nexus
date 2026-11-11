import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { Language, TRANSLATIONS } from '../../utils/i18n';
import { CharacterCustomization } from '../../types/character';
import { GradeLevel } from '../../types/game';
import { ArrowRight, ShieldCheck, Sparkles, GraduationCap, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  playerName: string;
  character: CharacterCustomization;
  language: Language;
  gradeLevel: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onSignIn: () => void;
}

const GRADES: { id: GradeLevel; labelId: string; labelEn: string; category: 'sd' | 'smp' | 'all' }[] = [
  { id: 'sd-1', labelId: 'SD Kelas 1', labelEn: 'SD Grade 1', category: 'sd' },
  { id: 'sd-2', labelId: 'SD Kelas 2', labelEn: 'SD Grade 2', category: 'sd' },
  { id: 'sd-3', labelId: 'SD Kelas 3', labelEn: 'SD Grade 3', category: 'sd' },
  { id: 'sd-4', labelId: 'SD Kelas 4', labelEn: 'SD Grade 4', category: 'sd' },
  { id: 'sd-5', labelId: 'SD Kelas 5', labelEn: 'SD Grade 5', category: 'sd' },
  { id: 'sd-6', labelId: 'SD Kelas 6', labelEn: 'SD Grade 6', category: 'sd' },
  { id: 'smp-1', labelId: 'SMP Kelas 7 (1)', labelEn: 'SMP Class 7', category: 'smp' },
  { id: 'smp-2', labelId: 'SMP Kelas 8 (2)', labelEn: 'SMP Class 8', category: 'smp' },
  { id: 'smp-3', labelId: 'SMP Kelas 9 (3)', labelEn: 'SMP Class 9', category: 'smp' },
  { id: 'all', labelId: 'Semua Tingkat', labelEn: 'All Grades', category: 'all' },
];

export const LockScreen: React.FC<Props> = ({
  playerName,
  character,
  language,
  gradeLevel,
  onSelectGrade,
  onSignIn,
}) => {
  const [timeStr, setTimeStr] = useState<string>('08:45 AM');
  const [dateStr, setDateStr] = useState<string>('Sunday, November 10');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isGradeMenuOpen, setIsGradeMenuOpen] = useState<boolean>(false);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      setDateStr(
        now.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const handleSignInClick = () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    // Explicit user action: Transitioning from Lock Screen to Desktop triggers authentic Windows startup sound!
    sound.playStartupSound();
    setTimeout(() => {
      onSignIn();
    }, 450);
  };

  const currentGradeObj = GRADES.find((g) => g.id === gradeLevel) || GRADES[4];
  const currentGradeLabel = language === 'id' ? currentGradeObj.labelId : currentGradeObj.labelEn;

  // Character avatar icon logic
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
    <div className="fixed inset-0 z-50 select-none flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0a235c] via-[#103a8a] to-[#041334] animate-in fade-in duration-300">
      {/* Bliss Horizon Atmosphere Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_40%,#38bdf8_0%,transparent_65%)]" />

      {/* Top Header Strip with Windows XP Branding */}
      <div className="relative z-10 px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-cyan-400/20 bg-blue-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg border border-white">
            <span className="text-white text-sm font-black">SN</span>
          </div>
          <div>
            <span className="text-white font-extrabold tracking-wide text-sm font-game">
              STEM NEXUS WORKSTATION
            </span>
            <span className="text-[10px] text-cyan-300 block font-mono">
              Windows XP Arcade Edition
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base sm:text-lg font-bold text-white font-mono">{timeStr}</div>
          <div className="text-xs text-blue-200">{dateStr}</div>
        </div>
      </div>

      {/* Center Sign-In Box */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 my-auto">
        <div className="w-full max-w-sm rounded-3xl p-6 sm:p-7 aero-window border-2 border-[#6ec3ff] bg-[#103577]/90 shadow-[0_0_50px_rgba(56,189,248,0.4)] backdrop-blur-xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
          {/* User Avatar Circle */}
          <div className="relative mb-3">
            <div
              className="w-20 h-20 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-4xl overflow-hidden transition-all"
              style={{ backgroundColor: character.primaryColor || '#3b82f6' }}
            >
              {getAvatarIcon()}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 border-2 border-white shadow">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white font-game drop-shadow">
            {playerName}
          </h2>
          <div className="text-xs text-cyan-200 font-bold mb-5 font-mono">
            STEM Cadet · Level 24
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={handleSignInClick}
            disabled={isSigningIn}
            className="w-full py-3.5 px-6 rounded-2xl aero-button text-white font-game font-extrabold text-base shadow-xl border-2 border-white flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600"
          >
            <span>{isSigningIn ? t.signingIn : t.signIn}</span>
            <ArrowRight className="w-5 h-5 text-yellow-300 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Bottom Bar with Grade Selector on Left Down Side */}
      <div className="relative z-20 px-6 sm:px-8 py-3.5 flex items-center justify-between text-xs text-blue-200 border-t border-cyan-400/20 bg-blue-950/70 backdrop-blur-md">
        {/* Left Down Side: Single Grade Button with Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsGradeMenuOpen(!isGradeMenuOpen);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border-2 border-amber-400/70 text-amber-300 hover:text-white hover:bg-slate-800 font-bold shadow-lg cursor-pointer transition-all active:scale-95"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>{currentGradeLabel}</span>
            {isGradeMenuOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {/* Floating Grade Selector Popup */}
          {isGradeMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsGradeMenuOpen(false)}
              />
              <div className="absolute bottom-12 left-0 z-40 w-72 bg-[#0d2757] border-2 border-cyan-400 rounded-2xl p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="text-[11px] font-black text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>{language === 'id' ? 'Pilih Jenjang Kelas Siswa:' : 'Select Student Grade Level:'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {GRADES.map((g) => {
                    const isSelected = gradeLevel === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          onSelectGrade(g.id);
                          setIsGradeMenuOpen(false);
                        }}
                        className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-black shadow ring-2 ring-yellow-200'
                            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {language === 'id' ? g.labelId : g.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">
            {language === 'id' ? 'Kurikulum SD & SMP Terintegrasi' : 'Elementary & Junior High Curriculum Active'}
          </span>
          <span className="font-mono text-cyan-300 text-[11px]">Build v2.4</span>
        </div>
      </div>
    </div>
  );
};
