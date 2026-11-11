import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Wifi,
  BatteryMedium,
  Music,
  Calendar,
  Gift,
  Coins,
  Gem,
  Bell,
  CheckCircle2,
  X,
  Sliders,
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { Language } from '../../utils/i18n';

interface Props {
  onOpenStartMenu: () => void;
  isStartMenuOpen: boolean;
  activeWindowName?: string;
  onRestoreWindow?: () => void;
  lang?: Language;
  onClaimDailyBonus?: (coins: number, gems: number) => void;
  masterVolume: number;
  onSetMasterVolume: (v: number) => void;
  customTimeOffsetMs?: number;
  onOpenMusicApp?: () => void;
}

export const RetroTaskbar: React.FC<Props> = ({
  onOpenStartMenu,
  isStartMenuOpen,
  activeWindowName,
  onRestoreWindow,
  lang = 'en',
  onClaimDailyBonus,
  masterVolume,
  onSetMasterVolume,
  customTimeOffsetMs = 0,
  onOpenMusicApp,
}) => {
  const [timeStr, setTimeStr] = useState<string>('07:24 AM');
  const [dateStr, setDateStr] = useState<string>('Tue, Nov 10, 2026');
  const [bgmActive, setBgmActive] = useState<boolean>(sound.isMusicPlaying());

  // Popups
  const [showVolumePopup, setShowVolumePopup] = useState<boolean>(false);
  const [showClockPopover, setShowClockPopover] = useState<boolean>(false);

  // Daily bonus state
  const todayStr = new Date().toISOString().slice(0, 10);
  const [hasClaimedToday, setHasClaimedToday] = useState<boolean>(() => {
    try {
      return localStorage.getItem('stem_nexus_last_claim_date') === todayStr;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date(Date.now() + customTimeOffsetMs);
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [customTimeOffsetMs]);

  useEffect(() => {
    const handleMusicUpdate = (playing: boolean) => {
      setBgmActive(playing);
    };
    sound.addMusicListener(handleMusicUpdate);
    return () => sound.removeMusicListener(handleMusicUpdate);
  }, []);

  const handleToggleTaskbarMusic = () => {
    sound.playClick();
    sound.toggleTaskbarMusic((playing) => setBgmActive(playing));
  };

  const handleClaimBonus = () => {
    if (hasClaimedToday) return;
    try {
      localStorage.setItem('stem_nexus_last_claim_date', todayStr);
      setHasClaimedToday(true);
      sound.playLevelUp();
      sound.playCoin();
      if (onClaimDailyBonus) {
        onClaimDailyBonus(150, 20);
      }
    } catch {
      // fallback
    }
  };

  return (
    <>
      {/* 1. Volume Slider Popup */}
      {showVolumePopup && (
        <div className="fixed bottom-12 right-20 z-50 w-64 bg-slate-900 border-2 border-cyan-400 rounded-2xl shadow-2xl p-4 text-white animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                {lang === 'id' ? 'Volume Suara' : 'Master Volume'}
              </span>
            </div>
            <button
              onClick={() => setShowVolumePopup(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const next = masterVolume > 0 ? 0 : 0.8;
                onSetMasterVolume(next);
                sound.setMasterVolume(next);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300"
            >
              {masterVolume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-400" />}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={masterVolume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onSetMasterVolume(val);
                  sound.setMasterVolume(val);
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0%</span>
                <span className="text-cyan-300 font-bold">{Math.round(masterVolume * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Clock & Calendar & Daily Bonus Popover */}
      {showClockPopover && (
        <div className="fixed bottom-12 right-2 z-50 w-80 bg-slate-950 border-2 border-cyan-400 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] p-4 text-white animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-white">
                {lang === 'id' ? 'WAKTU & MISI HARIAN' : 'TIME & DAILY MISSIONS'}
              </span>
            </div>
            <button
              onClick={() => setShowClockPopover(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Time & Date Display */}
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-center mb-3">
            <div className="text-2xl font-black font-mono text-cyan-300">{timeStr}</div>
            <div className="text-xs text-slate-400 mt-0.5">{dateStr}</div>
          </div>

          {/* Daily Cadet Bonus (Claimable ONCE a day!) */}
          <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/40 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <Gift className="w-4 h-4" />
                <span>{lang === 'id' ? 'Bonus Kadet Harian' : 'Daily Cadet Bonus'}</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300">
                {hasClaimedToday ? (lang === 'id' ? 'KLAIM BESOK' : 'CLAIMED') : '+150 🪙 +20 💎'}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 mb-2">
              {hasClaimedToday
                ? lang === 'id'
                  ? 'Bonus hari ini sudah diambil! Kembali lagi besok untuk hadiah harian.'
                  : 'Bonus claimed for today! Return tomorrow for the next reward.'
                : lang === 'id'
                ? 'Klaim hadiah login harian kadet: 150 koin emas & 20 permata ungu!'
                : 'Claim your daily login reward: 150 coins & 20 gems!'}
            </p>

            <button
              disabled={hasClaimedToday}
              onClick={handleClaimBonus}
              className={`w-full py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                hasClaimedToday
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.5)] active:scale-95 cursor-pointer'
              }`}
            >
              {hasClaimedToday ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'id' ? 'Sudah Diambil Hari Ini' : 'Claimed for Today'}</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>{lang === 'id' ? 'Klaim Bonus Sekarang 🎁' : 'Claim Bonus Now 🎁'}</span>
                </>
              )}
            </button>
          </div>

          {/* System Notification snippet */}
          <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2">
            <Bell className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-200">
                {lang === 'id' ? 'Tantangan Mingguan STEM' : 'STEM Challenge Week'}
              </div>
              <div>{lang === 'id' ? 'Dapatkan lencana spesial dengan menyelesaikan kuis hari ini.' : 'Earn special badges by completing today’s quizzes.'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Taskbar */}
      <div className="fixed bottom-0 inset-x-0 h-10 z-50 bg-gradient-to-b from-[#245edb] via-[#1546b3] to-[#0d348a] border-t-2 border-[#5293ee] shadow-[0_-2px_8px_rgba(0,0,0,0.5)] flex items-center justify-between px-2 select-none">
        {/* Left: Start Button & Music */}
        <div className="flex items-center gap-2 h-full py-0.5">
          {/* Windows XP Glossy Start Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenStartMenu();
            }}
            className={`h-full px-3.5 rounded-r-xl rounded-l-md font-game font-black text-sm flex items-center gap-1.5 shadow-md transition-all border border-[#a1dc5a] cursor-pointer hover:scale-102 ${
              isStartMenuOpen
                ? 'bg-gradient-to-b from-[#2e7d32] to-[#1b5e20] text-yellow-200 shadow-inner'
                : 'bg-gradient-to-b from-[#5cb85c] via-[#449d44] to-[#2e7d32] hover:brightness-110 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
            }`}
          >
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0 rotate-12">
              <span className="w-1.5 h-1.5 bg-[#f44336] rounded-xs shadow-xs" />
              <span className="w-1.5 h-1.5 bg-[#4caf50] rounded-xs shadow-xs" />
              <span className="w-1.5 h-1.5 bg-[#2196f3] rounded-xs shadow-xs" />
              <span className="w-1.5 h-1.5 bg-[#ffeb3b] rounded-xs shadow-xs" />
            </div>
            <span className="italic tracking-wide text-xs sm:text-sm">Start</span>
          </button>

          {/* Separator */}
          <div className="w-px h-6 bg-blue-300/40" />

          {/* Taskbar Music Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTaskbarMusic}
            className={`w-7 h-7 rounded flex items-center justify-center transition-all cursor-pointer ${
              bgmActive
                ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow-md animate-pulse border border-white'
                : 'hover:bg-white/20 text-pink-300'
            }`}
            title={bgmActive ? 'BGM Playing (Click to pause)' : 'Play Ambient STEM Music'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Running Window Tab in Taskbar */}
          {activeWindowName && (
            <div className="hidden sm:flex items-center ml-2">
              <div
                onClick={onRestoreWindow}
                className="h-7 px-3 rounded bg-gradient-to-b from-[#1b50b5] to-[#123a85] border border-cyan-400/60 shadow-inner flex items-center gap-1.5 text-xs text-white font-game font-bold cursor-pointer hover:brightness-110"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="max-w-[140px] truncate">{activeWindowName}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: System Tray (Volume Popup, Wi-Fi, Clock Popover) */}
        <div className="flex items-center gap-2 h-full py-0.5 px-2 bg-gradient-to-r from-[#0d348a] to-[#09225e] rounded-l-lg border-l border-blue-400/40">
          {/* Interactive Volume Button (Opens Slider Popup) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowVolumePopup((prev) => !prev);
              setShowClockPopover(false);
            }}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              showVolumePopup ? 'bg-cyan-500/30 text-white' : 'hover:bg-white/10 text-cyan-200'
            }`}
            title="Volume Controls"
          >
            {masterVolume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
          </button>

          {/* Wi-Fi Icon */}
          <div className="text-cyan-200" title="Connected to STEM Nexus Grid">
            <Wifi className="w-3.5 h-3.5" />
          </div>

          {/* Battery Icon */}
          <div className="text-emerald-400 hidden sm:block" title="Battery 100% (Online)">
            <BatteryMedium className="w-4 h-4" />
          </div>

          {/* Live Digital Clock (Opens Calendar / Bonus Popover) */}
          <div
            onClick={() => {
              sound.playClick();
              setShowClockPopover((prev) => !prev);
              setShowVolumePopup(false);
            }}
            className="text-right leading-tight font-mono text-[10px] sm:text-[11px] text-white pl-1.5 border-l border-blue-400/30 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors"
            title="Click to view calendar, missions & daily login bonus"
          >
            <div className="font-bold flex items-center gap-1">
              <span>{timeStr}</span>
              {!hasClaimedToday && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Daily Bonus Available!" />
              )}
            </div>
            <div className="text-[9px] text-cyan-200">{dateStr}</div>
          </div>
        </div>
      </div>
    </>
  );
};
