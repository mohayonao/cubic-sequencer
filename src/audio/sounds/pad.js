import { computeFrequenceyFromNoteNumber } from "../utils";

export default function pad(destination, playbackTime, noteNumber, duration) {
  const t0 = playbackTime;
  const t1 = t0 + duration * 0.2;
  const t2 = t1 + duration * 0.8;
  const t3 = t2 + duration;
  const freq = computeFrequenceyFromNoteNumber(noteNumber);
  const audioContext = destination.context;
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator1.frequency.value = freq;
  oscillator1.detune.setValueAtTime(0.5, t0);
  oscillator1.detune.linearRampToValueAtTime(8, t2);
  oscillator1.start(t0);
  oscillator1.stop(t3);
  oscillator1.connect(gain);

  oscillator2.frequency.value = freq;
  oscillator2.detune.setValueAtTime(-0.5, t0);
  oscillator2.detune.linearRampToValueAtTime(-8, t2);
  oscillator2.start(t0);
  oscillator2.stop(t3);
  oscillator2.connect(gain);

  oscillator1.onended = () => {
    oscillator1.disconnect();
    oscillator2.disconnect();
    gain.disconnect();
  };

  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(0.6, t1);
  gain.gain.setValueAtTime(0.6, t2);
  gain.gain.linearRampToValueAtTime(0, t3);
  gain.connect(destination);
}
