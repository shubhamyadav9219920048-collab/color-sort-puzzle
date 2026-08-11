class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public musicEnabled: boolean = true;
  public hapticsEnabled: boolean = true;
  public soundVolume: number = 0.9;
  public musicVolume: number = 0.8;
  private musicTimer: number | null = null;
  private currentThemeKey: string = 'neon';

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public startThemeMusic(themeKey: string) {
    this.currentThemeKey = themeKey;
    if (!this.enabled) {
      this.stopThemeMusic();
      return;
    }
    this.initCtx();
    if (!this.ctx) return;

    this.stopThemeMusic();

    // Loop interval for ambient melody note generation
    let noteIndex = 0;
    const playNextBar = () => {
      if (!this.enabled || !this.ctx) return;
      
      const now = this.ctx.currentTime;
      
      // Theme specific pentatonic / modal frequencies
      const themeScales: Record<string, number[]> = {
        forest: [220, 261.63, 293.66, 329.63, 392.00, 440.00], // Wooden A Minor
        ocean: [196, 220, 261.63, 329.63, 392.00, 523.25], // Deep C Major Aqua
        candy: [329.63, 392.00, 440.00, 523.25, 587.33, 659.25], // Sweet E Major
        neon: [110, 130.81, 146.83, 164.81, 196.00, 220.00], // Low Synthwave Bass A
        space: [174.61, 220.00, 261.63, 329.63, 440.00, 523.25], // Space F Lydian
        desert: [146.83, 155.56, 185.00, 220.00, 246.94, 293.66], // Phrygian Desert D
        snow: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33], // Crisp D Major
        volcano: [82.41, 87.31, 110.00, 123.47, 130.81, 164.81], // Deep E Phrygian Lava
      };

      const scale = themeScales[this.currentThemeKey] || themeScales.neon;
      const freq = scale[noteIndex % scale.length];
      noteIndex++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = this.currentThemeKey === 'neon' || this.currentThemeKey === 'volcano' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.8);
    };

    playNextBar();
    this.musicTimer = window.setInterval(playNextBar, 2200);
  }

  public stopThemeMusic() {
    if (this.musicTimer !== null) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  public triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' = 'light') {
    if (!this.hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      if (type === 'light') navigator.vibrate(10);
      else if (type === 'medium') navigator.vibrate(25);
      else if (type === 'heavy') navigator.vibrate(50);
      else if (type === 'success') navigator.vibrate([30, 50, 60]);
    } catch {
      // ignore
    }
  }

  public playSelect() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('light');

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  public playPour(duration: number = 0.4) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('medium');

    const now = this.ctx.currentTime;
    
    // Create liquid bubbling tone
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  public playError() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('heavy');

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.15);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playCoin() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('medium');

    const now = this.ctx.currentTime;

    const playTone = (freq: number, startTime: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.12);
    };

    playTone(987.77, now); // B5
    playTone(1318.51, now + 0.08); // E6
  }

  public playVictory() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('success');

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.18, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.3);
    });
  }

  public playWheelTick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('light');

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  public playJackpot() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('success');

    const now = this.ctx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

    arpeggio.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.18, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.25);
    });
  }

  public playBooster() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerHaptic('medium');

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const soundEngine = new SoundEngine();
