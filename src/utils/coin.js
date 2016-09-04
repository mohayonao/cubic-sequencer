"use strict";

function coin(x) {
  return Math.random() < x ? 1 : 0;
}

module.exports = coin;
