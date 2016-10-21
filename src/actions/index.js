import * as types from "../constants/ActionTypes";

export function changeBPM(bpm) {
  return { type: types.CHANGE_BPM, bpm };
}

export function changeTrack(track) {
  return { type: types.CHANGE_TRACK, track };
}

export function clear() {
  return { type: types.CLEAR };
}

export function random() {
  return { type: types.RANDOM };
}

export function tickSequencer(playbackTime, track, index) {
  return { type: types.TICK_SEQUENCER, playbackTime, track, index };
}

export function toggleMatrix(i, j, k) {
  return { type: types.TOGGLE_MATRIX, i, j, k };
}

export function togglePlay() {
  return { type: types.TOGGLE_PLAY };
}

export function updateState(track, dataType, dataValue) {
  return { type: types.UPDATE_STATE, track, dataType, dataValue };
}
