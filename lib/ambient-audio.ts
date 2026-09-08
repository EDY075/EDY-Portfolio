export const ambientAsset = {
  // Enable only after adding an original/licensed, auditioned loop.
  available: false,
  sources: ['/audio/edy-ambient-jazz-loop.ogg', '/audio/edy-ambient-jazz-loop.mp3'],
  volume: .055,
  crossfadeSeconds: 1.5,
};

class AmbientAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffer: Promise<AudioBuffer> | null = null;
  private sources = new Set<AudioBufferSourceNode>();
  private timer = 0;
  private suspendTimer = 0;
  private revision = 0;
  private playing = false;
  metrics = { bytes: 0, downloadMs: 0, decodeMs: 0, pcmBytes: 0, contexts: 0 };

  private async load(context: AudioContext) {
    for (const url of ambientAsset.sources) {
      try {
        const start = performance.now();
        const response = await fetch(url, { cache: 'force-cache' });
        if (!response.ok) continue;
        const bytes = await response.arrayBuffer();
        const byteLength = bytes.byteLength;
        const downloaded = performance.now();
        const buffer = await context.decodeAudioData(bytes);
        if (buffer.duration < 4) continue;
        this.metrics = { bytes: byteLength, downloadMs: downloaded - start, decodeMs: performance.now() - downloaded, pcmBytes: buffer.length * buffer.numberOfChannels * 4, contexts: 1 };
        return buffer;
      } catch { /* Try the licensed MP3 fallback if OGG decoding is unsupported. */ }
    }
    throw new Error('Ambient audio unavailable');
  }

  async play() {
    if (!ambientAsset.available || this.playing) return;
    const revision = ++this.revision;
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.context.destination);
    }
    const context = this.context;
    window.clearTimeout(this.suspendTimer);
    // Called directly from a legitimate gesture, never from initial render.
    await context.resume();
    this.buffer ??= this.load(context).catch(error => { this.buffer = null; throw error; });
    const buffer = await this.buffer;
    if (revision !== this.revision || document.hidden) return;
    this.sources.forEach(source => { try { source.stop(); } catch { /* Already stopped. */ } });
    this.playing = true;
    const fade = Math.min(ambientAsset.crossfadeSeconds, buffer.duration / 8);
    const schedule = (start: number) => {
      if (!this.playing || revision !== this.revision) return;
      const source = context.createBufferSource();
      const envelope = context.createGain();
      source.buffer = buffer;
      source.connect(envelope);
      envelope.connect(this.master!);
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(1, start + fade);
      envelope.gain.setValueAtTime(1, start + buffer.duration - fade);
      envelope.gain.linearRampToValueAtTime(0, start + buffer.duration);
      source.start(start);
      this.sources.add(source);
      source.onended = () => { this.sources.delete(source); source.disconnect(); envelope.disconnect(); };
      const next = start + buffer.duration - fade;
      this.timer = window.setTimeout(() => schedule(next), Math.max(0, (next - context.currentTime - 1) * 1000));
    };
    schedule(context.currentTime + .05);
    this.master!.gain.cancelScheduledValues(context.currentTime);
    this.master!.gain.setValueAtTime(0, context.currentTime);
    this.master!.gain.linearRampToValueAtTime(ambientAsset.volume, context.currentTime + 3);
  }

  pause() {
    ++this.revision;
    this.playing = false;
    window.clearTimeout(this.timer);
    window.clearTimeout(this.suspendTimer);
    if (!this.context || !this.master) return;
    const now = this.context.currentTime;
    this.master.gain.cancelAndHoldAtTime(now);
    this.master.gain.linearRampToValueAtTime(0, now + .75);
    const oldSources = [...this.sources];
    this.suspendTimer = window.setTimeout(() => {
      oldSources.forEach(source => { try { source.stop(); } catch { /* Already ended. */ } });
      void this.context?.suspend();
    }, 800);
  }

  dispose() {
    this.pause();
    window.clearTimeout(this.suspendTimer);
    void this.context?.close();
    this.context = null;
    this.buffer = null;
    this.sources.clear();
  }
}

export const ambientAudio = new AmbientAudio();
