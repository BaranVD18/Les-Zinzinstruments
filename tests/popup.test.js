import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setupPopupLayer } from "./helpers.js";
import { showPopup } from "../src/js/popup.js";
import { playInstrument } from "../src/js/instrument-button.js";

beforeEach(() => {
  setupPopupLayer();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("popup behaviour", () => {
  it("creates a popup element with the given text", () => {
    const button = document.createElement("button");

    showPopup(button, "DING! 🔔");

    const popup = document.querySelector("#popup-layer .popup");
    expect(popup).not.toBeNull();
    expect(popup.textContent).toBe("DING! 🔔");
  });

  it("centers the popup over the button", () => {
    const button = document.createElement("button");
    button.getBoundingClientRect = () => ({ left: 100, top: 50, width: 200, height: 80 });

    showPopup(button, "DING!");

    const popup = document.querySelector("#popup-layer .popup");
    expect(popup.style.left).toBe("200px");
    expect(popup.style.top).toBe("50px");
  });

  it("removes the popup after 1.2 seconds", () => {
    vi.useFakeTimers();
    const button = document.createElement("button");

    showPopup(button, "DING!");

    expect(document.querySelector("#popup-layer .popup")).not.toBeNull();
    vi.advanceTimersByTime(1200);
    expect(document.querySelector("#popup-layer .popup")).toBeNull();
  });
});

describe("instrument button", () => {
  it("plays the sound and shows the popup taken from the button", () => {
    const play = vi.fn();
    const button = document.createElement("button");
    button.dataset.popup = "TWANG! 🎸";
    document.body.appendChild(button);

    playInstrument(button, play);

    expect(play).toHaveBeenCalledTimes(1);
    expect(document.querySelector("#popup-layer .popup").textContent).toBe("TWANG! 🎸");
    expect(button.classList.contains("shake")).toBe(true);
  });
});
