import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Minus,
  Square,
  Play,
  Pause,
  Square as StopIcon,
  Volume2,
  VolumeX,
  Music,
  SkipBack,
  SkipForward,
  ListMusic,
  Disc3,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  bitrate: string;
}

const PLAYLIST: Track[] = [
  {
    id: 'live-and-learn',
    title: 'Live & Learn',
    artist: 'Crush 40',
    src: '/assets/aistudio/Live___Learn_f7b8feda.mp3',
    bitrate: '320 Kbps / 44.1 kHz',
  },
  {
    id: 'stand-by-me',
    title: 'Stand By Me',
    artist: 'Ben E. King',
    src: '/assets/aistudio/Stand_By_Me_26e96c12.mp3',
    bitrate: '256 Kbps / 44.1 kHz',
  },
  {
    id: 'vrijeman',
    title: 'Vrijeman',
    artist: 'STEM Nexus Audio',
    src: '/assets/aistudio/Vrijeman_e998d029.mp3',
    bitrate: '256 Kbps / 44.1 kHz',
  },
  {
    id: 'synth-odyssey',
    title: 'STEM Nexus Synth Odyssey',
    artist: 'Nexus Sound Team',
    src: '/assets/aistudio/Music_1164b911.mp3',
    bitrate: '192 Kbps / 44.1 kHz',
  },
];

export const MusicAppModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex] || PLAYLIST[0];

  // Initialize and load track
  const loadTrack = (trackIndex: number, shouldPlay: boolean = false) => {
    const track = PLAYLIST[trackIndex];
    if (!track) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.src);
    audio.volume = isMuted ? 0 : volume;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 180);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      handleNextTrack();
    };

    audioRef.current = audio;
    setCurrentTime(0);
    setCurrentTrackIndex(trackIndex);

    if (shouldPlay) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play prevented:', e);
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    loadTrack(0, false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Visualizer Animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bars = Array.from({ length: 28 }, () => Math.random() * 0.3);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / bars.length;

      bars = bars.map((b) => {
        if (isPlaying) {
          return Math.min(1, Math.max(0.08, b + (Math.random() - 0.48) * 0.32));
        } else {
          return Math.max(0.04, b * 0.94);
        }
      });

      bars.forEach((val, i) => {
        const barHeight = val * (height - 6);
        const x = i * barWidth;
        const y = height - barHeight;

        // Windows XP Media Player Neon Green / Cyan Visualizer
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, '#00ffcc');
        gradient.addColorStop(0.4, '#0088ff');
        gradient.addColorStop(0.8, '#0a235c');
        gradient.addColorStop(1, '#020b1e');

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

        // Peak dot
        ctx.fillStyle = isPlaying ? '#ffff00' : '#0088ff';
        ctx.fillRect(x + 1, Math.max(0, y - 2), barWidth - 2, 1.5);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  if (!isOpen) return null;

  const togglePlay = () => {
    sound.playClick();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleStop = () => {
    sound.playClick();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleNextTrack = () => {
    sound.playClick();
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    loadTrack(nextIdx, isPlaying);
  };

  const handlePrevTrack = () => {
    sound.playClick();
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(prevIdx, isPlaying);
  };

  const handleSelectTrack = (idx: number) => {
    sound.playClick();
    loadTrack(idx, true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1b3d75] via-[#10274f] to-[#0d1d3d] border-2 border-[#38bdf8] rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#1e40af] to-[#0058e6] px-3 py-1.5 flex items-center justify-between text-white border-b border-cyan-400/30">
          <div className="flex items-center gap-1.5 font-bold text-xs tracking-wide">
            <Music className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>Windows Media Player — STEM Audio</span>
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
              className="w-4 h-4 rounded bg-[#e81123] hover:bg-red-700 border border-white/60 flex items-center justify-center text-[10px] cursor-pointer"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Visualizer Display Box */}
        <div className="p-3 space-y-2.5">
          <div className="relative w-full h-36 bg-black rounded-lg border-2 border-slate-700 overflow-hidden shadow-inner flex flex-col justify-between p-2.5">
            <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono z-10">
              <div className="flex items-center gap-1.5 truncate max-w-[240px]">
                <Disc3 className={`w-3.5 h-3.5 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`} />
                <span className="font-bold text-white truncate">{currentTrack.title}</span>
                <span className="text-slate-400">· {currentTrack.artist}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${isPlaying ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'}`}>
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>

            {/* Canvas Visualizer */}
            <canvas ref={canvasRef} width={380} height={70} className="w-full h-18 my-auto" />

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono z-10">
              <span>{formatTime(currentTime)}</span>
              <span className="text-cyan-500">{currentTrack.bitrate}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Seek Bar */}
          <div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Media Player Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevTrack}
                title="Previous Track"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 cursor-pointer active:scale-95 transition-all"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 hover:scale-105 active:scale-95 border-2 border-white flex items-center justify-center text-white shadow-lg cursor-pointer transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleStop}
                title="Stop"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 cursor-pointer active:scale-95 transition-all"
              >
                <StopIcon className="w-3.5 h-3.5 fill-slate-300" />
              </button>

              <button
                type="button"
                onClick={handleNextTrack}
                title="Next Track"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-200 cursor-pointer active:scale-95 transition-all"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-300 hover:text-white cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-14 sm:w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Playlist Drawer */}
          <div className="pt-2 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <ListMusic className="w-3.5 h-3.5" />
                <span>Audio Playlist ({PLAYLIST.length} Tracks)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="text-[10px] text-slate-400 hover:text-white cursor-pointer"
              >
                {showPlaylist ? 'Hide' : 'Show'}
              </button>
            </div>

            {showPlaylist && (
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {PLAYLIST.map((t, idx) => {
                  const isActive = idx === currentTrackIndex;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTrack(idx)}
                      className={`w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold border border-cyan-400 shadow-xs'
                          : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-cyan-300 w-4">
                          {isActive && isPlaying ? '▶' : `${idx + 1}.`}
                        </span>
                        <div className="truncate">
                          <div className="truncate leading-tight">{t.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{t.artist}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-2">MP3</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
