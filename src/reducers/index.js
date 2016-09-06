"use strict";

const redux = require("redux");
const master = require("./master");
const matrix = require("./matrix");
const track = require("./track");

module.exports = redux.combineReducers({
  master: redux.combineReducers(master),
  track: redux.combineReducers(track),
  matrix,
});
