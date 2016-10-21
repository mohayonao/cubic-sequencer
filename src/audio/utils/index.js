export function computeDurationFromBPM(bpm, len = 4) {
  return (60 / bpm) * (4 / len);
}

export function computeFrequenceyFromNoteNumber(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}
