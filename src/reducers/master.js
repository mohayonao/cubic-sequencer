"use strict";

const types = require("../constants/ActionTypes");
const { irand } = require("../utils/random");
const { BPM_MAP } = require("../constants");

module.exports = {
  play: (state = 0, action) => {
    if (action.type === types.TOGGLE_PLAY) {
      return 1 - state;
    }
    return state;
  },
  bpm: (state = irand(BPM_MAP.length), action) => {
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
  },
  track: (state = irand(3), action) => {
    if (action.type === types.CHANGE_TRACK) {
      return action.track;
    }
    if (action.type === types.RANDOM) {
      return irand(3);
    }
    return state;
  }
};
