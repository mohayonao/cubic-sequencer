"use strict";

const types = require("../constants/ActionTypes");

module.exports = (state = [ -1, -1, -1 ], action) => {
  if (action.type === types.TICK_SEQUENCER) {
    state = state.slice();
    state[action.track] = action.index;
    return state;
  }
  return state;
};
