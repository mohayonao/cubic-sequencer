"use strict";

const React = require("react");
const { bindActionCreators } = require("redux");
const { connect } = require("react-redux");
const MasterCtrl = require("../components/MasterCtrl");
const TrackCtrl = require("../components/TrackCtrl");
const actions = require("../actions");

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

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
