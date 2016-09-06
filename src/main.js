"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const redux = require("redux");
const { Provider } = require("react-redux");
const requestMIDIAccess = require("request-midi-access");
const audioTimeline = require("./middlewares/audio-timeline");
const App = require("./containers/App");
const Viewer = require("./viewer/Viewer");
const Sequencer = require("./audio/Sequencer");
const LaunchPadMK2 = require("./midi/LaunchPadMK2");
const reducers = require("./reducers");
const actions = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext);
  const timeline = audioTimeline(audioContext);
  const viewer = new Viewer(document.getElementById("viewer"));
  const midiDevice = new LaunchPadMK2();
  const store = redux.createStore(reducers, redux.applyMiddleware(timeline));
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

  sequencer.on("tick", ({ playbackTime, track, index }) => {
    store.dispatch(actions.tickSequencer(playbackTime, track, index));
  });
  midiDevice.on("dispatch", (e) => {
    store.dispatch(e);
  });
  store.subscribe(() => {
    const state = store.getState();
    sequencer.setState(state);
    viewer.setState(state);
    midiDevice.setState(state);
  });

  requestAnimationFrame(animate);

  ReactDom.render(<Provider store={ store }><App /></Provider>, document.getElementById("app"));
});
