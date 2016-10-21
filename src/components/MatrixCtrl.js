import React, { Component, PropTypes } from "react";
import MatrixCtrlRow from "./MatrixCtrlRow";

export default class MatrixCtrl extends Component {
  static propTypes = {
    data       : PropTypes.array.isRequired,
    color      : PropTypes.string,
    onCellClick: PropTypes.func,
  };

  render() {
    const { data, color, onCellClick } = this.props;
    const elems = data.map((data, i) => {
      return (
        <MatrixCtrlRow key={ i } row={ i } data={ data } color={ color } onCellClick={ onCellClick }/>
      );
    });

    return (<div className="matrix-ctrl">{ elems }</div>);
  }
}
