"use strict";

const irand = require("../utils/irand");
const sample = require("../utils/sample");
const { N } = require("../consts");

const pitchShift = [ [ 1, 2, 2, 3 ], [ 0, 2, 4, 6 ], [ 5, 6, 7, 7 ] ];
const loopLength = [ [ 3, 7, 7, 7 ], [ 1, 3, 3, 7 ], [ 3, 5, 7, 7 ] ];
const noteLength = [ [ 1, 3, 3, 3 ], [ 0, 0, 0, 1 ], [ 3, 7, 7, 7 ] ];
const initTrackState = [
  { track: 0, scene: irand(N), pitchShift: sample(pitchShift[0]), loopLength: sample(loopLength[0]), noteLength: sample(noteLength[0]), color: "#e74c3c", },
  { track: 1, scene: irand(N), pitchShift: sample(pitchShift[1]), loopLength: sample(loopLength[1]), noteLength: sample(noteLength[1]), color: "#2ecc71", },
  { track: 2, scene: irand(N), pitchShift: sample(pitchShift[2]), loopLength: sample(loopLength[2]), noteLength: sample(noteLength[2]), color: "#3498db", },
];

module.exports = {
  selected: (state = irand(3), action) => {
    if (action.type === "CHANGE_TRACK") {
      return action.track;
    }
    if (action.type === "RANDOM") {
      return irand(3);
    }
    return state;
  },
  state: (state = initTrackState, action) => {
    if (action.type === "UPDATE_STATE") {
      state = JSON.parse(JSON.stringify(state));
      state[action.track] = { ...state[action.track], [action.dataType]: action.dataValue };
      return state;
    }
    if (action.type === "RANDOM") {
      return state.map((trackState, i) => {
        return {
          ...trackState,
          scene: irand(N),
          pitchShift: sample(pitchShift[i]),
          loopLength: sample(loopLength[i]),
          noteLength: sample(noteLength[i]),
        };
      });
    }
    return state;
  },
};
