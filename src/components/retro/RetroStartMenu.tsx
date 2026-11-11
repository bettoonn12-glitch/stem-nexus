import React, { useState } from 'react';
import {
  FileText,
  Music,
  Calculator as CalcIcon,
  Palette,
  Clock,
  Sparkles,
  Gamepad2,
  Folder,
  Settings,
  HelpCircle,
  Search,
  Terminal,
  LogOut,
  Power,
  ChevronRight,
  Trophy,
  Users,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { NavTab } from './RetroSidebar';
import { CharacterCustomization } from '../../types/character';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectNav: (tab: NavTab) => void;
  onOpenSettings?: () => void;
  onOpenPowerDialog?: () => void;
  onOpenCalculator?: () => void;
  onOpenMusic?: () => void;
  onOpenNotepad?: () => void;
  onOpenClock?: () => void;
  onOpenPaint?: () => void;
  onOpenLibrary?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAchievements?: () => void;
  onOpenCredits?: () => void;
  playerName: string;
  character?: CharacterCustomization;
  lang?: 'en' | 'id';
}

export const RetroStartMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectNav,
  onOpenSettings,
  onOpenPowerDialog,
  onOpenCalculator,
  onOpenMusic,
  onOpenNotepad,
  onOpenClock,
  onOpenPaint,
  onOpenLibrary,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenCredits,
  playerName,
  character,
  lang = 'en',
}) => {
  const [showAllPrograms, setShowAllPrograms] = useState<boolean>(false);

  if (!isOpen) return null;

  // Character avatar display
  const avatarBg = character?.primaryColor || '#3b82f6';
  const avatarEmoji =
    character?.baseStyle === 'scout'
      ? '🧝'
      : character?.baseStyle === 'cyborg'
      ? '🤖'
      : '🧑‍🚀';

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Start Menu Main Window matching StartMenu.png */}
      <div className="fixed bottom-10 left-1 z-50 w-[420px] max-w-[95vw] rounded-t-lg overflow-hidden border-2 border-[#0055ea] shadow-[0_10px_35px_rgba(0,0,0,0.6)] bg-white select-none animate-in fade-in slide-in-from-bottom-2 duration-150 font-sans text-xs flex flex-col">
        {/* TOP BLUE HEADER */}
        <div className="h-16 px-4 bg-gradient-to-r from-[#185bd8] via-[#2478f2] to-[#185bd8] border-b-2 border-[#0055ea] flex items-center gap-3.5 shadow-inner shrink-0">
          {/* Framed Avatar */}
          <div className="relative p-1 bg-white/90 rounded border-2 border-white shadow-md">
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-2xl shadow-inner overflow-hidden"
              style={{ backgroundColor: avatarBg }}
            >
              {avatarEmoji}
            </div>
          </div>
          {/* User Name */}
          <div className="overflow-hidden">
            <div className="font-extrabold text-white text-base drop-shadow-md truncate">
              {playerName || 'Administrator'}
            </div>
            <div className="text-[11px] text-cyan-200 font-bold truncate">
              STEM Nexus Cadet • Level 24
            </div>
          </div>
        </div>

        {/* TWO-COLUMN BODY */}
        <div className="flex flex-1 min-h-[380px]">
          {/* LEFT COLUMN (WHITE) - Pinned Apps */}
          <div className="w-[52%] bg-white p-2 flex flex-col justify-between border-r border-[#96b8e8]">
            <div className="space-y-1">
              {/* STEM Quiz Arena */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectNav('quiz');
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#2f71cd] hover:text-white flex items-center gap-2.5 text-left cursor-pointer group transition-colors"
              >
                <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 group-hover:text-white truncate">
                    STEM Quiz Arena
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">
                    {lang === 'id' ? 'Kuis Multi-Genre' : 'Arcade Quiz Engine'}
                  </div>
                </div>
              </button>

              {/* Windows Media Player (Music App) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenMusic) onOpenMusic();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#2f71cd] hover:text-white flex items-center gap-2.5 text-left cursor-pointer group transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-cyan-500 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 group-hover:text-white truncate">
                    Windows Media Player
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">
                    STEM Odyssey OST
                  </div>
                </div>
              </button>

              {/* Calculator App */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenCalculator) onOpenCalculator();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#2f71cd] hover:text-white flex items-center gap-2.5 text-left cursor-pointer group transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#3b82f6] flex items-center justify-center text-white shadow-xs shrink-0">
                  <CalcIcon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 group-hover:text-white truncate">
                    Kalkulator
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">
                    Standard & Sains
                  </div>
                </div>
              </button>

              {/* Notepad App */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenNotepad) onOpenNotepad();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#2f71cd] hover:text-white flex items-center gap-2.5 text-left cursor-pointer group transition-colors"
              >
                <div className="w-8 h-8 rounded bg-sky-100 border border-sky-400 flex items-center justify-center text-blue-700 shadow-xs shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 group-hover:text-white truncate">
                    Notepad
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">
                    Catatan Kadet
                  </div>
                </div>
              </button>

              {/* Paint App */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenPaint) onOpenPaint();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#2f71cd] hover:text-white flex items-center gap-2.5 text-left cursor-pointer group transition-colors"
              >
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 group-hover:text-white truncate">
                    Paint
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">
                    Studio Gambar Diagram
                  </div>
                </div>
              </button>

              {/* Clock App */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenClock) onOpenClock();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#2f71cd] hover:text-white flex items-center gap-2.5 text-left cursor-pointer group transition-colors"
              >
                <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 group-hover:text-white truncate">
                    Jam, Stopwatch & Timer
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-blue-100 truncate">
                    Pewaktu Belajar
                  </div>
                </div>
              </button>
            </div>

            {/* Bottom Separator & All Programs */}
            <div className="pt-2 border-t border-slate-200 relative">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowAllPrograms(!showAllPrograms);
                }}
                className="w-full py-2 px-3 rounded hover:bg-[#2f71cd] hover:text-white flex items-center justify-between font-extrabold text-slate-900 text-xs cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-black">
                    ▶
                  </div>
                  <span>All Programs</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </button>

              {/* Flyout Submenu for All Programs */}
              {showAllPrograms && (
                <div className="absolute bottom-10 left-full ml-1 w-52 bg-white border-2 border-[#0055ea] rounded shadow-xl p-1 space-y-0.5 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectNav('quiz');
                      onClose();
                    }}
                    className="w-full p-1.5 hover:bg-[#2f71cd] hover:text-white text-left font-bold rounded flex items-center gap-2 text-[11px]"
                  >
                    <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Semua Kuis Minigame</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      if (onOpenLibrary) onOpenLibrary();
                      onClose();
                    }}
                    className="w-full p-1.5 hover:bg-[#2f71cd] hover:text-white text-left font-bold rounded flex items-center gap-2 text-[11px]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Modul Belajar SD & SMP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      if (onOpenLeaderboard) onOpenLeaderboard();
                      onClose();
                    }}
                    className="w-full p-1.5 hover:bg-[#2f71cd] hover:text-white text-left font-bold rounded flex items-center gap-2 text-[11px]"
                  >
                    <Users className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Papan Peringkat Kelas</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (PALE BLUE #d3e5fa) - System Folders */}
          <div className="w-[48%] bg-[#d3e5fa] p-2 flex flex-col justify-between text-[#0c327d] font-bold text-[11px]">
            <div className="space-y-0.5">
              {/* STEM Badges & Achievements */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenAchievements) onOpenAchievements();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <Trophy className="w-4 h-4 text-amber-500 fill-amber-300" />
                <span>STEM Badges & Achievements</span>
              </button>

              {/* Class Rankings / Leaderboard */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenLeaderboard) onOpenLeaderboard();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <Users className="w-4 h-4 text-yellow-600" />
                <span>Leaderboard</span>
              </button>

              {/* Learning Library */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenLibrary) onOpenLibrary();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>{lang === 'id' ? 'Materi & Modul' : 'Curriculum Modules'}</span>
              </button>

              <div className="my-1.5 border-b border-[#a7c5ea]" />

              {/* Control Panel (Settings with Profile) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenSettings) onOpenSettings();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <Settings className="w-4 h-4 text-blue-600" />
                <span>Control Panel</span>
              </button>

              <div className="my-1.5 border-b border-[#a7c5ea]" />

              {/* Help & Support (Opens Development Team and About) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenCredits) onOpenCredits();
                  else if (onOpenSettings) onOpenSettings();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Help and Support</span>
              </button>

              {/* Search */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectNav('quiz');
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <Search className="w-4 h-4 text-blue-700" />
                <span>Search</span>
              </button>

              {/* Calculator (Replaced Run) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onOpenCalculator) onOpenCalculator();
                  onClose();
                }}
                className="w-full p-1.5 rounded hover:bg-[#316ac5] hover:text-white flex items-center gap-2 text-left cursor-pointer transition-colors"
              >
                <CalcIcon className="w-4 h-4 text-blue-700" />
                <span>Calculator</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM TASKBAR STRIP WITH LOG OFF & TURN OFF COMPUTER */}
        <div className="h-12 bg-gradient-to-r from-[#1952be] via-[#2167e8] to-[#1952be] border-t-2 border-[#0055ea] px-3 flex items-center justify-end gap-3 text-white shrink-0">
          {/* Turn Off Computer Button - Opens PowerDialogModal */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (onOpenPowerDialog) {
                onOpenPowerDialog();
              }
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-blue-600/60 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-700 border border-white flex items-center justify-center shadow">
              <Power className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-extrabold text-xs drop-shadow">
              Turn Off Computer
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
