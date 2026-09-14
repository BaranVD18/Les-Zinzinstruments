import { describe, it, expect, vi } from "vitest";
import { noiseBurst } from "../src/js/audio.js";
import { id, play } from "../src/instruments/maracas/maracas.js";
import html from "../src/instruments/maracas/maracas.html?raw";
import css from "../src/instruments/maracas/maracas.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("maracas", () => {
  it("affiche sa bulle", () => {
    expect(html, `maracas.html : le <button> doit porter data-instrument="maracas" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `maracas.html : la bulle doit être data-popup="SHAKE! 🪇" — corrige l'attribut data-popup (texte et émoji).`).toContain('data-popup="SHAKE! 🪇"');
  });

  it("porte sa couleur", () => {
    expect(css, `maracas.css : la couleur du bouton vient de --hue: 30 — corrige la valeur de --hue.`).toContain("--hue: 30");
  });

  it("joue ses secousses", () => {
    play();
    expect(noiseBurst, "maracas.js : il faut exactement 3 secousses — noiseBurst(durée, volume, filtre, tempo).").toHaveBeenCalledTimes(3);
    expect(noiseBurst, `maracas.js : la secousse n°1 est incorrecte — appelle noiseBurst(0.12, 0.5, 6000) exactement.`).toHaveBeenNthCalledWith(1, 0.12, 0.5, 6000);
    expect(noiseBurst, `maracas.js : la secousse n°2 est incorrecte — appelle noiseBurst(0.12, 0.4, 5000, 0.2) exactement.`).toHaveBeenNthCalledWith(2, 0.12, 0.4, 5000, 0.2);
    expect(noiseBurst, `maracas.js : la secousse n°3 est incorrecte — appelle noiseBurst(0.15, 0.45, 5500, 0.4) exactement.`).toHaveBeenNthCalledWith(3, 0.15, 0.45, 5500, 0.4);
  });
});
