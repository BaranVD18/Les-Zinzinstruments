import { showPopup } from "./popup.js";

export function playInstrument(button, play) {
  play();
  showPopup(button, button.dataset.popup);
  button.classList.remove("shake");
  void button.offsetWidth;
  button.classList.add("shake");
}
