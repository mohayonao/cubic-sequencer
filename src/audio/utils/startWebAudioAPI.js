export default function startWebAudioAPI(audioContext) {
  if (audioContext.currentTime === 0) {
    const bufferSource = audioContext.createBufferSource();

    bufferSource.buffer = audioContext.createBuffer(1, 8, audioContext.sampleRate);
    bufferSource.start(audioContext.currentTime);
    bufferSource.stop(audioContext.currentTime + bufferSource.buffer.duration);
    bufferSource.connect(audioContext.destination);
    bufferSource.onended = () => {
      bufferSource.disconnect();
    };
  }
}
