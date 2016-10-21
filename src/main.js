import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { Provider } from "react-redux";
import requestMIDIAccess from "request-midi-access";
import audioTimeline from "./middlewares/audio-timeline";
import App from "./containers/App";
import Viewer from "./viewer/Viewer";
import Sequencer from "./audio/Sequencer";
import LaunchPadMK2 from "./midi/LaunchPadMK2";
import reducers from "./reducers";
import * as actionCreators from "./actions";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const audioContext = new AudioContext();
  const timeline = audioTimeline(audioContext);
  const store = createStore(reducers, applyMiddleware(timeline));
  const actions = bindActionCreators(actionCreators, store.dispatch);
  const viewer = new Viewer(document.getElementById("viewer"), actions);
  const sequencer = new Sequencer(audioContext, actions);
  const midiDevice = new LaunchPadMK2(actions);
  const initState = store.getState();

  requestMIDIAccess().then((access) => {
    midiDevice.initialize(access);
    midiDevice.setState(initState);
  });

  sequencer.setState(initState);
  viewer.setState(initState);

  function animate() {
    timeline.process();
    viewer.render();
    requestAnimationFrame(animate);
  }

  // sequencer.on("tick", ({ playbackTime, track, index }) => {
  //   // store.dispatch(actions.tickSequencer(playbackTime, track, index));
  // });
  // midiDevice.on("dispatch", (e) => {
  //   // store.dispatch(e);
  // });
  store.subscribe(() => {
    const state = store.getState();
    sequencer.setState(state);
    viewer.setState(state);
    midiDevice.setState(state);
  });

  requestAnimationFrame(animate);

  ReactDom.render(
    <Provider store={ store }>
      <App actions={ actions } />
    </Provider>
  , document.getElementById("app"));
});
