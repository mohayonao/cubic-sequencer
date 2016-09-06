"use strict";

function createReverb(len) {
  const data = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
    data[i] *= Math.pow(2, -i / 80);
  }

  return data;
}

function createReverbBuffer(audioContext) {
  const data = [ createReverb(16384) ];
  const buffer = audioContext.createBuffer(data.length, data[0].length, audioContext.sampleRate);

  data.forEach((data, ch) => {
    buffer.getChannelData(ch).set(data);
  })

  return buffer;
}

module.exports = createReverbBuffer;
