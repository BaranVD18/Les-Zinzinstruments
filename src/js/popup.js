export function showPopup(button, text) {
  const layer = document.getElementById("popup-layer");
  const rect = button.getBoundingClientRect();

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = text;
  popup.style.left = `${rect.left + rect.width / 2}px`;
  popup.style.top = `${rect.top}px`;

  layer.appendChild(popup);
  setTimeout(() => popup.remove(), 1200);
}
