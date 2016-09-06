"use strict";

module.exports = {
  coin(x) {
    return Math.random() < x ? 1 : 0;
  },
  irand(x) {
    return Math.floor(Math.random() * x);
  },
  rand2(x) {
    return (Math.random() * 2 - 1) * x;
  },
  sample(list) {
    return list[Math.floor(Math.random() * list.length)];
  },
};
