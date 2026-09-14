import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/bell/bell.js";
import html from "../src/instruments/bell/bell.html?raw";
import css from "../src/instruments/bell/bell.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("bell", () => {
  it("affiche sa bulle", () => {
    expect(html, `bell.html : le <button> doit porter data-instrument="bell" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `bell.html : la bulle doit être data-popup="DING! 🔔" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="DING! 🔔"');
  });

  it("porte sa couleur", () => {
    expect(css, `bell.css : la couleur du bouton vient de --hue: 180 — corrige la valeur de --hue.`).toContain("--hue: 180");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "bell.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `bell.js : la note n°1 est incorrecte — appelle playTone(880, "sine", 2, 0.35) exactement.`).toHaveBeenNthCalledWith(1, 880, "sine", 2, 0.35);
    expect(playTone, `bell.js : la note n°2 est incorrecte — appelle playTone(1760, "sine", 1.5, 0.15) exactement.`).toHaveBeenNthCalledWith(2, 1760, "sine", 1.5, 0.15);
    expect(playTone, `bell.js : la note n°3 est incorrecte — appelle playTone(2637, "sine", 1, 0.08) exactement.`).toHaveBeenNthCalledWith(3, 2637, "sine", 1, 0.08);
  });
});
