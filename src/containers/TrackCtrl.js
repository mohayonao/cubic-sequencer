import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LabeledElement from "../components/LabeledElement";
import MatrixCtrl from "../components/MatrixCtrl";
import { to3DIndex } from "../utils/matrix";
import { EMPTY_COLOR, TRACK_COLORS } from "../constants";

class TrackCtrl extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    track  : PropTypes.number.isRequired,
    scene  : PropTypes.number.isRequired,
    data   : PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  };

  render() {
    const { actions, track, scene, data } = this.props;
    const matrix = data;
    const colors = `${ EMPTY_COLOR };${ TRACK_COLORS[track] }`;

    return (
      <LabeledElement label="matrix">
        <MatrixCtrl data={ matrix } colors={ colors } onClick={(row, col) => {
          actions.toggleMatrix(...to3DIndex(track, scene, row, col));
        }}/>
      </LabeledElement>
    );
  }
}

export default connect((state) => {
  const track = state.master.track;
  const scene = state.track[track].scene;
  const data = state.matrix.axis[track][scene]

  return { track, scene, data };
})(TrackCtrl);
