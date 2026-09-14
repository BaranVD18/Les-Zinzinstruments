import { describe, it, expect, vi } from "vitest";
import { playTone } from "../src/js/audio.js";
import { id, play } from "../src/instruments/unknown/unknown.js";
import html from "../src/instruments/unknown/unknown.html?raw";
import css from "../src/instruments/unknown/unknown.css?raw";

vi.mock("../src/js/audio.js", () => ({
  playTone: vi.fn(),
  noiseBurst: vi.fn(),
  playVoice: vi.fn(),
}));

describe("unknown", () => {
  it("affiche sa bulle", () => {
    expect(html, `unknown.html : le <button> doit porter data-instrument="unknown" — corrige l'attribut data-instrument.`).toContain(`data-instrument="${id}"`);
    expect(html, `unknown.html : la bulle doit être data-popup="POUA POUA POUA POUAAA! ❓" — corrige l'attribut data-popup.`).toContain('data-popup="POUA POUA POUA POUAAA! ❓"');
  });

  it("porte sa couleur", () => {
    expect(css, `unknown.css : le bouton inconnu doit être gris — garde --hue: 220 et le fond gris en dégradé.`).toContain("--hue: 220");
    expect(css, `unknown.css : le fond gris doit être un dégradé linear-gradient — corrige la propriété background.`).toContain("linear-gradient");
  });

  it("joue le son de l'échec", () => {
    play();
    expect(playTone, "unknown.js : le trombone triste a 4 notes descendantes — playTone(fréquence, onde, durée, volume, tempo, détune).").toHaveBeenCalledTimes(4);
    expect(playTone, `unknown.js : la note n°1 est incorrecte — appelle playTone(233.08, "sawtooth", 0.3, 0.25) exactement.`).toHaveBeenNthCalledWith(1, 233.08, "sawtooth", 0.3, 0.25);
    expect(playTone, `unknown.js : la note n°2 est incorrecte — appelle playTone(220, "sawtooth", 0.3, 0.25, 0.3) exactement.`).toHaveBeenNthCalledWith(2, 220, "sawtooth", 0.3, 0.25, 0.3);
    expect(playTone, `unknown.js : la note n°3 est incorrecte — appelle playTone(207.65, "sawtooth", 0.3, 0.25, 0.6) exactement.`).toHaveBeenNthCalledWith(3, 207.65, "sawtooth", 0.3, 0.25, 0.6);
    expect(playTone, `unknown.js : la note finale doit couler — appelle playTone(196, "sawtooth", 1, 0.3, 0.9, -30) exactement (-30 = la note glisse vers le bas).`).toHaveBeenNthCalledWith(4, 196, "sawtooth", 1, 0.3, 0.9, -30);
  });
});
