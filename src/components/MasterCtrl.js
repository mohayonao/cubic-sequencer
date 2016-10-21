import React, { Component, PropTypes } from "react";
import LabeledMatrixCtrl from "./LabeledMatrixCtrl";
import { BPM_MAP, EMPTY_COLOR, MASTER_COLOR, TRACK_COLORS } from "../constants";

export default class MasterCtrl extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    master : PropTypes.object.isRequired,
  };

  render() {
    const { actions, master } = this.props;
    const playMat = [ [ master.play, 0, 0 ] ];
    const bpmMat = [ BPM_MAP.map((_, i) => i === master.bpm ? 1 : 0) ];
    const axisMat = [ TRACK_COLORS.map((_, i) => master.track === i ? (i + 1) : 0) ];
    const axisColor = `${ EMPTY_COLOR };${ TRACK_COLORS.join(";") }`;
    const masterColor = `${ EMPTY_COLOR };${ MASTER_COLOR }`;
    const masterCtrl = () => ({ col }) => {
      [ actions.togglePlay, actions.random, actions.clear ][col]()
    };
    const changeBPM = () => ({ col }) => {
      actions.changeBPM(col)
    };
    const changeTrack = () => ({ col }) => {
      actions.changeTrack(col)
    };

    return (
      <div>
        <LabeledMatrixCtrl label="ply/rnd/clr"
          data={ playMat } color={ masterColor } action={ masterCtrl() } />
        <LabeledMatrixCtrl label="bpm"
          data={ bpmMat } color={ masterColor } action={ changeBPM() } />
        <LabeledMatrixCtrl label="axis"
          data={ axisMat } color={ axisColor } action={ changeTrack() } />
      </div>
    );
  }
}
