"use strict";

const types = require("../constants/ActionTypes");
const { irand } = require("../utils/random");

module.exports = {
  play: (state = 0, action) => {
    if (action.type === types.TOGGLE_PLAY) {
      return 1 - state;
    }
    return state;
  },
  bpm: (state = irand(3), action) => {
    if (action.type === types.CHANGE_BPM) {
      return action.bpm;
    }
    if (action.type === types.RANDOM) {
      return irand(3);
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
