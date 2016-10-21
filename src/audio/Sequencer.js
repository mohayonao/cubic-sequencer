import nmap from "nmap";
import WebAudioScheduler from "web-audio-scheduler";
import WorkerTimer from "worker-timer";
import Track from "./Track";
import sounds from "./sounds";
import createReverbBuffer from "./utils/createReverbBuffer";
import startWebAudioAPI from "./utils/startWebAudioAPI";
import { computeDurationFromBPM } from "./utils";
import { BPM_MAP } from "../constants";

export default class Sequencer {
  constructor(audioContext, actions) {
    this.bpm = 140;
    this.audioContext = audioContext;
    this.actions = actions;

    this.convolver = this.audioContext.createConvolver();
    this.convolver.buffer = createReverbBuffer(this.audioContext);
    this.convolver.connect(this.audioContext.destination);

    this.sched = new WebAudioScheduler({ context: this.audioContext, timerAPI: WorkerTimer });
    this.tracks = nmap(3, (_, i) => new Track(this.convolver, sounds[i]));

    this.tracks.forEach((track, i) => {
      track.on("tick", ({ playbackTime, index }) => {
        this.actions.tickSequencer(playbackTime, i, index);
      });
    });

    this.sequence = this.sequence.bind(this);
  }

  setState(state) {
    this.bpm = BPM_MAP[state.master.bpm];

    this.tracks.forEach((track, i) => {
      const trackState = state.track[i];
      const matrix = state.matrix.axis[i][trackState.scene];

      track.setState({ ...trackState, matrix, bpm: this.bpm });
    });

    this.play(state.master.play);
  }

  play(value = 1) {
    startWebAudioAPI(this.audioContext);
    if (this.sched.state === "suspended" && value === 1) {
      this.sched.start(this.sequence);
    }
    if (this.sched.state === "running" && value === 0) {
      this.sched.stop();
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
