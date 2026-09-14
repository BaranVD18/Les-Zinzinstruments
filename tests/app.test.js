import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createAudioMock } from "./helpers.js";
import { renderInstruments } from "../src/js/app.js";

const audio = createAudioMock();
window.AudioContext = audio.MockAudioContext;

const POPUPS = {
  piano: "PLING! 🎹",
  drum: "BOOM! 🥁",
  guitar: "TWANG! 🎸",
  trumpet: "PAH-PAH! 🎺",
  bell: "DING! 🔔",
  maracas: "SHAKE! 🪇",
  violin: "VWAH! 🎻",
  flute: "FWEET! 🪈",
  saxophone: "JAZZY! 🎷",
  banjo: "ROLL! 🪕",
  accordion: "SQUEEZE! 🪗",
  bongo: "BA-DUM! 🪘",
  voice: "LA-LA! 🗣️",
  theremin: "WOOOO! 🎛️",
  harp: "GLISS! 🪉",
  unknown: "POUA POUA POUA POUAAA! ❓",
};

function fakeLoadText(url) {
  const match = url.match(/instruments\/([a-z]+)\/\1\.html$/);
  const id = match[1];
  return Promise.resolve(
    `<script type="module" src="/@vite/client"></script><button class="instrument" data-instrument="${id}" data-popup="${POPUPS[id]}"><span class="name">${id}</span></button>`
  );
}

describe("app", () => {
  beforeEach(() => {
    audio.clear();
    document.body.innerHTML = `
      <div class="grid" id="instrument-grid"></div>
      <div id="popup-layer" aria-live="polite"></div>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders one button per instrument", async () => {
    await renderInstruments(document.getElementById("instrument-grid"), { loadText: fakeLoadText });

    expect(document.querySelectorAll("#instrument-grid .instrument")).toHaveLength(15);
    expect(document.querySelectorAll('[data-instrument="piano"]')).toHaveLength(1);
    expect(document.querySelectorAll('[data-instrument="voice"]')).toHaveLength(1);
  });

  it("ignores extra tags injected into the fragments", async () => {
    await renderInstruments(document.getElementById("instrument-grid"), { loadText: fakeLoadText });

    expect(document.querySelectorAll("#instrument-grid script")).toHaveLength(0);
    expect(document.querySelectorAll("#instrument-grid .instrument")).toHaveLength(15);
  });

  it("clicking a rendered instrument plays its sound and popup", async () => {
    await renderInstruments(document.getElementById("instrument-grid"), { loadText: fakeLoadText });

    document.querySelector('[data-instrument="piano"]').click();

    expect(document.querySelector("#popup-layer .popup").textContent).toBe("PLING! 🎹");
    expect(audio.oscillators).toHaveLength(3);
    expect(audio.bufferSources).toHaveLength(0);
  });

  it("loads a stylesheet per instrument", async () => {
    await renderInstruments(document.getElementById("instrument-grid"), { loadText: fakeLoadText });

    const cssLinks = [...document.querySelectorAll("head link[rel='stylesheet']")].map((link) =>
      link.getAttribute("href")
    );
    expect(cssLinks.filter((href) => href.endsWith("piano.css"))).toHaveLength(1);
    expect(cssLinks.filter((href) => href.endsWith("voice.css"))).toHaveLength(1);
    expect(cssLinks.filter((href) => href.endsWith("unknown.css"))).toHaveLength(1);
  });

  it("shows the unknown instrument when one is missing", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const loadPlay = (id) =>
      id === "bell" ? Promise.reject(new Error("instrument absent")) : import(`../src/instruments/${id}/${id}.js`);

    await renderInstruments(document.getElementById("instrument-grid"), { loadText: fakeLoadText, loadPlay });

    expect(document.querySelectorAll("#instrument-grid .instrument")).toHaveLength(15);
    const unknownButton = document.querySelector('[data-instrument="unknown"]');
    expect(unknownButton).not.toBeNull();
    unknownButton.click();
    expect(document.querySelector("#popup-layer .popup").textContent).toBe("POUA POUA POUA POUAAA! ❓");
  });
});
