import * as types from "../constants/ActionTypes";
import { irand, sample } from "../utils/random";
import { N } from "../constants";

const pitchShift = [ [ 1, 2, 2, 3 ], [ 0, 2, 4, 6 ], [ 5, 6, 7, 7 ] ];
const loopLength = [ [ 3, 7, 7, 7 ], [ 1, 3, 3, 7 ], [ 3, 5, 7, 7 ] ];
const noteLength = [ [ 1, 3, 3, 3 ], [ 0, 0, 0, 1 ], [ 3, 7, 7, 7 ] ];
const randomState = (i) => {
  return { track: i, scene: irand(N), pitchShift: sample(pitchShift[i]), loopLength: sample(loopLength[i]), noteLength: sample(noteLength[i]) };
};
const initTrackState = [ 0, 1, 2 ].map(randomState);

export default function(state = initTrackState, action) {
  if (action.type === types.UPDATE_STATE) {
    state = JSON.parse(JSON.stringify(state));
    state[action.track] = { ...state[action.track], [action.dataType]: action.dataValue };
    return state;
  }
  if (action.type === types.RANDOM) {
    return [ 0, 1, 2 ].map(randomState);
  }
  return state;
}
