"use strict";

const nmap = require("nmap");
const React = require("react");
const LabeledMatrixCtrl = require("./LabeledMatrixCtrl");
const { to3DIndex } = require("../utils/matrix");
const { N, EMPTY_COLOR, TRACK_COLORS } = require("../constants");

class TrackCtrl extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    matrix : React.PropTypes.object.isRequired,
    track  : React.PropTypes.number.isRequired,
    state  : React.PropTypes.object.isRequired,
  };

  render() {
    const { actions, track, state } = this.props;
    const pitchShiftMat = [ nmap(N, (_, i) => i === state.pitchShift ? 1 : 0) ];
    const loopLengthMat = [ nmap(N, (_, i) => i === state.loopLength ? 1 : 0) ];
    const noteLengthMat = [ nmap(N, (_, i) => i === state.noteLength ? 1 : 0) ];
    const sceneMat = [ nmap(N, (_, i) => i === state.scene ? 1 : 0) ];
    const matrix = this.props.matrix.axis[track][state.scene];
    const ctrlColor = `${ EMPTY_COLOR };${ TRACK_COLORS[track] }`;
    const updateState = (dataType) => (e) => {
      actions.updateState(track, dataType, e.col);
    };
    const updateMatrix = () => ({ row, col }) => {
      actions.toggleMatrix(...to3DIndex(track, state.scene, row, col));
    };

    return (
      <div>
        <LabeledMatrixCtrl label="pitch shift"
          data={ pitchShiftMat } color={ ctrlColor } action={ updateState("pitchShift") } />
        <LabeledMatrixCtrl label="loop length"
          data={ loopLengthMat } color={ ctrlColor } action={ updateState("loopLength") } />
        <LabeledMatrixCtrl label="note length"
          data={ noteLengthMat } color={ ctrlColor } action={ updateState("noteLength") } />
        <LabeledMatrixCtrl label="scene"
          data={ sceneMat } color={ ctrlColor } action={ updateState("scene") } />
        <LabeledMatrixCtrl label="matrix"
          data={ matrix } color={ ctrlColor } action={ updateMatrix() } />
      </div>
    );
  }
}

module.exports = TrackCtrl;
