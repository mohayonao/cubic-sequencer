"use strict";

const React = require("react");
const { connect } = require("react-redux");
const nmap = require("nmap");
const MatrixCtrl = require("./MatrixCtrl");
const togglePlay = require("../actions/togglePlay");
const random = require("../actions/random");
const clear = require("../actions/clear");
const changeBPM = require("../actions/changeBPM");
const changeTrack = require("../actions/changeTrack");
const updateState = require("../actions/updateState");
const toggleMatrix = require("../actions/toggleMatrix");
const pluck2D = require("../utils/pluck2D");
const { N } = require("../consts");

const defaultColor = "#ecf0f1";

@connect(state => state)
class CubeSeqCtrl extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    master: React.PropTypes.object.isRequired,
    matrix: React.PropTypes.object.isRequired,
    track: React.PropTypes.object.isRequired,
  };

  ctrlApp() {
    return (e) => {
      this.props.dispatch([ togglePlay, random, clear ][e.col]());
    };
  }

  changeBPM() {
    return (e) => {
      this.props.dispatch(changeBPM(e.col));
    };
  }

  changeTrack() {
    return (e) => {
      this.props.dispatch(changeTrack(e.col));
    };
  }

  updateState(dataType) {
    return (e) => {
      const track = this.props.track.selected;
      const dataValue = e.col;

      this.props.dispatch(updateState(track, dataType, dataValue));
    };
  }

  updateMatrix() {
    return (e) => {
      const track = this.props.track.selected;
      const scene = this.props.track.state[track].scene;

      this.props.dispatch(toggleMatrix(...to3DIndex(track, scene, e.row, e.col)));
    };
  }

  render() {
    const { master, track } = this.props;
    const state = track.state[track.selected];
    const trackColors = Object.keys(track.state).map(_ => track.state[_].color);
    const playMat = [ [ master.play, 0, 0 ] ] ;
    const bpmMat = [ nmap(3, (_, i) => i === master.bpm ? 1 : 0) ];
    const axisMat = [ trackColors.map((_, i) => track.selected === i ? (i + 1) : 0) ];
    const pitchShiftMat = [ nmap(N, (_, i) => i === state.pitchShift ? 1 : 0) ];
    const loopLengthMat = [ nmap(N, (_, i) => i === state.loopLength ? 1 : 0) ];
    const noteLengthMat = [ nmap(N, (_, i) => i === state.noteLength ? 1 : 0) ];
    const sceneMat = [ nmap(N, (_, i) => i === state.scene ? 1 : 0) ];
    const matrix = pluck2D(this.props.matrix, track.selected, state.scene);
    const axisColor = `${ defaultColor };${ trackColors.join(";") }`;
    const ctrlColor = `${ defaultColor};${ trackColors[track.selected] }`;

    return (
      <div>
        <div>
          <h2>PLY/RND/CLR:</h2>
          <MatrixCtrl data={ playMat } color="#ecf0f1;#f1c40f" onCellClick={ this.ctrlApp() } />
        </div>
        <div>
          <h2>BPM:</h2>
          <MatrixCtrl data={ bpmMat } color="#ecf0f1;#f1c40f" onCellClick={ this.changeBPM() } />
        </div>
        <div>
          <h2>AXIS:</h2>
          <MatrixCtrl data={ axisMat } color={ axisColor } onCellClick={ this.changeTrack() } />
        </div>
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

module.exports = CubeSeqCtrl;
