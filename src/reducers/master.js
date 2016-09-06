"use strict";

const irand = require("../utils/irand");

module.exports = {
  play: (state = 0, action) => {
    if (action.type === "TOGGLE_PLAY") {
      return 1 - state;
    }
    return state;
  },
  bpm: (state = irand(3), action) => {
    if (action.type === "CHANGE_BPM") {
      return action.bpm;
    }
    if (action.type === "RANDOM") {
      return irand(3);
    }
    return state;
  },
  track: (state = irand(3), action) => {
    if (action.type === "CHANGE_TRACK") {
      return action.track;
    }
    if (action.type === "RANDOM") {
      return irand(3);
    }
    return state;
  }
};
