import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/banjo/banjo.js";
import html from "../src/instruments/banjo/banjo.html?raw";
import css from "../src/instruments/banjo/banjo.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("banjo", () => {
  it("affiche sa bulle", () => {
    expect(html, `banjo.html : le <button> doit porter data-instrument="banjo" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `banjo.html : la bulle doit être data-popup="ROLL! 🪕" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="ROLL! 🪕"');
  });

  it("porte sa couleur", () => {
    expect(css, `banjo.css : la couleur du bouton vient de --hue: 60 — corrige la valeur de --hue.`).toContain("--hue: 60");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "banjo.js : il faut exactement 4 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(4);
    expect(playTone, `banjo.js : la note n°1 est incorrecte — appelle playTone(196, "triangle", 0.18, 0.3) exactement.`).toHaveBeenNthCalledWith(1, 196, "triangle", 0.18, 0.3);
    expect(playTone, `banjo.js : la note n°2 est incorrecte — appelle playTone(293.66, "triangle", 0.18, 0.3, 0.08) exactement.`).toHaveBeenNthCalledWith(2, 293.66, "triangle", 0.18, 0.3, 0.08);
    expect(playTone, `banjo.js : la note n°3 est incorrecte — appelle playTone(392, "triangle", 0.18, 0.3, 0.16) exactement.`).toHaveBeenNthCalledWith(3, 392, "triangle", 0.18, 0.3, 0.16);
    expect(playTone, `banjo.js : la note n°4 est incorrecte — appelle playTone(493.88, "triangle", 0.35, 0.3, 0.24) exactement.`).toHaveBeenNthCalledWith(4, 493.88, "triangle", 0.35, 0.3, 0.24);
  });
});
