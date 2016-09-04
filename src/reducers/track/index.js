"use strict";

const redux = require("redux");
const selected = require("./selected");
const state = require("./state");

module.exports = redux.combineReducers({
  selected,
  state,
});
