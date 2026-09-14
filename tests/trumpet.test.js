import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/trumpet/trumpet.js";
import html from "../src/instruments/trumpet/trumpet.html?raw";
import css from "../src/instruments/trumpet/trumpet.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("trumpet", () => {
  it("affiche sa bulle", () => {
    expect(html, `trumpet.html : le <button> doit porter data-instrument="trumpet" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `trumpet.html : la bulle doit être data-popup="PAH-PAH! 🎺" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="PAH-PAH! 🎺"');
  });

  it("porte sa couleur", () => {
    expect(css, `trumpet.css : la couleur du bouton vient de --hue: 45 — corrige la valeur de --hue.`).toContain("--hue: 45");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "trumpet.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `trumpet.js : la note n°1 est incorrecte — appelle playTone(233.08, "sawtooth", 0.35, 0.25) exactement.`).toHaveBeenNthCalledWith(1, 233.08, "sawtooth", 0.35, 0.25);
    expect(playTone, `trumpet.js : la note n°2 est incorrecte — appelle playTone(311.13, "sawtooth", 0.35, 0.25, 0.25) exactement.`).toHaveBeenNthCalledWith(2, 311.13, "sawtooth", 0.35, 0.25, 0.25);
    expect(playTone, `trumpet.js : la note n°3 est incorrecte — appelle playTone(349.23, "sawtooth", 0.6, 0.3, 0.5) exactement.`).toHaveBeenNthCalledWith(3, 349.23, "sawtooth", 0.6, 0.3, 0.5);
  });
});
