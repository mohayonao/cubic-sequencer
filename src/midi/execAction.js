import { to3DIndex } from "../utils/matrix";
import { fromNoteNumber } from "./utils";

const STATE_NAMES = [
  "pitchShift", "loopLength", "noteLength"
];

export default function execAction(actions, track, scene, st, d1, d2, stateMode) {
  if (st === 0x90 && d2 !== 0) {
    const [ col, row ] = fromNoteNumber(d1);

    // matrix
    if (0 <= col && col <= 7) {
      if (stateMode) {
        if (0 <= row && row <= 2) {
          return actions.updateState(track, STATE_NAMES[row], col);
        }
      } else {
        if (0 <= row && row <= 7) {
          return actions.toggleMatrix(...to3DIndex(track, scene, row, col));
        }
      }
    }

    // right button
    if (col === 8) {
      return actions.updateState(track, "scene", 7 - row);
    }
  }

  // top button
  if (st === 0xb0 && d2 !== 0) {
    switch (d1 - 0x68) {
    case 0:
      return actions.togglePlay();
    case 1:
      return actions.random();
    case 2:
      return actions.clear();
    case 3:
      return actions.changeBPM(-1);
    case 5: case 6: case 7:
      return actions.changeTrack(d1 - 0x68 - 5);
    }
  }
}
