import React, { Component, PropTypes } from "react";
import MatrixCtrlCol from "./MatrixCtrlCol";

export default class MatrixCtrlRow extends Component {
  static propTypes = {
    data       : PropTypes.array.isRequired,
    row        : PropTypes.number.isRequired,
    color      : PropTypes.string,
    onCellClick: PropTypes.func,
  };

  render() {
    const { data, row, color, onCellClick } = this.props;
    const elems = data.map((data, i) => {
      return (
        <MatrixCtrlCol key={ i } row={ row } col={ i } color={ color } data={ data } onClick={ onCellClick }/>
      );
    });

    return (<div className="matrix-ctrl-row">{ elems }</div>);
  }
}
