"use strict";

const binaries = require("./bin-wrapper");

module.exports = {
  cjpeg: binaries.cjpeg.path(),
  djpeg: binaries.djpeg.path(),
  jpegtran: binaries.jpegtran.path(),
  rdjpgcom: binaries.rdjpgcom.path(),
  tjbench: binaries.tjbench.path(),
  wrjpgcom: binaries.wrjpgcom.path()
};
