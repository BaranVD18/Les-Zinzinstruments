import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/guitar/guitar.js";
import html from "../src/instruments/guitar/guitar.html?raw";
import css from "../src/instruments/guitar/guitar.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("guitar", () => {
  it("affiche sa bulle", () => {
    expect(html, `guitar.html : le <button> doit porter data-instrument="guitar" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `guitar.html : la bulle doit être data-popup="TWANG! 🎸" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="TWANG! 🎸"');
  });

  it("porte sa couleur", () => {
    expect(css, `guitar.css : la couleur du bouton vient de --hue: 340 — corrige la valeur de --hue.`).toContain("--hue: 340");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "guitar.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `guitar.js : la note n°1 est incorrecte — appelle playTone(196, "sawtooth", 1.5, 0.15) exactement.`).toHaveBeenNthCalledWith(1, 196, "sawtooth", 1.5, 0.15);
    expect(playTone, `guitar.js : la note n°2 est incorrecte — appelle playTone(196, "triangle", 1.5, 0.2, 0, 8) exactement (8 = léger détune).`).toHaveBeenNthCalledWith(2, 196, "triangle", 1.5, 0.2, 0, 8);
    expect(playTone, `guitar.js : la note n°3 est incorrecte — appelle playTone(294, "triangle", 1.2, 0.15, 0.12) exactement.`).toHaveBeenNthCalledWith(3, 294, "triangle", 1.2, 0.15, 0.12);
  });
});
