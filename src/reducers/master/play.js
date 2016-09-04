"use strict";

module.exports = (state = 0, action) => {
  if (action.type === "TOGGLE_PLAY") {
    return 1 - state;
  }
  return state;
};
