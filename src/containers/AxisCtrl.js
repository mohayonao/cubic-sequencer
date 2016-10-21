import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LabeledElement from "../components/LabeledElement";
import MatrixCtrl from "../components/MatrixCtrl";
import { EMPTY_COLOR, TRACK_COLORS } from "../constants";

class AxisCtrl extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    track  : PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.track !== nextProps.track;
  }

  render() {
    const { actions, track } = this.props;
    const matrix = [ TRACK_COLORS.map((_, i) => track === i ? (i + 1) : 0) ];
    const colors = `${ EMPTY_COLOR };${ TRACK_COLORS.join(";") }`;

    return (
      <LabeledElement label="axis">
        <MatrixCtrl data={ matrix } colors={ colors } onClick={(row, col) => {
          actions.changeTrack(col);
        }}/>
      </LabeledElement>
    );
  }
}

export default connect(state => state.master)(AxisCtrl);
