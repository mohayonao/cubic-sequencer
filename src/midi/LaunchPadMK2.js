"use strict";

const nmap = require("nmap");
const events = require("events");
const WebMIDIEmitter = require("web-midi-emitter");
const actions = require("../actions");
const { pluck2D } = require("../utils/matrix");
const { N } = require("../constants");

const LED_COLORS = [
  [ 0, 59,  7, 52 ], // R
  [ 0, 35, 23, 16 ], // G
  [ 0, 51, 47, 37 ], // B
];
const STATE_NAMES = [
  "pitchShift", "loopLength", "noteLength"
];

class LaunchPadMK2 extends events.EventEmitter {
  constructor() {
    super();
    this._device = null;
    this._state = null;
    this._trackState = null;
    this._matrix = null;
    this._tick = -1;
    this._masterLED = null;
    this._matrixLED = null;
    this._sceneLED = null;
    this._stateMode = false;
  }

  initialize(access) {
    this._device = new WebMIDIEmitter(access, /^Launchpad/);
    this._device.on("midimessage", ({ data }) => {
      this.recv(...data);
    });
    this._masterLED = nmap(N, () => -1);
    this._matrixLED = nmap(N, () => nmap(N, () => -1));
    this._sceneLED  = nmap(N, () => -1);
  }

  setState(state) {
    if (this._device) {
      this._state = state;
      this._trackState = state.track[this._state.master.track];
      this._matrix = pluck2D(this._state.matrix, this._state.master.track, this._trackState.scene);
      this._tick = this._state.ticks[this._state.master.track];
      this.render();
    }
  }

  recv(st, d1, d2) {
    const action = this.getAction(st, d1, d2);

    if (action) {
      this.emit("dispatch", action);
    } else {
      if (st === 0xb0 && d1 === 0x6c) {
        this._stateMode = d2 ? 1 : 0;
        this.render();
      }
    }
  }

  render() {
    this.renderMasterLED();
    if (this._stateMode) {
      this.renderStateLED();
    } else {
      this.renderMatrixLED();
    }
    this.renderSceneLED();
  }

  renderMasterLED() {
    const states = [
      this._state.master.play ? 62 : 0,
      0,
      0,
      0,
      this._stateMode ? 62 : 0,
      this._state.master.track === 0 ? LED_COLORS[0][2 + this._stateMode] : 0,
      this._state.master.track === 1 ? LED_COLORS[1][2 + this._stateMode] : 0,
      this._state.master.track === 2 ? LED_COLORS[2][2 + this._stateMode] : 0,
    ];
    for (let i = 0; i < N; i++) {
      const ledColor = states[i];
      if (this._masterLED[i] !== ledColor) {
        this._device.send([ 0xb0, 0x68 + i, ledColor ]);
        this._masterLED[i] = ledColor;
      }
    }
  }

  renderMatrixLED() {
    const ledColors = LED_COLORS[this._state.master.track];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const ledColor = ledColors[this._matrix[i][j] * 2 + (j === this._tick ? 1 : 0)];
        if (this._matrixLED[i][j] !== ledColor) {
          this._device.send([ 0x90, toNoteNumber(i, j), ledColor ]);
          this._matrixLED[i][j] = ledColor;
        }
      }
    }
  }

  renderStateLED() {
    const ledColors = LED_COLORS[this._state.master.track];
    const states = STATE_NAMES.map(name => this._trackState[name]);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const ledColor = ledColors[states[i] === j ? 2 : 0];
        if (this._matrixLED[i][j] !== ledColor) {
          this._device.send([ 0x90, toNoteNumber(i, j), ledColor ]);
          this._matrixLED[i][j] = ledColor;
        }
      }
    }
  }

  renderSceneLED() {
    const ledColors = LED_COLORS[this._state.master.track];
    for (let i = 0; i < N; i++) {
      const ledColor = ledColors[this._trackState.scene === i ? 2 : 0];
      if (this._sceneLED[i] !== ledColor) {
        this._device.send([ 0x90, toNoteNumber(N - i - 1, 8), ledColor ]);
        this._sceneLED[i] = ledColor;
      }
    }
  }

  getAction(st, d1, d2) {
    return getAction(this._state.master.track, this._trackState.scene, st, d1, d2);
  }
}

function getAction(track, scene, st, d1, d2) {
  if (st === 0x90 && d2 !== 0) {
    const [ col, row ] = fromNoteNumber(d1);

    // matrix
    if (0 <= col && col <= 7) {
      if (this._stateMode) {
        if (0 <= row && row <= 2) {
          return actions.updateState(track, STATE_NAMES[row], col);
        }
      } else {
        if (0 <= row && row <= 7) {
          return actions.toggleMatrix(...to3DIndex(track, scene, row, col));
        }
      }
    }

    // right button
    if (col === 8) {
      return actions.updateState(track, "scene", 7 - row);
    }
  }

  // top button
  if (st === 0xb0 && d2 !== 0) {
    switch (d1 - 0x68) {
    case 0:
      return actions.togglePlay();
    case 1:
      return actions.random();
    case 2:
      return actions.clear();
    case 3:
      return actions.changeBPM(-1);
    case 5: case 6: case 7:
      return actions.changeTrack(d1 - 0x68 - 5);
    }
  }
}

function fromNoteNumber(value) {
  return [ (value % 10) - 1, 8 - Math.floor(value / 10) ];
}

function toNoteNumber(row, col) {
  return 80 - (row * 10) + (col + 1);
}

function to3DIndex(track, scene, row, col) {
  switch (track) {
  case 0: return [ scene, row, col];
  case 1: return [ col, scene, row ];
  case 2: return [ row, col, scene ];
  }
}

module.exports = LaunchPadMK2;
