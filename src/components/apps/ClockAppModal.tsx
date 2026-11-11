import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Clock, Timer as TimerIcon, Play, Pause, RotateCcw, Bell, Calendar } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customTimeOffsetMs: number;
  onUpdateOffset: (offset: number) => void;
}

type TabType = 'clock' | 'stopwatch' | 'timer' | 'alarm';

export const ClockAppModal: React.FC<Props> = ({
  isOpen,
  onClose,
  customTimeOffsetMs,
  onUpdateOffset,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('clock');

  // Real-time clock with offset
  const [currentDate, setCurrentDate] = useState<Date>(new Date(Date.now() + customTimeOffsetMs));

  // Time adjust inputs
  const [manualTime, setManualTime] = useState<string>('12:00:00');
  const [manualDate, setManualDate] = useState<string>('2026-11-10');

  // Stopwatch state
  const [swTime, setSwTime] = useState<number>(0);
  const [swRunning, setSwRunning] = useState<boolean>(false);
  const [swLaps, setSwLaps] = useState<number[]>([]);
  const swIntervalRef = useRef<number | null>(null);

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState<number>(5);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRemaining, setTimerRemaining] = useState<number>(300);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<number | null>(null);

  // Alarm state
  const [alarmTime, setAlarmTime] = useState<string>('07:30');
  const [alarmActive, setAlarmActive] = useState<boolean>(false);
  const [alarmRinging, setAlarmRinging] = useState<boolean>(false);

  // Update clock every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(Date.now() + customTimeOffsetMs);
      setCurrentDate(now);

      // Check alarm
      if (alarmActive) {
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        if (`${hh}:${mm}` === alarmTime && now.getSeconds() === 0) {
          setAlarmRinging(true);
          sound.playSuccess();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [customTimeOffsetMs, alarmActive, alarmTime]);

  // Stopwatch interval
  useEffect(() => {
    if (swRunning) {
      const start = Date.now() - swTime;
      swIntervalRef.current = window.setInterval(() => {
        setSwTime(Date.now() - start);
      }, 30);
    } else {
      if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    }
    return () => {
      if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    };
  }, [swRunning]);

  // Timer interval
  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            sound.playSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, timerRemaining]);

  if (!isOpen) return null;

  const handleApplyCustomTime = () => {
    sound.playClick();
    try {
      const [hh, mm, ss] = manualTime.split(':').map((v) => parseInt(v, 10) || 0);
      const [y, m, d] = manualDate.split('-').map((v) => parseInt(v, 10) || 0);
      const target = new Date(y, m - 1, d, hh, mm, ss || 0);
      const newOffset = target.getTime() - Date.now();
      onUpdateOffset(newOffset);
    } catch {
      // ignore
    }
  };

  const handleResetToRealTime = () => {
    sound.playClick();
    onUpdateOffset(0);
  };

  const formatStopwatch = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(millis).padStart(2, '0')}`;
  };

  const formatTimerDisplay = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Analog clock hands calculation
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-[#ece9d8] border-2 border-[#0055ea] rounded-t-lg shadow-2xl overflow-hidden font-sans text-xs flex flex-col">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#2484f2] to-[#0058e6] px-3 py-1.5 flex items-center justify-between text-white shadow-inner shrink-0">
          <div className="flex items-center gap-1.5 font-bold tracking-wide">
            <Clock className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '60s' }} />
            <span>Tanggal, Jam & Pewaktu STEM (Windows XP)</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-4 h-4 rounded bg-[#0055ea] hover:bg-blue-400 border border-white/60 flex items-center justify-center text-[10px]"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              className="w-4 h-4 rounded bg-[#0055ea] hover:bg-blue-400 border border-white/60 flex items-center justify-center text-[10px]"
            >
              <Square className="w-2 h-2" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-4 h-4 rounded bg-[#e81123] hover:bg-red-700 border border-white/60 flex items-center justify-center text-[10px]"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-[#aca899] bg-[#ece9d8] px-2 pt-2 gap-1 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('clock')}
            className={`px-3 py-1.5 rounded-t border-t border-x cursor-pointer ${
              activeTab === 'clock'
                ? 'bg-white border-[#7f9db9] text-blue-900 border-b-white -mb-px'
                : 'bg-[#dcd8ce] border-[#aca899] text-slate-700 hover:bg-[#ede9df]'
            }`}
          >
            Jam & Tanggal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stopwatch')}
            className={`px-3 py-1.5 rounded-t border-t border-x cursor-pointer ${
              activeTab === 'stopwatch'
                ? 'bg-white border-[#7f9db9] text-blue-900 border-b-white -mb-px'
                : 'bg-[#dcd8ce] border-[#aca899] text-slate-700 hover:bg-[#ede9df]'
            }`}
          >
            Stopwatch
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timer')}
            className={`px-3 py-1.5 rounded-t border-t border-x cursor-pointer ${
              activeTab === 'timer'
                ? 'bg-white border-[#7f9db9] text-blue-900 border-b-white -mb-px'
                : 'bg-[#dcd8ce] border-[#aca899] text-slate-700 hover:bg-[#ede9df]'
            }`}
          >
            Timer Hitung Mundur
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('alarm')}
            className={`px-3 py-1.5 rounded-t border-t border-x cursor-pointer ${
              activeTab === 'alarm'
                ? 'bg-white border-[#7f9db9] text-blue-900 border-b-white -mb-px'
                : 'bg-[#dcd8ce] border-[#aca899] text-slate-700 hover:bg-[#ede9df]'
            }`}
          >
            Alarm
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white p-4 min-h-[300px]">
          {/* TAB 1: CLOCK */}
          {activeTab === 'clock' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                {/* Analog Clock Face */}
                <div className="relative w-28 h-28 rounded-full border-4 border-slate-800 bg-white shadow-inner flex items-center justify-center">
                  {/* Hour markers */}
                  <div className="absolute top-1 text-[9px] font-bold text-slate-700">12</div>
                  <div className="absolute right-1.5 text-[9px] font-bold text-slate-700">3</div>
                  <div className="absolute bottom-1 text-[9px] font-bold text-slate-700">6</div>
                  <div className="absolute left-1.5 text-[9px] font-bold text-slate-700">9</div>
                  <div className="w-2 h-2 rounded-full bg-red-600 z-20 shadow" />

                  {/* Hour hand */}
                  <div
                    className="absolute w-1 h-8 bg-slate-800 origin-bottom rounded-t"
                    style={{ transform: `rotate(${hourDeg}deg)`, bottom: '50%' }}
                  />
                  {/* Minute hand */}
                  <div
                    className="absolute w-0.5 h-11 bg-slate-900 origin-bottom rounded-t"
                    style={{ transform: `rotate(${minDeg}deg)`, bottom: '50%' }}
                  />
                  {/* Second hand */}
                  <div
                    className="absolute w-0.5 h-12 bg-red-600 origin-bottom"
                    style={{ transform: `rotate(${secDeg}deg)`, bottom: '50%' }}
                  />
                </div>

                {/* Digital Readout */}
                <div className="text-center">
                  <div className="text-3xl font-mono font-black text-blue-950 tracking-wider">
                    {currentDate.toLocaleTimeString('id-ID', { hour12: false })}
                  </div>
                  <div className="text-xs text-slate-500 font-bold mt-1">
                    {currentDate.toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  {customTimeOffsetMs !== 0 && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold border border-amber-300">
                      Waktu Khusus Aktif
                    </span>
                  )}
                </div>
              </div>

              {/* Adjust Time & Date Form */}
              <div className="border border-slate-200 rounded p-3 bg-slate-50 space-y-2.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ubah Tanggal & Waktu Manual (Real-time Custom):</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-600 block mb-0.5">Tanggal (YYYY-MM-DD):</label>
                    <input
                      type="date"
                      value={manualDate}
                      onChange={(e) => setManualDate(e.target.value)}
                      className="w-full border border-slate-300 px-2 py-1 text-xs rounded bg-white text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-600 block mb-0.5">Waktu (HH:MM:SS):</label>
                    <input
                      type="time"
                      step="1"
                      value={manualTime}
                      onChange={(e) => setManualTime(e.target.value)}
                      className="w-full border border-slate-300 px-2 py-1 text-xs rounded bg-white text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleApplyCustomTime}
                    className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-xs cursor-pointer text-xs"
                  >
                    Terapkan Jam & Tanggal
                  </button>
                  <button
                    type="button"
                    onClick={handleResetToRealTime}
                    className="py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded cursor-pointer text-xs"
                  >
                    Reset ke Real-Time
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STOPWATCH */}
          {activeTab === 'stopwatch' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-2">
              <div className="text-4xl font-mono font-black text-slate-900 tracking-wider bg-slate-100 px-6 py-3 rounded-lg border-2 border-slate-300 shadow-inner">
                {formatStopwatch(swTime)}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setSwRunning(!swRunning); }}
                  className={`px-4 py-2 rounded font-bold text-white shadow flex items-center gap-1.5 ${
                    swRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {swRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{swRunning ? 'Pause' : 'Start'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (swRunning) {
                      setSwLaps([swTime, ...swLaps]);
                    } else {
                      setSwTime(0);
                      setSwLaps([]);
                    }
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded font-bold shadow flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{swRunning ? 'Lap' : 'Reset'}</span>
                </button>
              </div>

              {swLaps.length > 0 && (
                <div className="w-full max-h-36 overflow-y-auto border border-slate-200 rounded p-2 text-[11px] space-y-1">
                  <div className="font-bold text-slate-600">Catatan Waktu Putaran (Laps):</div>
                  {swLaps.map((lap, idx) => (
                    <div key={idx} className="flex justify-between font-mono py-0.5 border-b border-slate-100">
                      <span>Lap {swLaps.length - idx}</span>
                      <span className="font-bold text-blue-700">{formatStopwatch(lap)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COUNTDOWN TIMER */}
          {activeTab === 'timer' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-2">
              <div className="text-4xl font-mono font-black text-slate-900 tracking-wider bg-slate-100 px-6 py-3 rounded-lg border-2 border-slate-300 shadow-inner">
                {formatTimerDisplay(timerRemaining)}
              </div>

              {!timerRunning && (
                <div className="flex items-center gap-2 text-xs">
                  <label className="text-slate-700 font-bold">Menit:</label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={timerMinutes}
                    onChange={(e) => {
                      const m = parseInt(e.target.value, 10) || 0;
                      setTimerMinutes(m);
                      setTimerRemaining(m * 60 + timerSeconds);
                    }}
                    className="w-16 border border-slate-300 px-2 py-1 rounded text-center"
                  />
                  <label className="text-slate-700 font-bold">Detik:</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={timerSeconds}
                    onChange={(e) => {
                      const s = parseInt(e.target.value, 10) || 0;
                      setTimerSeconds(s);
                      setTimerRemaining(timerMinutes * 60 + s);
                    }}
                    className="w-16 border border-slate-300 px-2 py-1 rounded text-center"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { sound.playClick(); setTimerRunning(!timerRunning); }}
                  className={`px-4 py-2 rounded font-bold text-white shadow flex items-center gap-1.5 ${
                    timerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{timerRunning ? 'Pause' : 'Mulai Timer'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setTimerRunning(false);
                    setTimerRemaining(timerMinutes * 60 + timerSeconds);
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded font-bold shadow flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ALARM */}
          {activeTab === 'alarm' && (
            <div className="space-y-4 py-2">
              <div className="bg-slate-50 border border-slate-200 rounded p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-slate-800 font-bold mb-2">
                  <Bell className={`w-5 h-5 ${alarmActive ? 'text-amber-500 animate-bounce' : 'text-slate-400'}`} />
                  <span>Pengingat Belajar STEM</span>
                </div>

                <div className="flex items-center justify-center gap-3 my-3">
                  <input
                    type="time"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    className="text-2xl font-mono font-bold border-2 border-blue-400 rounded px-3 py-1 bg-white text-slate-900"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setAlarmActive(!alarmActive);
                    setAlarmRinging(false);
                  }}
                  className={`px-5 py-2 rounded-lg font-bold text-white shadow-md transition-all ${
                    alarmActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-600 hover:bg-slate-700'
                  }`}
                >
                  {alarmActive ? 'Alarm Aktif (ON)' : 'Aktifkan Alarm (OFF)'}
                </button>

                {alarmRinging && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-pulse font-bold">
                    ⏰ WAKTUNYA BELAJAR STEM! ALARM BERBUNYI!
                    <button
                      type="button"
                      onClick={() => setAlarmRinging(false)}
                      className="block mx-auto mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs"
                    >
                      Matikan Bunyi
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#ece9d8] border-t border-[#aca899] p-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 bg-[#f0ede4] hover:bg-white active:bg-[#dcd8ce] border border-[#7f9db9] text-slate-800 font-bold rounded-xs shadow-xs text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
