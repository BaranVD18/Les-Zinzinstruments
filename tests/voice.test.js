import { describe, it, expect, vi } from "vitest";
import { playVoice, noiseBurst } from "../src/js/audio.js";
import { id, play } from "../src/instruments/voice/voice.js";
import html from "../src/instruments/voice/voice.html?raw";
import css from "../src/instruments/voice/voice.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("voice", () => {
  it("affiche sa bulle", () => {
    expect(html, `voice.html : le <button> doit porter data-instrument="voice" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `voice.html : la bulle doit être data-popup="LA-LA! 🗣️" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="LA-LA! 🗣️"');
  });

  it("porte sa couleur", () => {
    expect(css, `voice.css : la couleur du bouton vient de --hue: 330 — corrige la valeur de --hue.`).toContain("--hue: 330");
  });

  it("chante ses syllabes", () => {
    play();
    expect(playVoice, "voice.js : il faut exactement 3 syllabes — playVoice(fréquence, durée, volume, tempo).").toHaveBeenCalledTimes(3);
    expect(playVoice, `voice.js : la syllabe n°1 est incorrecte — appelle playVoice(261.63, 0.35, 0.3) exactement.`).toHaveBeenNthCalledWith(1, 261.63, 0.35, 0.3);
    expect(playVoice, `voice.js : la syllabe n°2 est incorrecte — appelle playVoice(329.63, 0.35, 0.3, 0.3) exactement.`).toHaveBeenNthCalledWith(2, 329.63, 0.35, 0.3, 0.3);
    expect(playVoice, `voice.js : la syllabe n°3 est incorrecte — appelle playVoice(392, 0.7, 0.32, 0.6) exactement.`).toHaveBeenNthCalledWith(3, 392, 0.7, 0.32, 0.6);
    expect(noiseBurst, "voice.js : il faut exactement 1 souffle — noiseBurst(durée, volume, filtre, tempo).").toHaveBeenCalledTimes(1);
    expect(noiseBurst, `voice.js : le souffle est incorrect — appelle noiseBurst(0.06, 0.02, 3500) exactement.`).toHaveBeenNthCalledWith(1, 0.06, 0.02, 3500);
  });
});
