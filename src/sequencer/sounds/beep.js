"use strict";

const mtof = require("../../utils/mtof");

function beep(destination, playbackTime, noteNumber, duration) {
  const t0 = playbackTime;
  const t1 = t0 + duration * 0.25;
  const freq = mtof(noteNumber);
  const audioContext = destination.context;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.frequency.value = freq * 2;
  oscillator.start(t0);
  oscillator.stop(t1);
  oscillator.connect(gain);
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.disconnect();
  };

  gain.gain.value = 0.3;
  gain.connect(destination);
}

module.exports = beep;
