import { playVoice, noiseBurst } from "../../js/audio.js";

export const id = "voice";

export function play() {
  playVoice(261.63, 0.35, 0.3);
  playVoice(329.63, 0.35, 0.3, 0.3);
  playVoice(392, 0.7, 0.32, 0.6);
  noiseBurst(0.06, 0.02, 3500);
}
