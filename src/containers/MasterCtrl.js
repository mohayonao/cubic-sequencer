import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LabeledElement from "../components/LabeledElement";
import MatrixCtrl from "../components/MatrixCtrl";
import { EMPTY_COLOR, MASTER_COLOR } from "../constants";

class MasterCtrl extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    play   : PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.play !== nextProps.play;
  }

  render() {
    const { actions, play } = this.props;
    const matrix = [ [ play, 0, 0 ] ];
    const colors = `${ EMPTY_COLOR };${ MASTER_COLOR }`;

    return (
      <LabeledElement label="ply/rnd/clr">
        <MatrixCtrl data={ matrix } colors={ colors } onClick={(row, col) => {
          switch (col) {
          case 0:
            return actions.togglePlay();
          case 1:
            return actions.random();
          case 2:
            return actions.clear();
          }
        }}/>
      </LabeledElement>
    );
  }
}

export default connect(state => state.master)(MasterCtrl);
