"use strict";

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = sample;
