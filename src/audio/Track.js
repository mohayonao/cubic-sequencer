"use strict";

const events = require("events");
const nmap = require("nmap");
const { computeDurationFromBPM } = require("./utils");
const { N } = require("../constants");

const NOTE_NUMBERS = [ 52, 57, 60, 62, 64, 65, 69, 72, 76, 79, 81, 83, 84, 86, 88  ];
const NOTE_LENGTHS   = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
const NOTE_INTERVALS = [ 32, 16, 12, 8, 7, 6, 5, 4 ];

class Track extends events.EventEmitter {
  constructor(destination, instrument) {
    super();

    this.audioContext = destination.context;
    this.destination = destination;
    this.instrument = instrument;
    this.bpm = 0;
    this.pitchShift = 0;
    this.loopLength = 0;
    this.noteLength = 0;
    this.matrix = nmap(N, () => nmap(N, () => 0));

    this.index = 0;
    this.counter = 0;
  }

  setState(state) {
    this.bpm = state.bpm;
    this.matrix = state.matrix;
    this.pitchShift = state.pitchShift;
    this.loopLength = state.loopLength;
    this.noteLength = state.noteLength;
  }

  sequence(e) {
    const playbackTime = e.playbackTime;

    this.counter -= 1;

    if (0 < this.counter) {
      return;
    }

    const index = this.index % (this.loopLength + 1);
    const counter = NOTE_INTERVALS[this.noteLength];

    this.matrix[index].forEach((value, index) => {
      if (value !== 0) {
        const noteNumber = NOTE_NUMBERS[(N-1) - index + this.pitchShift];
        const duration = computeDurationFromBPM(this.bpm, NOTE_LENGTHS[this.noteLength]);

        this.instrument(this.destination, playbackTime, noteNumber, duration);
      }
    });

    this.index += 1;
    this.counter = counter;

    this.emit("tick", { playbackTime, index });
  }
}

module.exports = Track;
