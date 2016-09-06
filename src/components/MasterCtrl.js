"use strict";

const nmap = require("nmap");
const React = require("react");
const MatrixCtrl = require("./MatrixCtrl");
const { DEFAULT_COLOR, TRACK_COLORS } = require("../constants");

class MasterCtrl extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    master : React.PropTypes.object.isRequired,
  };

  ctrlApp() {
    const { actions } = this.props;
    const actionList = [ actions.togglePlay, actions.random, actions.clear ];
    return (e) => {
      actionList[e.col]();
    };
  }

  changeBPM() {
    const { actions } = this.props;
    return (e) => {
      actions.changeBPM(e.col);
    };
  }

  changeTrack() {
    const { actions } = this.props;
    return (e) => {
      actions.changeTrack(e.col);
    };
  }

  render() {
    const { master } = this.props;
    const playMat = [ [ master.play, 0, 0 ] ] ;
    const bpmMat = [ nmap(3, (_, i) => i === master.bpm ? 1 : 0) ];
    const axisMat = [ TRACK_COLORS.map((_, i) => master.track === i ? (i + 1) : 0) ];
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

module.exports = MasterCtrl;
