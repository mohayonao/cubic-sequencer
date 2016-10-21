import * as types from "../constants/ActionTypes";
import { irand } from "../utils/random";
import { BPM_MAP } from "../constants";

export function play(state = 0, action) {
  if (action.type === types.TOGGLE_PLAY) {
    return 1 - state;
  }
  return state;
}

export function bpm(state = irand(BPM_MAP.length), action) {
  if (action.type === types.CHANGE_BPM) {
    if (action.bpm === -1) {
      return (state + 1) % BPM_MAP.length;
    }
    return action.bpm;
  }
  if (action.type === types.RANDOM) {
    return irand(BPM_MAP.length);
  }
  return state;
}

export function track(state = irand(3), action) {
  if (action.type === types.CHANGE_TRACK) {
    return action.track;
  }
  if (action.type === types.RANDOM) {
    return irand(3);
  }
  return state;
}
