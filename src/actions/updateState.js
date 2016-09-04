"use strict";

module.exports = (track, dataType, dataValue) => {
  return { type: "UPDATE_STATE", track, dataType, dataValue };
};
