import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LabeledElement from "../components/LabeledElement";
import MatrixCtrl from "../components/MatrixCtrl";
import { BPM_MAP, EMPTY_COLOR, MASTER_COLOR } from "../constants";

class BPMCtrl extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    bpm    : PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.bpm !== nextProps.bpm;
  }

  render() {
    const { actions, bpm } = this.props;
    const matrix = [ BPM_MAP.map((_, i) => i === bpm ? 1 : 0) ];
    const colors = `${ EMPTY_COLOR };${ MASTER_COLOR }`;

    return (
      <LabeledElement label="bpm">
        <MatrixCtrl data={ matrix } colors={ colors } onClick={(row, col) => {
          actions.changeBPM(col);
        }}/>
      </LabeledElement>
    );
  }
}

export default connect(state => state.master)(BPMCtrl);
