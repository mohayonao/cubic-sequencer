import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import nmap from "nmap";
import LabeledElement from "../components/LabeledElement";
import MatrixCtrl from "../components/MatrixCtrl";
import { N, EMPTY_COLOR, TRACK_COLORS } from "../constants";

class PitchShiftCtrl extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    track  : PropTypes.number.isRequired,
    data   : PropTypes.number.isRequired,
  };

  render() {
    const { actions, track, data } = this.props;
    const matrix = [ nmap(N, (_, i) => i === data ? 1 : 0) ];
    const colors = `${ EMPTY_COLOR };${ TRACK_COLORS[track] }`;

    return (
      <LabeledElement label="pitch shift">
        <MatrixCtrl data={ matrix } colors={ colors } onClick={(row, col) => {
          actions.updateState(track, "pitchShift", col);
        }}/>
      </LabeledElement>
    );
  }
}

export default connect((state) => {
  return {
    track: state.master.track,
    data : state.track[state.master.track].pitchShift,
  };
})(PitchShiftCtrl);
