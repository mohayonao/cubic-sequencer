"use strict";

const irand = require("../../utils/irand");

module.exports = (state = irand(3), action) => {
  if (action.type === "CHANGE_TRACK") {
    return action.track;
  }
  if (action.type === "RANDOM") {
    return irand(3);
  }
  return state;
};
