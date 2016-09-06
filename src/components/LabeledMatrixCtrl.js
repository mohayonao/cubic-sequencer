"use strict";

const React = require("react");
const MatrixCtrl = require("./MatrixCtrl");

class LabeledMatrixCtrl extends React.Component {
  static propTypes = {
    label : React.PropTypes.string.isRequired,
    data  : React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
    color : React.PropTypes.string,
    action: React.PropTypes.func,
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

module.exports = LabeledMatrixCtrl;
