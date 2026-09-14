import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/piano/piano.js";
import html from "../src/instruments/piano/piano.html?raw";
import css from "../src/instruments/piano/piano.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("piano", () => {
  it("affiche sa bulle", () => {
    expect(html, `piano.html : le <button> doit porter data-instrument="piano" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `piano.html : la bulle doit être data-popup="PLING! 🎹" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="PLING! 🎹"');
  });

  it("porte sa couleur", () => {
    expect(css, `piano.css : la couleur du bouton vient de --hue: 210 — corrige la valeur de --hue.`).toContain("--hue: 210");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "piano.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `piano.js : la note n°1 est incorrecte — appelle playTone(261.63, "triangle", 1.2, 0.4) exactement.`).toHaveBeenNthCalledWith(1, 261.63, "triangle", 1.2, 0.4);
    expect(playTone, `piano.js : la note n°2 est incorrecte — appelle playTone(329.63, "triangle", 1.2, 0.3) exactement.`).toHaveBeenNthCalledWith(2, 329.63, "triangle", 1.2, 0.3);
    expect(playTone, `piano.js : la note n°3 est incorrecte — appelle playTone(392, "triangle", 1.2, 0.25) exactement.`).toHaveBeenNthCalledWith(3, 392, "triangle", 1.2, 0.25);
  });
});
