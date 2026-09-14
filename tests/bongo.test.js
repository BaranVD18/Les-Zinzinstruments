import { describe, it, expect, vi } from "vitest";
import { playTone, noiseBurst } from "../src/js/audio.js";
import { id, play } from "../src/instruments/bongo/bongo.js";
import html from "../src/instruments/bongo/bongo.html?raw";
import css from "../src/instruments/bongo/bongo.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("bongo", () => {
  it("affiche sa bulle", () => {
    expect(html, `bongo.html : le <button> doit porter data-instrument="bongo" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `bongo.html : la bulle doit être data-popup="BA-DUM! 🪘" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="BA-DUM! 🪘"');
  });

  it("porte sa couleur", () => {
    expect(css, `bongo.css : la couleur du bouton vient de --hue: 0 — corrige la valeur de --hue.`).toContain("--hue: 0");
  });

  it("joue son son", () => {
    play();
    expect(noiseBurst, "bongo.js : il faut exactement 2 claques de peau — noiseBurst(durée, volume, filtre, tempo).").toHaveBeenCalledTimes(2);
    expect(noiseBurst, `bongo.js : la claque n°1 est incorrecte — appelle noiseBurst(0.1, 0.4, 2500) exactement.`).toHaveBeenNthCalledWith(1, 0.1, 0.4, 2500);
    expect(noiseBurst, `bongo.js : la claque n°2 est incorrecte — appelle noiseBurst(0.1, 0.4, 3000, 0.18) exactement.`).toHaveBeenNthCalledWith(2, 0.1, 0.4, 3000, 0.18);
    expect(playTone, "bongo.js : il faut exactement 2 tones de tambour — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(2);
    expect(playTone, `bongo.js : le ton n°1 est incorrect — appelle playTone(300, "sine", 0.15, 0.4) exactement.`).toHaveBeenNthCalledWith(1, 300, "sine", 0.15, 0.4);
    expect(playTone, `bongo.js : le ton n°2 est incorrect — appelle playTone(380, "sine", 0.15, 0.4, 0.18) exactement.`).toHaveBeenNthCalledWith(2, 380, "sine", 0.15, 0.4, 0.18);
  });
});
