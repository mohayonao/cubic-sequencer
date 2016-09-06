"use strict";

const React = require("react");
const LabeledMatrixCtrl = require("./LabeledMatrixCtrl");
const { BPM_MAP, EMPTY_COLOR, MASTER_COLOR, TRACK_COLORS } = require("../constants");

class MasterCtrl extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    master : React.PropTypes.object.isRequired,
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

module.exports = MasterCtrl;
