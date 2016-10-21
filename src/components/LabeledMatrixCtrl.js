import React, { Component, PropTypes } from "react";
import MatrixCtrl from "./MatrixCtrl";

export default class LabeledMatrixCtrl extends Component {
  static propTypes = {
    label : PropTypes.string.isRequired,
    data  : PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
    color : PropTypes.string,
    action: PropTypes.func,
  };

  render() {
    const { label, data, color, action } = this.props;
    return (
      <div>
        <h2>{ label.toUpperCase() }:</h2>
        <MatrixCtrl data={ data } color={ color } onCellClick={ action } />
      </div>
    );
  }
}
