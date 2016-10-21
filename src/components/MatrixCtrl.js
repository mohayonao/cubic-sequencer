import React, { Component, PropTypes } from "react";

export default class MatrixCtrl extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    color: PropTypes.string,
    onCellClick: PropTypes.func,
  };

  render() {
    const rows = this.props.data.map((data, i) => {
      return (<MatrixCtrlRow key={ i } row={ i } data={ data } color={ this.props.color } onCellClick={ this.props.onCellClick } />);
    });

    return (
      <div className="matrix-ctrl">{ rows }</div>
    );
  }
}

class MatrixCtrlRow extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    row: PropTypes.number.isRequired,
    color: PropTypes.string,
    onCellClick: PropTypes.func,
  };

  render() {
    const row = this.props.row;
    const cols = this.props.data.map((data, i) => {
      return (<MatrixCtrlCell key={ i } row={ row } col={ i } color={ this.props.color } data={ data } onClick={ this.props.onCellClick } />);
    });

    return (
      <div>{ cols }</div>
    );
  }
}

class MatrixCtrlCell extends Component {
  static propTypes = {
    data: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    color: PropTypes.string,
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
      <span style={ style } onClick={ this.onClick.bind(this) }></span>
    );
  }
}
