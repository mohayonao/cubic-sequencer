"use strict";

const nmap = require("nmap");
const WebMIDIEmitter = require("web-midi-emitter");
const { toNoteNumber } = require("./utils");
const execAction = require("./execAction");
const { N } = require("../constants");

const LED_COLORS = [
  [ 0,  71,   7,   4,   5 ], // R
  [ 0,  71,  31,  28,  29 ], // G
  [ 0,  71,  47,  44,  45 ], // B
];
const STATE_NAMES = [
  "pitchShift", "loopLength", "noteLength"
];

class LaunchPadMK2 {
  constructor(actions) {
    this.actions = actions;
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
    if (this._device && this._device.input) {
      this._state = state;
      this._trackState = state.track[this._state.master.track];
      this._matrix = this._state.matrix.axis[this._state.master.track][this._trackState.scene];
      this._tick = this._state.ticks[this._state.master.track];
      this.render();
    }
  }

  recv(st, d1, d2) {
    if (!this.execAction(st, d1, d2)) {
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
      this._state.master.play ? 12 : 0,
      0,
      0,
      0,
      this._stateMode ? 12 : 0,
      this._state.master.track === 0 ? LED_COLORS[0][4 - this._stateMode] : 0,
      this._state.master.track === 1 ? LED_COLORS[1][4 - this._stateMode] : 0,
      this._state.master.track === 2 ? LED_COLORS[2][4 - this._stateMode] : 0,
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
        const ledColor = ledColors[states[i] === j ? 4 : 0];
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

  execAction(st, d1, d2) {
    return execAction(this.actions, this._state.master.track, this._trackState.scene, st, d1, d2, this._stateMode);
  }
}

module.exports = LaunchPadMK2;
