let audioContext = null;

export function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

export function playTone(freq, type, duration, volume, when = 0, detune = 0) {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const start = ctx.currentTime + when;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  osc.detune.setValueAtTime(detune, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

export function noiseBurst(duration, volume, filterFreq, when = 0) {
  const ctx = getContext();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterFreq, ctx.currentTime + when);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime + when);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + when + duration);

  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start(ctx.currentTime + when);
}

export function playVoice(freq, duration, volume, when = 0) {
  const ctx = getContext();
  const start = ctx.currentTime + when;

  const cords = ctx.createOscillator();
  cords.type = "sawtooth";
  cords.frequency.setValueAtTime(freq, start);

  const vibrato = ctx.createOscillator();
  vibrato.type = "sine";
  vibrato.frequency.setValueAtTime(5.5, start);

  const depth = ctx.createGain();
  depth.gain.setValueAtTime(6, start);
  vibrato.connect(depth).connect(cords.frequency);
  vibrato.start(start);
  vibrato.stop(start + duration + 0.1);

  const mouth = ctx.createBiquadFilter();
  mouth.type = "lowpass";
  mouth.frequency.setValueAtTime(1100, start);

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(volume, start + 0.08);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  cords.connect(mouth).connect(env).connect(ctx.destination);
  cords.start(start);
  cords.stop(start + duration + 0.05);
}
