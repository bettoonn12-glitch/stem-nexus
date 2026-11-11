// Synthesized retro sound effects using Web Audio API (zero external files, 100% reliable)

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private bgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  public masterVolume: number = 0.8; // 0.0 to 1.0

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.musicAudio) {
      this.musicAudio.volume = Math.min(1, Math.max(0, 0.5 * this.masterVolume));
    }
    if (this.startupAudio) {
      this.startupAudio.volume = Math.min(1, Math.max(0, 0.8 * this.masterVolume));
    }
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || this.masterVolume <= 0) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  public playBubblePop() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  public playCoin() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'square';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    osc2.frequency.setValueAtTime(987.77 * 1.002, now);
    osc2.frequency.setValueAtTime(1318.51 * 1.002, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  public playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  public playError() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playLevelUp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, i) => {
      const start = ctx.currentTime + i * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.35);
    });
  }

  // UNIQUE MASCOT SOUNDS
  public playDogBark() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Two rapid yips: "Woof-woof!"
    [0, 0.12].forEach((offset) => {
      const start = now + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, start);
      osc.frequency.exponentialRampToValueAtTime(680, start + 0.04);
      osc.frequency.exponentialRampToValueAtTime(240, start + 0.1);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.1);
    });
  }

  public playPenguinChirp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Playful slide-whistle squawk
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.linearRampToValueAtTime(1100, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.16);
    osc.frequency.linearRampToValueAtTime(1300, now + 0.22);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
  }

  // GAME GENRE SOUND EFFECTS
  public playLaser() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playSwish() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Net swish swoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + 0.08);
    osc.frequency.linearRampToValueAtTime(300, now + 0.2);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  public playKick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playSlash() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.linearRampToValueAtTime(300, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playJump() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playEngineRev() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.25);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playRhythmHit() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1046.5, now); // C6
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08); // E6
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playTileSnap() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.06);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Cute 8-bit lofi study melody player
  public toggleBgm(onStateChange?: (playing: boolean) => void): boolean {
    if (this.bgmPlaying) {
      this.stopBgm();
      onStateChange?.(false);
      return false;
    } else {
      this.startBgm();
      onStateChange?.(true);
      return true;
    }
  }

  public startBgm() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.bgmPlaying = true;

    // A pleasant pentatonic lofi melody loop
    const melody = [
      { note: 523.25, dur: 0.25 }, // C5
      { note: 587.33, dur: 0.25 }, // D5
      { note: 659.25, dur: 0.5 },  // E5
      { note: 783.99, dur: 0.5 },  // G5
      { note: 659.25, dur: 0.25 }, // E5
      { note: 587.33, dur: 0.25 }, // D5
      { note: 523.25, dur: 0.5 },  // C5
      { note: 440.00, dur: 0.5 },  // A4
      { note: 523.25, dur: 0.25 }, // C5
      { note: 659.25, dur: 0.25 }, // E5
      { note: 880.00, dur: 0.75 }, // A5
      { note: 783.99, dur: 0.5 },  // G5
    ];

    let step = 0;
    const playNext = () => {
      if (!this.bgmPlaying) return;
      const cur = melody[step % melody.length];
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(cur.note, now);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + cur.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + cur.dur);

      step++;
      this.bgmTimer = window.setTimeout(playNext, cur.dur * 1000 + 40);
    };

    playNext();
  }

  private startupAudio: HTMLAudioElement | null = null;
  private musicAudio: HTMLAudioElement | null = null;
  private musicPlaying: boolean = false;
  private musicListeners: ((playing: boolean) => void)[] = [];

  public addMusicListener(listener: (playing: boolean) => void) {
    this.musicListeners.push(listener);
    listener(this.musicPlaying || this.bgmPlaying);
  }

  public removeMusicListener(listener: (playing: boolean) => void) {
    this.musicListeners = this.musicListeners.filter((l) => l !== listener);
  }

  private notifyMusicListeners(playing: boolean) {
    this.musicListeners.forEach((l) => {
      try {
        l(playing);
      } catch {
        // ignore
      }
    });
  }

  public playStartupSound() {
    if (!this.enabled) return;
    try {
      if (!this.startupAudio) {
        this.startupAudio = new Audio('/assets/aistudio/Startup_230cafe2.mp3');
        this.startupAudio.volume = 0.8;
      }
      this.startupAudio.currentTime = 0;
      const playPromise = this.startupAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to synthesized fanfare
          this.playLevelUp();
        });
      }
    } catch {
      this.playLevelUp();
    }
  }

  public toggleTaskbarMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.enabled = true;
    this.getContext(); // Unlock audio context

    if (this.musicPlaying || this.bgmPlaying) {
      this.stopMusic();
      this.stopBgm();
      onStateChange?.(false);
      this.notifyMusicListeners(false);
      return false;
    }

    try {
      if (!this.musicAudio) {
        this.musicAudio = new Audio('/assets/aistudio/Music_1164b911.mp3');
        this.musicAudio.loop = true;
        this.musicAudio.volume = Math.min(1, Math.max(0.1, 0.45 * this.masterVolume));
        this.musicAudio.addEventListener('error', () => {
          this.startBgm();
        });
      } else {
        this.musicAudio.volume = Math.min(1, Math.max(0.1, 0.45 * this.masterVolume));
      }

      this.musicPlaying = true;
      onStateChange?.(true);
      this.notifyMusicListeners(true);

      const playPromise = this.musicAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.musicPlaying = true;
            onStateChange?.(true);
            this.notifyMusicListeners(true);
          })
          .catch(() => {
            // If autoplay was blocked or file slow, start pleasant Web Audio BGM immediately!
            this.startBgm();
            this.musicPlaying = true;
            onStateChange?.(true);
            this.notifyMusicListeners(true);
          });
      } else {
        this.startBgm();
      }
      return true;
    } catch {
      const playing = this.toggleBgm(onStateChange);
      this.notifyMusicListeners(playing);
      return playing;
    }
  }

  public isMusicPlaying(): boolean {
    return this.musicPlaying || this.bgmPlaying;
  }

  public stopMusic() {
    if (this.musicAudio) {
      try {
        this.musicAudio.pause();
        this.musicAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.musicPlaying = false;
    }
    this.notifyMusicListeners(false);
  }

  public stopBgm() {
    this.bgmPlaying = false;
    this.stopMusic();
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.notifyMusicListeners(false);
  }

  public isBgmPlaying(): boolean {
    return this.bgmPlaying || this.musicPlaying;
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopBgm();
      this.stopMusic();
    }
    return !this.enabled;
  }

  public isMuted(): boolean {
    return !this.enabled;
  }
}

export const sound = new SoundEngine();
