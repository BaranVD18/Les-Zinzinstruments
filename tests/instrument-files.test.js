import { describe, it, expect } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { INSTRUMENTS } from "../src/js/app.js";

const EXTENSIONS = ["html", "js", "css"];
const folderOf = (id) => join(process.cwd(), "src", "instruments", id);

describe("instrument folders", () => {
  it("piano et voix sont bien là", () => {
    expect(existsSync(folderOf("piano")), "Le dossier src/instruments/piano/ doit rester : c'est l'exemple à copier !").toBe(true);
    expect(existsSync(folderOf("voice")), "Le dossier src/instruments/voice/ doit rester : c'est l'exemple à copier !").toBe(true);
  });

  it("l'instrument inconnu est bien là", () => {
    expect(existsSync(folderOf("unknown")), "Le dossier src/instruments/unknown/ doit rester : il affiche les cases vides du zoo.").toBe(true);
  });

  it("chaque dossier existant est complet", () => {
    const folders = readdirSync(join(process.cwd(), "src", "instruments"));
    for (const id of folders) {
      for (const extension of EXTENSIONS) {
        const file = join(folderOf(id), `${id}.${extension}`);
        expect(existsSync(file), `Le fichier src/instruments/${id}/${id}.${extension} est absent — copie les 3 fichiers piano.html, piano.js et piano.css puis renomme-les en ${id}.${extension}.`).toBe(true);
      }
      expect(
        INSTRUMENTS.includes(id) || id === "unknown",
        `src/instruments/${id}/ existe mais "${id}" n'est pas dans la liste INSTRUMENTS de app.js — ajoute "${id}" à la liste (ou corrige le nom du dossier).`
      ).toBe(true);
    }
  });
});
