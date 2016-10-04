"use strict";

const React = require("react");
const { connect } = require("react-redux");
const MasterCtrl = require("../components/MasterCtrl");
const TrackCtrl = require("../components/TrackCtrl");

class App extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    master : React.PropTypes.object.isRequired,
    matrix : React.PropTypes.object.isRequired,
    track  : React.PropTypes.array.isRequired,
  };

  render() {
    const { actions, master, matrix, track } = this.props;
    return (
      <div>
        <MasterCtrl actions={ actions } master={ master } />
        <TrackCtrl actions={ actions } track={ master.track } state={ track[master.track] } matrix={ matrix } />
      </div>
    );
  }
}

module.exports = connect(state => state)(App);
