"use strict";

const React = require("react");
const MasterCtrl = require("./MasterCtrl");
const TrackCtrl = require("./TrackCtrl");

class CubeSeqCtrl extends React.Component {
  render() {
    return (
      <div>
        <MasterCtrl />
        <TrackCtrl />
      </div>
    );
  }
}

module.exports = CubeSeqCtrl;
