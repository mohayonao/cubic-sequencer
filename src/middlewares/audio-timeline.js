"use strict";

const ACTION_TYPE_EMIT = "@@audio-timeline/EMIT";

function audioTimeline(audioContext) {
  let _scheds = [];
  let _store = null;

  const middleware = (store) => {
    _store = store;
    return (next) => (action) => {
      if (action.type === ACTION_TYPE_EMIT) {
        return next(action.action);
      }
      if (typeof action.playbackTime !== "number") {
        return next(action);
      }
      _scheds.push(action);
    };
  };

  middleware.process = () => {
    const pendingScheds = [];
    const time = audioContext.currentTime;

    for (let i = 0, imax = _scheds.length; i < imax; i++) {
      const action = _scheds[i];

      if (action.playbackTime < time) {
        _store.dispatch({ type: ACTION_TYPE_EMIT, action });
      } else {
        pendingScheds.push(action);
      }
    }

    _scheds = pendingScheds;
  };

  return middleware;
}

module.exports = audioTimeline;
