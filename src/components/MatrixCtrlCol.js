import React, { Component, PropTypes } from "react";

export default class MatrixCtrlCol extends Component {
  static propTypes = {
    data   : PropTypes.number.isRequired,
    row    : PropTypes.number.isRequired,
    col    : PropTypes.number.isRequired,
    color  : PropTypes.string,
    onClick: PropTypes.func,
  };

  onClick() {
    if (this.props.onClick) {
      this.props.onClick({
        row: this.props.row,
        col: this.props.col,
        data: this.props.data,
      });
    }
  }

  render() {
    const colors = (this.props.color || "").split(";");
    const style = {
      backgroundColor: colors[ Math.floor(this.props.data) ] || "transparent",
    };

    return (
      <span className="matrix-ctrl-col" style={ style } onClick={ this.onClick.bind(this) }></span>
    );
  }
}
