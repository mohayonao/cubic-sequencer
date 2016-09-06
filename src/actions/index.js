"use strict";

const types = require("../constants/ActionTypes");

module.exports = {
  changeBPM(bpm) {
    return { type: types.CHANGE_BPM, bpm };
  },
  changeTrack(track) {
    return { type: types.CHANGE_TRACK, track };
  },
  clear() {
    return { type: types.CLEAR };
  },
  random() {
    return { type: types.RANDOM };
  },
  tickSequencer(playbackTime, track, index) {
    return { type: types.TICK_SEQUENCER, playbackTime, track, index };
  },
  toggleMatrix(i, j, k) {
    return { type: types.TOGGLE_MATRIX, i, j, k };
  },
  togglePlay() {
    return { type: types.TOGGLE_PLAY };
  },
  updateState(track, dataType, dataValue) {
    return { type: types.UPDATE_STATE, track, dataType, dataValue };
  },
};
