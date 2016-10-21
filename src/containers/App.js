import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import MasterCtrl from "../components/MasterCtrl";
import TrackCtrl from "../components/TrackCtrl";

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    master : PropTypes.object.isRequired,
    matrix : PropTypes.object.isRequired,
    track  : PropTypes.array.isRequired,
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

export default connect(state => state)(App);
