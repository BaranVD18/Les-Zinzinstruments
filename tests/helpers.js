import { vi } from "vitest";

export function createAudioMock() {
  const oscillators = [];
  const gains = [];
  const filters = [];
  const bufferSources = [];
  const buffers = [];

  class MockAudioContext {
    constructor() {
      this.currentTime = 0;
      this.sampleRate = 44100;
      this.state = "running";
      this.destination = {};
      this.resume = vi.fn();
      this.oscillators = oscillators;
      this.gains = gains;
      this.filters = filters;
      this.bufferSources = bufferSources;
      this.buffers = buffers;
    }

    createOscillator() {
      const oscillator = {
        type: "",
        frequency: { setValueAtTime: vi.fn() },
        detune: { setValueAtTime: vi.fn() },
        connect: vi.fn((node) => node),
        start: vi.fn(),
        stop: vi.fn(),
      };
      oscillators.push(oscillator);
      return oscillator;
    }

    createGain() {
      const gain = {
        gain: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn((node) => node),
      };
      gains.push(gain);
      return gain;
    }

    createBiquadFilter() {
      const filter = {
        type: "",
        frequency: { setValueAtTime: vi.fn() },
        connect: vi.fn((node) => node),
      };
      filters.push(filter);
      return filter;
    }

    createBuffer(channels, length, sampleRate) {
      const data = new Float32Array(length);
      buffers.push({ channels, length, sampleRate, data });
      return { getChannelData: () => data };
    }

    createBufferSource() {
      const source = {
        buffer: null,
        connect: vi.fn((node) => node),
        start: vi.fn(),
      };
      bufferSources.push(source);
      return source;
    }
  }

  return {
    MockAudioContext,
    clear() {
      oscillators.length = 0;
      gains.length = 0;
      filters.length = 0;
      bufferSources.length = 0;
      buffers.length = 0;
    },
    oscillators,
    gains,
    filters,
    bufferSources,
    buffers,
  };
}

export function buttonFromFragment(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function setupPopupLayer() {
  document.body.innerHTML = `<div id="popup-layer" aria-live="polite"></div>`;
  return document.getElementById("popup-layer");
}
