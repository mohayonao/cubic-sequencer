import React, { Component, PropTypes } from "react";

export default class LabeledElement extends Component {
  static propTypes = {
    label   : PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  render() {
    const { label, children } = this.props;

    return (
      <div>
        <h2>{ label.toUpperCase() }:</h2>
        { children }
      </div>
    );
  }
}
