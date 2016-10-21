import React, { Component, PropTypes } from "react";

export default class MatrixCtrlCol extends Component {
  static propTypes = {
    data   : PropTypes.number.isRequired,
    colors : PropTypes.string,
    onClick: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data || this.props.colors !== nextProps.colors;
  }

  onClick(data) {
    if (this.props.onClick) {
      this.props.onClick(data);
    }
  }

  render() {
    const { data, colors } = this.props;
    const backgroundColor = (colors || "").split(";")[data|0] || "transparent";

    return (
      <span className="matrix-ctrl-col" style={{ backgroundColor }} onClick={() => {
        this.onClick(data);
      }}></span>
    );
  }
}
