"use strict";

const path = require("path");
const BinWrapper = require("bin-wrapper");

const dest = path.join(__dirname, "../vendor");
const isWin = process.platform === "win32";

module.exports = {
  cjpeg: new BinWrapper().dest(dest).use(isWin ? "cjpeg.exe" : "cjpeg"),
  djpeg: new BinWrapper().dest(dest).use(isWin ? "djpeg.exe" : "djpeg"),
  jpegtran: new BinWrapper()
    .dest(dest)
    .use(isWin ? "jpegtran.exe" : "jpegtran"),
  rdjpgcom: new BinWrapper()
    .dest(dest)
    .use(isWin ? "rdjpgcom.exe" : "rdjpgcom"),
  tjbench: new BinWrapper().dest(dest).use(isWin ? "tjbench.exe" : "tjbench"),
  wrjpgcom: new BinWrapper().dest(dest).use(isWin ? "wrjpgcom.exe" : "wrjpgcom")
};
