import { playInstrument } from "./instrument-button.js";

export const INSTRUMENTS = [
  "piano",
  "drum",
  "guitar",
  "trumpet",
  "bell",
  "maracas",
  "violin",
  "flute",
  "saxophone",
  "banjo",
  "accordion",
  "bongo",
  "voice",
  "theremin",
  "harp",
];

function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadTextDefault(url) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Page introuvable : ${url}`);
    return response.text();
  });
}

const UNKNOWN = "unknown";

export async function renderInstruments(grid, { loadText, loadPlay } = {}) {
  const load = loadText ?? loadTextDefault;
  const loadPlayDefault = (id) => import(`../instruments/${id}/${id}.js`);

  for (const id of INSTRUMENTS) {
    let renderedId = id;
    let module;
    let html;
    try {
      [module, html] = await Promise.all([
        (loadPlay ?? loadPlayDefault)(id),
        load(new URL(`instruments/${id}/${id}.html`, document.baseURI).href),
      ]);
    } catch {
      console.warn(`Instrument "${id}" absent ou cassé — remplacé par un instrument inconnu.`);
      try {
        renderedId = UNKNOWN;
        [module, html] = await Promise.all([
          (loadPlay ?? loadPlayDefault)(UNKNOWN),
          load(new URL(`instruments/${UNKNOWN}/${UNKNOWN}.html`, document.baseURI).href),
        ]);
      } catch {
        continue;
      }
    }

    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const button = template.content.querySelector(".instrument");

    loadStylesheet(new URL(`instruments/${renderedId}/${renderedId}.css`, document.baseURI).href);

    button.addEventListener("click", () => playInstrument(button, module.play));
    grid.appendChild(button);
  }
}

export async function init() {
  const grid = document.getElementById("instrument-grid");
  if (!grid) return;
  await renderInstruments(grid);
}

init();
