"use strict";

const nmap = require("nmap");
const types = require("../constants/ActionTypes");
const { coin } = require("../utils/random");
const { pluck } = require("../utils/matrix");
const { N } = require("../constants");

const rand = () => coin(0.1);
const createMatrix = (fn) => {
  const data = nmap(N, () => nmap(N, () => nmap(N, fn)));

  return { data, axis: createAxis(data) };
};
const createAxis = (data) => [ 0, 1, 2 ].map(i => pluck(data, i));

module.exports = (state = createMatrix(rand), action) => {
  if (action.type === types.TOGGLE_MATRIX) {
    const data = JSON.parse(JSON.stringify(state.data));
    data[action.i][action.j][action.k] = 1 - data[action.i][action.j][action.k];
    return { data, axis: createAxis(data) };
  }
  if (action.type === types.RANDOM) {
    return createMatrix(rand);
  }
  if (action.type === types.CLEAR) {
    return createMatrix(() => 0);
  }
  return state;
};
