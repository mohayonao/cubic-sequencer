"use strict";

const redux = require("redux");
const master = require("./master");
const matrix = require("./matrix");
const ticks = require("./ticks");
const track = require("./track");

module.exports = redux.combineReducers({
  master: redux.combineReducers(master),
  matrix,
  ticks,
  track,
});
