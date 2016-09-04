"use strict";

const events = require("events");
const nmap = require("nmap");
const WebAudioScheduler = require("web-audio-scheduler");
const WorkerTimer = require("worker-timer");
const Track = require("./Track");
const sounds = require("./sounds");
const createReverbBuffer = require("./createReverbBuffer");
const pluck2D = require("../utils/pluck2D");
const computeDurationFromBPM = require("../utils/computeDurationFromBPM");

const { N } = require("../consts");

const BPM_MAP = [ 120, 140, 160 ];

class Sequencer extends events.EventEmitter {
  constructor(audioContext) {
    super();

    this.bpm = 140;
    this.audioContext = audioContext;

    this.convolver = this.audioContext.createConvolver();
    this.convolver.buffer = createReverbBuffer(this.audioContext);
    this.convolver.connect(this.audioContext.destination);

    this.sched = new WebAudioScheduler({ context: this.audioContext, timerAPI: WorkerTimer });
    this.tracks = nmap(3, (_, i) => new Track(this.convolver, sounds[i]));

    this.tracks.forEach((track, i) => {
      track.on("tick", (data) => {
        this.emit("tick", { ...data, track: i });
      });
    });

    this.sequence = this.sequence.bind(this);
  }

  update(state) {
    this.bpm = BPM_MAP[state.master.bpm];

    this.tracks.forEach((track, i) => {
      const _state = state.track.state[i];
      const matrix = rotate(pluck2D(state.matrix, i, _state.scene));

      track.update({ ..._state, matrix, bpm: this.bpm });
    });

    this.play(state.master.play);
  }

  play(value = 1) {
    if (this.sched.state === "suspended" && value === 1) {
      this.sched.start(this.sequence);
    }
    if (this.sched.state === "running" && value === 0) {
      this.sched.stop(true);
    }
  }

  sequence(e) {
    const t0 = e.playbackTime;
    const t1 = t0 + computeDurationFromBPM(this.bpm, 32);

    this.tracks.forEach((track) => {
      track.sequence(e);
    });

    this.sched.insert(t1, this.sequence);
  }
}

function rotate(matrix) {
  return nmap(N, (_, i) => nmap(N, (_, j) => matrix[j][i]));
}

module.exports = Sequencer;
