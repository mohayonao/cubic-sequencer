import { combineReducers } from "redux";
import * as master from "./master";
import matrix from "./matrix";
import ticks from "./ticks";
import track from "./track";

export default combineReducers({
  master: combineReducers(master),
  matrix,
  ticks,
  track,
});
