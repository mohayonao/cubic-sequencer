"use strict";

function mtof(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

module.exports = mtof;
