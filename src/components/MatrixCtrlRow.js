import React, { Component, PropTypes } from "react";
import MatrixCtrlCol from "./MatrixCtrlCol";

export default class MatrixCtrlRow extends Component {
  static propTypes = {
    data   : PropTypes.arrayOf(PropTypes.number).isRequired,
    colors : PropTypes.string,
    onClick: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data || this.props.colors !== nextProps.colors;
  }

  onClick(col, data) {
    if (this.props.onClick) {
      this.props.onClick(col, data);
    }
  }

  render() {
    const { data, colors } = this.props;
    const elems = data.map((colData, col) => {
      return (
        <MatrixCtrlCol key={ col } colors={ colors } data={ colData } onClick={(...args) => {
          this.onClick(col, ...args);
        }}/>
      );
    });

    return (<div className="matrix-ctrl-row">{ elems }</div>);
  }
}
