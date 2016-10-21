import React, { Component, PropTypes } from "react";
import MasterCtrl from "./MasterCtrl";
import BPMCtrl from "./BPMCtrl";
import AxisCtrl from "./AxisCtrl";
import PitchShiftCtrl from "./PitchShiftCtrl";
import LoopLengthCtrl from "./LoopLengthCtrl";
import NoteLengthCtrl from "./NoteLengthCtrl";
import SceneCtrl from "./SceneCtrl";
import TrackCtrl from "./TrackCtrl";

export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <MasterCtrl actions={ this.props.actions }/>
        <BPMCtrl actions={ this.props.actions }/>
        <AxisCtrl actions={ this.props.actions }/>
        <PitchShiftCtrl actions={ this.props.actions }/>
        <LoopLengthCtrl actions={ this.props.actions }/>
        <NoteLengthCtrl actions={ this.props.actions }/>
        <SceneCtrl actions={ this.props.actions }/>
        <TrackCtrl actions={ this.props.actions }/>
      </div>
    );
  }
}
