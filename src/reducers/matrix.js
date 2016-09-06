"use strict";

const nmap = require("nmap");
const coin = require("../utils/coin");
const { N } = require("../consts");

const rand = () => coin(0.1);
const createMatrix = fn => nmap(N, () => nmap(N, () => nmap(N, fn)));

module.exports = (state = createMatrix(rand), action) => {
  if (action.type === "TOGGLE_MATRIX") {
    state = JSON.parse(JSON.stringify(state));
    state[action.i][action.j][action.k] = 1 - state[action.i][action.j][action.k];
    return state;
  }
  if (action.type === "RANDOM") {
    return createMatrix(rand);
  }
  if (action.type === "CLEAR") {
    return createMatrix(() => 0);
  }
  return state;
};
