"use strict";

const nmap = require("nmap");
const React = require("react");
const MatrixCtrl = require("./MatrixCtrl");
const { pluck2D } = require("../utils/matrix");
const { N, DEFAULT_COLOR, TRACK_COLORS } = require("../constants");

class TrackCtrl extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    matrix : React.PropTypes.array.isRequired,
    track  : React.PropTypes.number.isRequired,
    state   : React.PropTypes.object.isRequired,
  };

  updateState(dataType) {
    const { actions, track } = this.props;
    return (e) => {
      actions.updateState(track, dataType, e.col);
    };
  }

  updateMatrix() {
    const { actions, track, state } = this.props;
    return (e) => {
      actions.toggleMatrix(...to3DIndex(track, state.scene, e.row, e.col));
    };
  }

  render() {
    const { track, state } = this.props;
    const pitchShiftMat = [ nmap(N, (_, i) => i === state.pitchShift ? 1 : 0) ];
    const loopLengthMat = [ nmap(N, (_, i) => i === state.loopLength ? 1 : 0) ];
    const noteLengthMat = [ nmap(N, (_, i) => i === state.noteLength ? 1 : 0) ];
    const sceneMat = [ nmap(N, (_, i) => i === state.scene ? 1 : 0) ];
    const matrix = pluck2D(this.props.matrix, track, state.scene);
    const ctrlColor = `${ DEFAULT_COLOR };${ TRACK_COLORS[track] }`;

    return (
      <div>
        <div>
          <h2>PITCH SHIFT:</h2>
          <MatrixCtrl data={ pitchShiftMat } color={ ctrlColor } onCellClick={ this.updateState("pitchShift") } />
        </div>
        <div>
          <h2>LOOP LENGTH:</h2>
          <MatrixCtrl data={ loopLengthMat } color={ ctrlColor } onCellClick={ this.updateState("loopLength") } />
        </div>
        <div>
          <h2>NOTE LENGTH:</h2>
          <MatrixCtrl data={ noteLengthMat } color={ ctrlColor } onCellClick={ this.updateState("noteLength") } />
        </div>
        <div>
          <h2>SCENE:</h2>
          <MatrixCtrl data={ sceneMat } color={ ctrlColor } onCellClick={ this.updateState("scene") } />
        </div>
        <div>
          <h2>MATRIX:</h2>
          <MatrixCtrl data={ matrix } color={ ctrlColor } onCellClick={ this.updateMatrix() } />
        </div>
      </div>
    );
  }
}

function to3DIndex(track, scene, row, col) {
  switch (track) {
  case 0: return [ scene, row, col];
  case 1: return [ col, scene, row ];
  case 2: return [ row, col, scene ];
  }
}

module.exports = TrackCtrl;
