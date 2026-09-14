import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/violin/violin.js";
import html from "../src/instruments/violin/violin.html?raw";
import css from "../src/instruments/violin/violin.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("violin", () => {
  it("affiche sa bulle", () => {
    expect(html, `violin.html : le <button> doit porter data-instrument="violin" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `violin.html : la bulle doit être data-popup="VWAH! 🎻" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="VWAH! 🎻"');
  });

  it("porte sa couleur", () => {
    expect(css, `violin.css : la couleur du bouton vient de --hue: 350 — corrige la valeur de --hue.`).toContain("--hue: 350");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "violin.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `violin.js : la note n°1 est incorrecte — appelle playTone(440, "sawtooth", 0.9, 0.12, 0, 6) exactement (6 = vibrato léger).`).toHaveBeenNthCalledWith(1, 440, "sawtooth", 0.9, 0.12, 0, 6);
    expect(playTone, `violin.js : la note n°2 est incorrecte — appelle playTone(493.88, "sawtooth", 0.9, 0.12, 0.45, 6) exactement.`).toHaveBeenNthCalledWith(2, 493.88, "sawtooth", 0.9, 0.12, 0.45, 6);
    expect(playTone, `violin.js : la note n°3 est incorrecte — appelle playTone(523.25, "sawtooth", 1.1, 0.14, 0.9, 6) exactement.`).toHaveBeenNthCalledWith(3, 523.25, "sawtooth", 1.1, 0.14, 0.9, 6);
  });
});
