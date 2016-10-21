import { computeFrequenceyFromNoteNumber } from "../utils";

export default function epiano(destination, playbackTime, noteNumber, duration) {
  const t0 = playbackTime;
  const t1 = t0 + duration * 0.2;
  const t2 = t1 + duration * 1.0;
  const t3 = t2 + duration * 0.5;
  const freq = computeFrequenceyFromNoteNumber(noteNumber);
  const audioContext = destination.context;
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const oscillator3 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  const gain2 = audioContext.createGain();

  oscillator1.frequency.value = freq;
  oscillator1.detune.value = +4;
  oscillator1.start(t0);
  oscillator1.stop(t3);
  oscillator1.connect(gain1);
  oscillator1.onended = () => {
    oscillator1.disconnect();
    oscillator2.disconnect();
    oscillator3.disconnect();
    gain1.disconnect();
    gain2.disconnect();
  };

  oscillator2.frequency.value = freq;
  oscillator2.detune.value = -4;
  oscillator2.start(t0);
  oscillator2.stop(t3);
  oscillator2.connect(gain1);

  oscillator3.frequency.value = freq * 6;
  oscillator3.start(t0);
  oscillator3.stop(t3);
  oscillator3.connect(gain2);

  gain1.gain.setValueAtTime(0.4, t0);
  gain1.gain.setValueAtTime(0.4, t1);
  gain1.gain.linearRampToValueAtTime(0, t3);
  gain1.connect(destination);

  gain2.gain.setValueAtTime(freq * 2, t0);
  gain2.gain.setValueAtTime(freq * 2, t1);
  gain2.gain.linearRampToValueAtTime(freq * 0.5, t2);
  gain2.connect(oscillator1.frequency);
  gain2.connect(oscillator2.frequency);
}
