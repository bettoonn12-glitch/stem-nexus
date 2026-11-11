import React, { useState } from 'react';
import { sound } from '../../utils/audio';

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
}

export const DesktopBackground: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([
    { id: 1, left: 12, size: 48, duration: 13, delay: 0 },
    { id: 2, left: 28, size: 36, duration: 16, delay: 3 },
    { id: 3, left: 45, size: 64, duration: 14, delay: 6 },
    { id: 4, left: 72, size: 40, duration: 18, delay: 1 },
    { id: 5, left: 88, size: 76, duration: 15, delay: 4 },
    { id: 6, left: 94, size: 32, duration: 12, delay: 8 },
  ]);

  // Corgi Mascot State
  const [corgiHovered, setCorgiHovered] = useState<boolean>(false);
  const [corgiJumping, setCorgiJumping] = useState<boolean>(false);
  const [corgiParticles, setCorgiParticles] = useState<Particle[]>([]);
  const [corgiSpeech, setCorgiSpeech] = useState<string | null>(null);

  // Penguin Mascot State
  const [penguinHovered, setPenguinHovered] = useState<boolean>(false);
  const [penguinSpinning, setPenguinSpinning] = useState<boolean>(false);
  const [penguinParticles, setPenguinParticles] = useState<Particle[]>([]);
  const [penguinSpeech, setPenguinSpeech] = useState<string | null>(null);

  const popBubble = (id: number) => {
    sound.playBubblePop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: Math.floor(Math.random() * 90) + 5,
          size: Math.floor(Math.random() * 40) + 30,
          duration: Math.floor(Math.random() * 6) + 12,
          delay: 0,
        },
      ]);
    }, 1500);
  };

  // Corgi Click Handler
  const handleCorgiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playDogBark();
    setCorgiJumping(true);

    const corgiPhrases = [
      'Woof! Let’s solve physics!',
      'Yip! Math is my favorite treat!',
      'Arf! +25 XP for good cadets!',
      'Bork! Ready for the shooter mini-game!',
    ];
    setCorgiSpeech(corgiPhrases[Math.floor(Math.random() * corgiPhrases.length)]);

    // Burst golden bones & hearts
    const newParticles: Particle[] = [
      { id: Date.now() + 1, x: -20, y: -30, icon: '🦴' },
      { id: Date.now() + 2, x: 20, y: -45, icon: '❤️' },
      { id: Date.now() + 3, x: 0, y: -50, icon: '⭐' },
      { id: Date.now() + 4, x: -35, y: -20, icon: '✨' },
      { id: Date.now() + 5, x: 35, y: -25, icon: '🐾' },
    ];
    setCorgiParticles(newParticles);

    setTimeout(() => setCorgiJumping(false), 900);
    setTimeout(() => setCorgiParticles([]), 1400);
    setTimeout(() => setCorgiSpeech(null), 3200);
  };

  // Penguin Click Handler
  const handlePenguinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPenguinChirp();
    setPenguinSpinning(true);

    const penguinPhrases = [
      'Chirp! Goggles on! Speed = Distance / Time!',
      'Squeak! Basketball & Soccer arcade unlocked!',
      'Pip-pip! +25 XP and +50 gold coins!',
      'Waddle on! You can beat the RPG boss!',
    ];
    setPenguinSpeech(penguinPhrases[Math.floor(Math.random() * penguinPhrases.length)]);

    // Burst rainbow stars & music notes
    const newParticles: Particle[] = [
      { id: Date.now() + 1, x: -25, y: -35, icon: '🎵' },
      { id: Date.now() + 2, x: 25, y: -45, icon: '⚡' },
      { id: Date.now() + 3, x: 0, y: -55, icon: '🏆' },
      { id: Date.now() + 4, x: -35, y: -20, icon: '💎' },
      { id: Date.now() + 5, x: 30, y: -25, icon: '🫧' },
    ];
    setPenguinParticles(newParticles);

    setTimeout(() => setPenguinSpinning(false), 800);
    setTimeout(() => setPenguinParticles([]), 1400);
    setTimeout(() => setPenguinSpeech(null), 3200);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Anime Sunny Sky Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d7df7] via-[#5ea5ff] to-[#a3d4ff]" />

      {/* Sun Ray Effect */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(254,240,138,0.5) 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Floating Animated Clouds */}
      <div className="absolute top-8 left-0 right-0 h-44 overflow-hidden opacity-85">
        <div className="absolute top-2 left-[5%] w-72 h-24 bg-white/70 rounded-full blur-sm animate-cloud-drift-slow" />
        <div className="absolute top-8 left-[35%] w-96 h-28 bg-white/60 rounded-full blur-md animate-cloud-drift-fast" />
        <div className="absolute top-4 right-[10%] w-80 h-24 bg-white/70 rounded-full blur-sm animate-cloud-drift-slow" />
      </div>

      {/* Distant Anime City Skyline & Lake Water with Windmills */}
      <div className="absolute bottom-10 left-0 right-0 h-48 pointer-events-none opacity-40 flex items-end justify-between px-10">
        <div className="w-full flex items-end justify-between">
          <div className="hidden lg:flex items-end gap-1 opacity-60">
            <div className="w-8 h-28 bg-blue-300/50 rounded-t" />
            <div className="w-12 h-36 bg-blue-400/50 rounded-t" />
            <div className="w-10 h-44 bg-blue-300/60 rounded-t" />
            <div className="w-14 h-32 bg-blue-400/40 rounded-t" />
          </div>

          <div className="hidden md:flex items-end gap-6 pr-24 opacity-70">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border border-white/60 animate-spin" style={{ animationDuration: `${3 + i}s` }} />
                <div className="w-0.5 h-16 bg-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sparkling Water Lake Bar */}
      <div className="absolute bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-[#2071d1]/80 via-[#3a91f5]/60 to-transparent" />

      {/* Flowery Meadow Foreground */}
      <div className="absolute bottom-10 left-0 right-0 h-16 bg-gradient-to-t from-[#3bb54a] via-[#48c958] to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-between px-8 text-xl opacity-90 pointer-events-none">
        <span>🌱 🌼 🌸 🌿 🌼</span>
        <span className="hidden md:inline">🌸 🍀 🌼 🌿 🌸</span>
        <span>🌼 🌿 🌸 🌼 🌱</span>
      </div>

      {/* =========================================================================
          1. INTERACTIVE CORGI MASCOT WITH HOVER & UNIQUE JUMP ANIMATION + BARK
         ========================================================================= */}
      <div
        onMouseEnter={() => setCorgiHovered(true)}
        onMouseLeave={() => setCorgiHovered(false)}
        onClick={handleCorgiClick}
        className="absolute bottom-12 left-4 md:left-10 z-20 pointer-events-auto cursor-pointer group flex flex-col items-center select-none"
        title="Corgi Cadet (Hover to wake, click to play!)"
      >
        {/* Floating "Zzz" Letters (Only when NOT hovered or jumping) */}
        {!corgiHovered && !corgiJumping && (
          <div className="relative w-16 h-8 pointer-events-none">
            <span className="absolute left-6 top-1 text-xs font-bold font-game text-cyan-200 animate-zzz-1">Z</span>
            <span className="absolute left-10 top-0 text-sm font-extrabold font-game text-cyan-100 animate-zzz-2">z</span>
            <span className="absolute left-14 -top-2 text-base font-black font-game text-white animate-zzz-3">z</span>
          </div>
        )}

        {/* Hover Cue Bubble */}
        {corgiHovered && !corgiSpeech && (
          <div className="absolute -top-10 left-1 bg-amber-400 text-amber-950 text-[11px] font-black font-game px-2.5 py-1 rounded-xl shadow-xl border-2 border-white whitespace-nowrap animate-bounce">
            I'm awake! Click me! 🐾
            <div className="absolute -bottom-1 left-6 w-2.5 h-2.5 bg-amber-400 border-r-2 border-b-2 border-white rotate-45" />
          </div>
        )}

        {/* Click Speech Message */}
        {corgiSpeech && (
          <div className="absolute -top-14 left-0 bg-white/95 text-slate-900 text-xs font-extrabold font-game px-3 py-1.5 rounded-2xl shadow-2xl border-2 border-amber-400 whitespace-nowrap animate-in zoom-in-75 duration-200">
            {corgiSpeech}
            <div className="absolute -bottom-1.5 left-8 w-3 h-3 bg-white border-r-2 border-b-2 border-amber-400 rotate-45" />
          </div>
        )}

        {/* Particle Burst upon Click */}
        {corgiParticles.map((p) => (
          <span
            key={p.id}
            className="absolute text-base font-bold pointer-events-none animate-ping duration-700"
            style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
          >
            {p.icon}
          </span>
        ))}

        {/* Corgi Illustration Box */}
        <div
          className={`relative p-2 rounded-2xl bg-white/25 backdrop-blur-xs border-2 shadow-2xl transition-all duration-300 ${
            corgiJumping
              ? 'scale-125 -translate-y-6 rotate-[-8deg] border-yellow-300 bg-amber-400/30'
              : corgiHovered
              ? 'scale-110 -translate-y-2 border-yellow-300 bg-white/40 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
              : 'animate-dog-breathe border-white/50'
          }`}
        >
          {/* Custom SVG Corgi with Awake / Sleeping Eye States & Wagging Tail */}
          <svg className="w-16 h-12" viewBox="0 0 64 48" fill="none">
            {/* Wagging Tail */}
            <circle
              cx="11"
              cy="25"
              r="4.5"
              fill="#E69138"
              className={corgiHovered || corgiJumping ? 'animate-bounce origin-center' : ''}
            />
            <circle cx="10" cy="25" r="2.5" fill="#FFFFFF" />

            {/* Body */}
            <ellipse cx="32" cy="28" rx="20" ry="12" fill="#E69138" />
            <ellipse cx="32" cy="31" rx="14" ry="7" fill="#F9CB9C" />
            <ellipse cx="28" cy="30" rx="9" ry="6" fill="#FFFFFF" />

            {/* Head */}
            <ellipse cx="48" cy="22" rx="11" ry="10" fill="#E69138" />
            <ellipse cx="50" cy="24" rx="7" ry="6" fill="#F9CB9C" />
            <path d="M47 18 L51 24 L45 24 Z" fill="#FFFFFF" />

            {/* Ears (Perk up higher on hover!) */}
            <path
              d={corgiHovered || corgiJumping ? 'M42 12 L48 2 L52 14 Z' : 'M44 14 L49 6 L53 15 Z'}
              fill="#CC6600"
              className="transition-all duration-200"
            />
            <path
              d={corgiHovered || corgiJumping ? 'M44 11 L48 5 L50 13 Z' : 'M46 13 L49 9 L51 14 Z'}
              fill="#F4CCCC"
            />

            {/* Eyes: Awake & Big Sparkle when Hovered or Jumping; Closed when resting */}
            {corgiHovered || corgiJumping ? (
              <>
                <circle cx="51" cy="21" r="3" fill="#3D1E00" />
                <circle cx="52" cy="20" r="1.2" fill="#FFFFFF" />
                <circle cx="56" cy="20" r="1.5" fill="#3D1E00" />
                <circle cx="56.5" cy="19.5" r="0.6" fill="#FFFFFF" />
              </>
            ) : (
              <path d="M48 22 Q51 24 54 22" stroke="#4A2600" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            )}

            {/* Nose & Mouth */}
            <ellipse cx="57" cy="23" rx="2" ry="1.5" fill="#3D1E00" />
            {corgiHovered || corgiJumping ? (
              <path d="M54 25 Q56 27 58 25" stroke="#3D1E00" strokeWidth="1.2" fill="#FF8A8A" />
            ) : null}

            {/* Cute Cheek Blush */}
            <circle cx="52" cy="25" r="2.5" fill="#FF8A8A" opacity={corgiHovered ? 0.9 : 0.6} />

            {/* Paws */}
            <ellipse cx="20" cy="38" rx="4" ry="3" fill="#FFFFFF" />
            <ellipse cx="36" cy="38" rx="4" ry="3" fill="#FFFFFF" />
            <ellipse cx="48" cy="33" rx="3.5" ry="3" fill="#FFFFFF" />
          </svg>

          <div className="text-[10px] text-center font-bold text-white drop-shadow font-game">
            {corgiJumping ? '★ BARK! +25XP' : corgiHovered ? 'Pet Me!' : 'Sleepy Corgi'}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. INTERACTIVE PENGUIN MASCOT WITH HOVER PILOT STATE & 360 SPIN CHIRP
         ========================================================================= */}
      <div
        onMouseEnter={() => setPenguinHovered(true)}
        onMouseLeave={() => setPenguinHovered(false)}
        onClick={handlePenguinClick}
        className="absolute bottom-12 right-4 md:right-10 z-20 pointer-events-auto cursor-pointer group flex flex-col items-center select-none"
        title="Captain Pip (Hover for pilot mode, click to spin!)"
      >
        {/* Hover Speech Cue */}
        {penguinHovered && !penguinSpeech && (
          <div className="absolute -top-10 right-1 bg-cyan-400 text-blue-950 text-[11px] font-black font-game px-2.5 py-1 rounded-xl shadow-xl border-2 border-white whitespace-nowrap animate-bounce">
            Ready to test your STEM skills! 🚀
            <div className="absolute -bottom-1 right-6 w-2.5 h-2.5 bg-cyan-400 border-r-2 border-b-2 border-white rotate-45" />
          </div>
        )}

        {/* Click Speech Message */}
        {penguinSpeech && (
          <div className="absolute -top-14 right-0 bg-white/95 text-slate-900 text-xs font-extrabold font-game px-3 py-1.5 rounded-2xl shadow-2xl border-2 border-cyan-400 whitespace-nowrap animate-in zoom-in-75 duration-200">
            {penguinSpeech}
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-r-2 border-b-2 border-cyan-400 rotate-45" />
          </div>
        )}

        {/* Particle Burst on Click */}
        {penguinParticles.map((p) => (
          <span
            key={p.id}
            className="absolute text-base font-bold pointer-events-none animate-ping duration-700"
            style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
          >
            {p.icon}
          </span>
        ))}

        {/* Penguin on Rock Platform */}
        <div
          className={`relative p-2.5 rounded-2xl bg-white/25 backdrop-blur-xs border-2 shadow-2xl transition-all duration-300 ${
            penguinSpinning
              ? 'scale-125 -translate-y-6 rotate-[360deg] border-cyan-300 bg-cyan-400/30'
              : penguinHovered
              ? 'scale-110 -translate-y-2 border-cyan-300 bg-white/40 shadow-[0_0_20px_rgba(34,211,238,0.7)]'
              : 'animate-mascot-bob border-white/50'
          }`}
        >
          {/* Custom SVG Penguin */}
          <svg className="w-16 h-18" viewBox="0 0 64 72" fill="none">
            {/* Rock Base */}
            <path d="M6 64 Q32 58 58 64 Q62 70 32 71 Q2 70 6 64 Z" fill="#64748B" />
            <path d="M12 63 Q32 59 52 63" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

            {/* Penguin Body (Navy/Black) */}
            <ellipse cx="32" cy="38" rx="20" ry="24" fill="#0F172A" />
            {/* White Belly */}
            <ellipse cx="32" cy="42" rx="14" ry="17" fill="#FFFFFF" />

            {/* Flippers (Flap up when hovered or clicked!) */}
            <ellipse
              cx="11"
              cy="40"
              rx="5"
              ry="12"
              fill="#0F172A"
              transform={penguinHovered || penguinSpinning ? 'rotate(-35 11 40)' : 'rotate(15 11 40)'}
              className="transition-transform duration-200"
            />
            <ellipse
              cx="53"
              cy="40"
              rx="5"
              ry="12"
              fill="#0F172A"
              transform={penguinHovered || penguinSpinning ? 'rotate(35 53 40)' : 'rotate(-15 53 40)'}
              className="transition-transform duration-200"
            />

            {/* Cute Yellow Beak */}
            <path d="M28 32 L36 32 L32 38 Z" fill="#F59E0B" />

            {/* Eyes */}
            <circle cx="26" cy="27" r="3" fill="#0F172A" />
            <circle cx="27" cy="26" r="1" fill="#FFFFFF" />
            <circle cx="38" cy="27" r="3" fill="#0F172A" />
            <circle cx="39" cy="26" r="1" fill="#FFFFFF" />

            {/* Blush cheeks */}
            <circle cx="21" cy="32" r="2.5" fill="#FB7185" opacity={penguinHovered ? 0.9 : 0.7} />
            <circle cx="43" cy="32" r="2.5" fill="#FB7185" opacity={penguinHovered ? 0.9 : 0.7} />

            {/* Aviator Goggles on forehead (slides over eyes on hover!) */}
            <rect
              x="20"
              y={penguinHovered ? '23' : '16'}
              width="10"
              height="7"
              rx="3"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="transition-all duration-200"
            />
            <rect
              x="34"
              y={penguinHovered ? '23' : '16'}
              width="10"
              height="7"
              rx="3"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="transition-all duration-200"
            />
            <rect
              x="29"
              y={penguinHovered ? '25' : '18'}
              width="6"
              height="2"
              fill="#0284C7"
              className="transition-all duration-200"
            />
            <path
              d={penguinHovered ? 'M14 27 Q32 21 50 27' : 'M14 20 Q32 14 50 20'}
              stroke="#78350F"
              strokeWidth="2.5"
              fill="none"
              className="transition-all duration-200"
            />

            {/* Big Cyan Gaming Headphones */}
            <path d="M12 28 Q32 6 52 28" stroke="#06B6D4" strokeWidth="3.5" fill="none" />
            <rect x="9" y="24" width="6" height="12" rx="3" fill="#0891B2" stroke="#22D3EE" strokeWidth="1" />
            <rect x="49" y="24" width="6" height="12" rx="3" fill="#0891B2" stroke="#22D3EE" strokeWidth="1" />

            {/* Cute Orange Feet */}
            <ellipse cx="25" cy="62" rx="6" ry="3" fill="#F59E0B" />
            <ellipse cx="39" cy="62" rx="6" ry="3" fill="#F59E0B" />
          </svg>

          <div className="text-[10px] text-center font-bold text-white drop-shadow font-game mt-0.5">
            {penguinSpinning ? '✦ SQUEAK! +25XP' : penguinHovered ? 'Pilot Pip' : 'Captain Pip'}
          </div>
        </div>
      </div>

      {/* Floating Interactive Soap Bubbles with Reflections */}
      {bubbles.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => popBubble(b.id)}
          className="absolute rounded-full pointer-events-auto cursor-pointer animate-float-bubble transition-transform hover:scale-125 focus:outline-none"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            background:
              'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(220, 240, 255, 0.45) 40%, rgba(186, 230, 253, 0.3) 70%, rgba(56, 189, 248, 0.6) 100%)',
            boxShadow:
              'inset -2px -2px 6px rgba(14, 165, 233, 0.6), inset 2px 2px 6px rgba(255, 255, 255, 0.9), 0 4px 12px rgba(14, 165, 233, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
          title="Click to pop bubble!"
        >
          <div className="absolute top-1.5 left-2 w-2.5 h-1.5 bg-white rounded-full rotate-[-30deg] opacity-90" />
        </button>
      ))}
    </div>
  );
};
