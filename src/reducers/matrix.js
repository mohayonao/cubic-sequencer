"use strict";

const redux = require("redux");
const nmap = require("nmap");
const coin = require("../utils/coin");
const { N } = require("../consts");

const random = () => coin(0.1);

module.exports = redux.combineReducers(nmap(N, (_, i) => {
  return redux.combineReducers(nmap(N, (_, j) => {
    return redux.combineReducers(nmap(N, (_, k) => {
      return (state = random(), action) => {
        if (action.type === "TOGGLE_MATRIX") {
          if (action.i === i && action.j === j && action.k === k) {
            return 1 - state;
          }
        }
        if (action.type === "RANDOM") {
          return random();
        }
        if (action.type === "CLEAR") {
          return 0;
        }
        return state;
      };
    }));
  }));
}));
