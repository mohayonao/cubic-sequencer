"use strict";

const redux = require("redux");
const play = require("./play");
const bpm = require("./bpm");

module.exports = redux.combineReducers({
  play,
  bpm,
});
