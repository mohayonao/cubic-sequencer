"use strict";

function computeDurationFromBPM(bpm, len = 4) {
  return (60 / bpm) * (4 / len);
}

module.exports = computeDurationFromBPM;
