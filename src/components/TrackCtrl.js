"use strict";

const React = require("react");
const { connect } = require("react-redux");
const nmap = require("nmap");
const MatrixCtrl = require("./MatrixCtrl");
const updateState = require("../actions/updateState");
const toggleMatrix = require("../actions/toggleMatrix");
const pluck2D = require("../utils/pluck2D");
const { N, DEFAULT_COLOR, TRACK_COLORS } = require("../consts");

class TrackCtrl extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    matrix: React.PropTypes.array.isRequired,
    track: React.PropTypes.number.isRequired,
    pitchShift: React.PropTypes.number.isRequired,
    loopLength: React.PropTypes.number.isRequired,
    noteLength: React.PropTypes.number.isRequired,
    scene: React.PropTypes.number.isRequired,
  };

  updateState(dataType) {
    return (e) => {
      const track = this.props.track;
      const dataValue = e.col;

      this.props.dispatch(updateState(track, dataType, dataValue));
    };
  }

  updateMatrix() {
    return (e) => {
      const track = this.props.track;
      const scene = this.props.scene;

      this.props.dispatch(toggleMatrix(...to3DIndex(track, scene, e.row, e.col)));
    };
  }

  render() {
    const { track, pitchShift, loopLength, noteLength, scene } = this.props;
    const pitchShiftMat = [ nmap(N, (_, i) => i === pitchShift ? 1 : 0) ];
    const loopLengthMat = [ nmap(N, (_, i) => i === loopLength ? 1 : 0) ];
    const noteLengthMat = [ nmap(N, (_, i) => i === noteLength ? 1 : 0) ];
    const sceneMat = [ nmap(N, (_, i) => i === scene ? 1 : 0) ];
    const matrix = pluck2D(this.props.matrix, track, scene);
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

module.exports = connect((state) => {
  return { track: state.master.track, ...state.track[state.master.track], matrix: state.matrix };
})(TrackCtrl);
