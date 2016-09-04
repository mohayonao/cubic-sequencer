"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const redux = require("redux");
const { Provider } = require("react-redux");
const CubeSeqCtrl = require("./components/CubeSeqCtrl");
const Viewer = require("./viewer/Viewer");
const Sequencer = require("./sequencer/Sequencer");
const app = require("./reducers");

window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.addEventListener("DOMContentLoaded", () => {
  const store = redux.createStore(app);
  const audioContext = new AudioContext();
  const sequencer = new Sequencer(audioContext);
  const viewer = new Viewer(document.getElementById("viewer"));

  function updateState() {
    const state = store.getState();

    sequencer.update(state);
    viewer.update(state);
  }

  function animate() {
    viewer.render(audioContext.currentTime);
    requestAnimationFrame(animate);
  }

  sequencer.on("tick", (e) => {
    viewer.sched(e);
  });

  store.subscribe(updateState);

  updateState();
  requestAnimationFrame(animate);

  ReactDom.render(<Provider store={ store }><CubeSeqCtrl /></Provider>, document.getElementById("app"));
});
