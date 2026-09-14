import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/theremin/theremin.js";
import html from "../src/instruments/theremin/theremin.html?raw";
import css from "../src/instruments/theremin/theremin.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("theremin", () => {
  it("affiche sa bulle", () => {
    expect(html, `theremin.html : le <button> doit porter data-instrument="theremin" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `theremin.html : la bulle doit être data-popup="WOOOO! 🎛️" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="WOOOO! 🎛️"');
  });

  it("porte sa couleur", () => {
    expect(css, `theremin.css : la couleur du bouton vient de --hue: 190 — corrige la valeur de --hue.`).toContain("--hue: 190");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "theremin.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `theremin.js : la note n°1 est incorrecte — appelle playTone(659.25, "sine", 0.5, 0.25, 0, 25) exactement (25 = gros wobble).`).toHaveBeenNthCalledWith(1, 659.25, "sine", 0.5, 0.25, 0, 25);
    expect(playTone, `theremin.js : la note n°2 est incorrecte — appelle playTone(587.33, "sine", 0.5, 0.25, 0.4, -20) exactement.`).toHaveBeenNthCalledWith(2, 587.33, "sine", 0.5, 0.25, 0.4, -20);
    expect(playTone, `theremin.js : la note n°3 est incorrecte — appelle playTone(659.25, "sine", 0.7, 0.25, 0.8, 0) exactement.`).toHaveBeenNthCalledWith(3, 659.25, "sine", 0.7, 0.25, 0.8, 0);
  });
});
