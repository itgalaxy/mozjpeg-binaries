"use strict";

const binWrappers = require("./bin-wrappers");

module.exports = {
  cjpeg: binWrappers.cjpeg.path(),
  djpeg: binWrappers.djpeg.path(),
  jpegtran: binWrappers.jpegtran.path(),
  rdjpgcom: binWrappers.rdjpgcom.path(),
  tjbench: binWrappers.tjbench.path(),
  wrjpgcom: binWrappers.wrjpgcom.path()
};
