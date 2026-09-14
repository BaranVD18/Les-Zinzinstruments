import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/saxophone/saxophone.js";
import html from "../src/instruments/saxophone/saxophone.html?raw";
import css from "../src/instruments/saxophone/saxophone.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("saxophone", () => {
  it("affiche sa bulle", () => {
    expect(html, `saxophone.html : le <button> doit porter data-instrument="saxophone" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `saxophone.html : la bulle doit être data-popup="JAZZY! 🎷" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="JAZZY! 🎷"');
  });

  it("porte sa couleur", () => {
    expect(css, `saxophone.css : la couleur du bouton vient de --hue: 320 — corrige la valeur de --hue.`).toContain("--hue: 320");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "saxophone.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `saxophone.js : la note n°1 est incorrecte — appelle playTone(311.13, "sawtooth", 0.3, 0.2, 0, -4) exactement.`).toHaveBeenNthCalledWith(1, 311.13, "sawtooth", 0.3, 0.2, 0, -4);
    expect(playTone, `saxophone.js : la note n°2 est incorrecte — appelle playTone(349.23, "sawtooth", 0.3, 0.2, 0.25, -4) exactement.`).toHaveBeenNthCalledWith(2, 349.23, "sawtooth", 0.3, 0.2, 0.25, -4);
    expect(playTone, `saxophone.js : la note n°3 est incorrecte — appelle playTone(415.3, "sawtooth", 0.55, 0.22, 0.5, -4) exactement.`).toHaveBeenNthCalledWith(3, 415.3, "sawtooth", 0.55, 0.22, 0.5, -4);
  });
});
