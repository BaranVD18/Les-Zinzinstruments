import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/harp/harp.js";
import html from "../src/instruments/harp/harp.html?raw";
import css from "../src/instruments/harp/harp.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("harp", () => {
  it("affiche sa bulle", () => {
    expect(html, `harp.html : le <button> doit porter data-instrument="harp" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `harp.html : la bulle doit être data-popup="GLISS! 🪉" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="GLISS! 🪉"');
  });

  it("porte sa couleur", () => {
    expect(css, `harp.css : la couleur du bouton vient de --hue: 50 — corrige la valeur de --hue.`).toContain("--hue: 50");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "harp.js : il faut exactement 4 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(4);
    expect(playTone, `harp.js : la note n°1 est incorrecte — appelle playTone(523.25, "triangle", 1.2, 0.22) exactement.`).toHaveBeenNthCalledWith(1, 523.25, "triangle", 1.2, 0.22);
    expect(playTone, `harp.js : la note n°2 est incorrecte — appelle playTone(659.25, "triangle", 1.1, 0.2, 0.09) exactement.`).toHaveBeenNthCalledWith(2, 659.25, "triangle", 1.1, 0.2, 0.09);
    expect(playTone, `harp.js : la note n°3 est incorrecte — appelle playTone(783.99, "triangle", 1, 0.18, 0.18) exactement.`).toHaveBeenNthCalledWith(3, 783.99, "triangle", 1, 0.18, 0.18);
    expect(playTone, `harp.js : la note n°4 est incorrecte — appelle playTone(1046.5, "triangle", 1.4, 0.16, 0.27) exactement.`).toHaveBeenNthCalledWith(4, 1046.5, "triangle", 1.4, 0.16, 0.27);
  });
});
