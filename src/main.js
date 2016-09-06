"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const redux = require("redux");
const { Provider } = require("react-redux");
const audioTimeline = require("./middlewares/audio-timeline");
const App = require("./containers/App");
const Viewer = require("./viewer/Viewer");
const Sequencer = require("./audio/Sequencer");
const reducers = require("./reducers");
const actions = require("./actions");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext);
  const timeline = audioTimeline(audioContext);
  const viewer = new Viewer(document.getElementById("viewer"));
  const store = redux.createStore(reducers, redux.applyMiddleware(timeline));
  const initState = store.getState();

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
  store.subscribe(() => {
    const state = store.getState();
    sequencer.setState(state);
    viewer.setState(state);
  });

  requestAnimationFrame(animate);

  ReactDom.render(<Provider store={ store }><App /></Provider>, document.getElementById("app"));
});
