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
const { DEFAULT_COLOR, TRACK_COLORS } = require("../consts");

class MasterCtrl extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    play: React.PropTypes.number.isRequired,
    bpm: React.PropTypes.number.isRequired,
    track: React.PropTypes.number.isRequired
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

  render() {
    const { play, bpm, track } = this.props;
    const playMat = [ [ play, 0, 0 ] ] ;
    const bpmMat = [ nmap(3, (_, i) => i === bpm ? 1 : 0) ];
    const axisMat = [ TRACK_COLORS.map((_, i) => track === i ? (i + 1) : 0) ];
    const axisColor = `${ DEFAULT_COLOR };${ TRACK_COLORS.join(";") }`;

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
      </div>
    );
  }
}

module.exports = connect(state => state.master)(MasterCtrl);
