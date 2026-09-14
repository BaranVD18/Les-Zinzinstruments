import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/flute/flute.js";
import html from "../src/instruments/flute/flute.html?raw";
import css from "../src/instruments/flute/flute.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("flute", () => {
  it("affiche sa bulle", () => {
    expect(html, `flute.html : le <button> doit porter data-instrument="flute" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `flute.html : la bulle doit être data-popup="FWEET! 🪈" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="FWEET! 🪈"');
  });

  it("porte sa couleur", () => {
    expect(css, `flute.css : la couleur du bouton vient de --hue: 150 — corrige la valeur de --hue.`).toContain("--hue: 150");
  });

  it("joue ses notes", () => {
    play();
    expect(playTone, "flute.js : il faut exactement 3 notes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(3);
    expect(playTone, `flute.js : la note n°1 est incorrecte — appelle playTone(1046.5, "sine", 0.25, 0.25, 0, -5) exactement.`).toHaveBeenNthCalledWith(1, 1046.5, "sine", 0.25, 0.25, 0, -5);
    expect(playTone, `flute.js : la note n°2 est incorrecte — appelle playTone(1174.66, "sine", 0.25, 0.25, 0.2, -5) exactement.`).toHaveBeenNthCalledWith(2, 1174.66, "sine", 0.25, 0.25, 0.2, -5);
    expect(playTone, `flute.js : la note n°3 est incorrecte — appelle playTone(1318.51, "sine", 0.45, 0.25, 0.4, -5) exactement.`).toHaveBeenNthCalledWith(3, 1318.51, "sine", 0.45, 0.25, 0.4, -5);
  });
});
