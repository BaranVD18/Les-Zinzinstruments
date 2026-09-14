import { describe, it, expect, vi } from "vitest";
import { playTone, noiseBurst } from "../src/js/audio.js";
import { id, play } from "../src/instruments/drum/drum.js";
import html from "../src/instruments/drum/drum.html?raw";
import css from "../src/instruments/drum/drum.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("drum", () => {
  it("affiche sa bulle", () => {
    expect(html, `drum.html : le <button> doit porter data-instrument="drum" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `drum.html : la bulle doit être data-popup="BOOM! 🥁" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="BOOM! 🥁"');
  });

  it("porte sa couleur", () => {
    expect(css, `drum.css : la couleur du bouton vient de --hue: 20 — corrige la valeur de --hue.`).toContain("--hue: 20");
  });

  it("joue son son", () => {
    play();
    expect(noiseBurst, "drum.js : il faut exactement 1 bruit de percussion — noiseBurst(durée, volume, filtre, tempo).").toHaveBeenCalledTimes(1);
    expect(noiseBurst, `drum.js : le bruit est incorrect — appelle noiseBurst(0.25, 0.6, 400) exactement.`).toHaveBeenNthCalledWith(1, 0.25, 0.6, 400);
    expect(playTone, "drum.js : il faut exactement 2 coups de baguette — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(2);
    expect(playTone, `drum.js : le coup n°1 est incorrect — appelle playTone(90, "sine", 0.3, 0.7) exactement.`).toHaveBeenNthCalledWith(1, 90, "sine", 0.3, 0.7);
    expect(playTone, `drum.js : le coup n°2 est incorrect — appelle playTone(60, "sine", 0.4, 0.5, 0.02) exactement (0.02 = léger décalage).`).toHaveBeenNthCalledWith(2, 60, "sine", 0.4, 0.5, 0.02);
  });
});
