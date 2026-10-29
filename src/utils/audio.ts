/**
 * Synthesizer & Sound Effects Engine using Web Audio API
 * Zero external audio file dependencies - 100% reliable in all browser sandboxes.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingMusic: boolean = false;
  private musicTimeoutId: number | null = null;
  private onMusicStateChange?: (playing: boolean) => void;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public setMusicStateListener(cb: (playing: boolean) => void) {
    this.onMusicStateChange = cb;
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingMusic) {
      this.stopMusic();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  /**
   * Balloon POP sound effect:
   * Quick resonant noise burst + low-frequency impact pop
   */
  public playBalloonPop() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Low boom thump
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);

    // High snap noise
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(800, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  }

  /**
   * Candle blow-out whoosh sound:
   * Soft bandpassed pink-like wind gust
   */
  public playBlowSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.45;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + duration);
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  /**
   * Candle light match spark sound
   */
  public playLightSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Sparkle chime chime sound for surprises and wishes
   */
  public playSparkleSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [659.25, 880, 1046.5, 1318.5];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.35);
    });
  }

  /**
   * Confetti popper explosion sound
   */
  public playPopperSound() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Pop crack
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);

    // Sparkle chime cascade
    const chords = [523.25, 659.25, 783.99, 1046.5];
    chords.forEach((freq, idx) => {
      const cOsc = ctx.createOscillator();
      const cGain = ctx.createGain();
      const delay = idx * 0.06;

      cOsc.type = 'sine';
      cOsc.frequency.setValueAtTime(freq, now + delay);

      cGain.gain.setValueAtTime(0.001, now + delay);
      cGain.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.4);

      cOsc.connect(cGain);
      cGain.connect(ctx.destination);
      cOsc.start(now + delay);
      cOsc.stop(now + delay + 0.45);
    });
  }

  /**
   * Gift reveal fanfare
   */
  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 392.00, t: 0, d: 0.12 },    // G4
      { f: 523.25, t: 0.12, d: 0.12 }, // C5
      { f: 659.25, t: 0.24, d: 0.12 }, // E5
      { f: 783.99, t: 0.36, d: 0.4 },  // G5
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.001, now + t);
      gain.gain.linearRampToValueAtTime(0.35, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });
  }

  /**
   * "Happy Birthday" tune note player
   */
  public playMusicBoxTune() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopMusic();
    this.isPlayingMusic = true;
    if (this.onMusicStateChange) this.onMusicStateChange(true);

    // Notes for "Happy Birthday" in C major:
    // [frequency, durationInBeats]
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;
    const G4 = 392.00;
    const A4 = 440.00;
    const Bb4 = 466.16;
    const C5 = 523.25;

    const beatDuration = 0.48; // seconds per beat

    const melody: Array<{ f: number; beats: number }> = [
      // Hap-py Birth-day to you
      { f: C4, beats: 0.75 },
      { f: C4, beats: 0.25 },
      { f: D4, beats: 1 },
      { f: C4, beats: 1 },
      { f: F4, beats: 1 },
      { f: E4, beats: 2 },

      // Hap-py Birth-day to you
      { f: C4, beats: 0.75 },
      { f: C4, beats: 0.25 },
      { f: D4, beats: 1 },
      { f: C4, beats: 1 },
      { f: G4, beats: 1 },
      { f: F4, beats: 2 },

      // Hap-py Birth-day dear [Friend]
      { f: C4, beats: 0.75 },
      { f: C4, beats: 0.25 },
      { f: C5, beats: 1 },
      { f: A4, beats: 1 },
      { f: F4, beats: 1 },
      { f: E4, beats: 1 },
      { f: D4, beats: 2 },

      // Hap-py Birth-day to you!
      { f: Bb4, beats: 0.75 },
      { f: Bb4, beats: 0.25 },
      { f: A4, beats: 1 },
      { f: F4, beats: 1 },
      { f: G4, beats: 1 },
      { f: F4, beats: 2.5 },
    ];

    const startTime = ctx.currentTime + 0.05;
    let currentBeat = 0;

    melody.forEach((note) => {
      const noteStart = startTime + currentBeat * beatDuration;
      const noteDuration = note.beats * beatDuration;

      // Primary chime tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(note.f, noteStart);

      // Octave harmonic overtone for music box sparkle
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(note.f * 2, noteStart);

      // Music box bell envelope: fast attack, natural exponential decay
      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration * 0.95);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(noteStart);
      osc2.start(noteStart);
      osc1.stop(noteStart + noteDuration);
      osc2.stop(noteStart + noteDuration);

      currentBeat += note.beats + 0.1; // tiny pause between notes
    });

    const totalSongDuration = (currentBeat * beatDuration + 0.5) * 1000;

    // Loop the melody gently after it ends
    this.musicTimeoutId = window.setTimeout(() => {
      if (this.isPlayingMusic && !this.isMuted) {
        this.playMusicBoxTune();
      } else {
        this.stopMusic();
      }
    }, totalSongDuration);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeoutId) {
      clearTimeout(this.musicTimeoutId);
      this.musicTimeoutId = null;
    }
    if (this.onMusicStateChange) {
      this.onMusicStateChange(false);
    }
  }

  public toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
    } else {
      this.playMusicBoxTune();
    }
  }
}

export const sound = new SoundEngine();
