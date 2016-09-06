"use strict";

const nmap = require("nmap");
const { N } = require("../constants");

module.exports = {
  pluck2D(matrix, axis, $) {
    switch (axis) {
    case 0: return nmap(N, (_, i) => nmap(N, (_, j) => matrix[$][i][j]));
    case 1: return nmap(N, (_, i) => nmap(N, (_, j) => matrix[j][$][i]));
    case 2: return nmap(N, (_, i) => nmap(N, (_, j) => matrix[i][j][$]));
    }
  },
  rotate(matrix) {
    return nmap(N, (_, i) => nmap(N, (_, j) => matrix[j][i]));
  },
};