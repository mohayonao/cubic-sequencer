"use strict";

const React = require("react");

class MatrixCtrl extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    color: React.PropTypes.string,
    onCellClick: React.PropTypes.func,
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

class MatrixCtrlRow extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    row: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
    onCellClick: React.PropTypes.func,
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

class MatrixCtrlCell extends React.Component {
  static propTypes = {
    data: React.PropTypes.number.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
    onClick: React.PropTypes.func,
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

module.exports = MatrixCtrl;
