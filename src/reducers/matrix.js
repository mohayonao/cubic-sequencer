"use strict";

const nmap = require("nmap");
const types = require("../constants/ActionTypes");
const { coin } = require("../utils/random");
const { N } = require("../constants");

const rand = () => coin(0.1);
const createMatrix = fn => nmap(N, () => nmap(N, () => nmap(N, fn)));

module.exports = (state = createMatrix(rand), action) => {
  if (action.type === types.TOGGLE_MATRIX) {
    state = JSON.parse(JSON.stringify(state));
    state[action.i][action.j][action.k] = 1 - state[action.i][action.j][action.k];
    return state;
  }
  if (action.type === types.RANDOM) {
    return createMatrix(rand);
  }
  if (action.type === types.CLEAR) {
    return createMatrix(() => 0);
  }
  return state;
};
