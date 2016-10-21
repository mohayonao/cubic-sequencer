import React, { Component, PropTypes } from "react";
import MatrixCtrlRow from "./MatrixCtrlRow";

export default class MatrixCtrl extends Component {
  static propTypes = {
    data   : PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    colors : PropTypes.string,
    onClick: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data || this.props.colors !== nextProps.colors;
  }

  onClick(row, col, data) {
    if (this.props.onClick) {
      this.props.onClick(row, col, data);
    }
  }

  render() {
    const { data, colors } = this.props;
    const elems = data.map((rowData, row) => {
      return (
        <MatrixCtrlRow key={ row } data={ rowData } colors={ colors } onClick={(...args) => {
          this.onClick(row, ...args);
        }}/>
      );
    });

    return (<div className="matrix-ctrl">{ elems }</div>);
  }
}
