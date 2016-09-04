"use strict";

const irand = require("../../utils/irand");

module.exports = (state = irand(3), action) => {
  if (action.type === "CHANGE_BPM") {
    return action.bpm;
  }
  if (action.type === "RANDOM") {
    return irand(3);
  }
  return state;
};
