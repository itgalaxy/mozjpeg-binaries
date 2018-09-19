"use strict";

const path = require("path");
const BinWrappers = require("bin-wrapper");

const dest = path.join(__dirname, "../vendor");
const isWin = process.platform === "win32";

module.exports = {
  cjpeg: new BinWrappers().dest(dest).use(isWin ? "cjpeg.exe" : "cjpeg"),
  djpeg: new BinWrappers().dest(dest).use(isWin ? "djpeg.exe" : "djpeg"),
  jpegtran: new BinWrappers()
    .dest(dest)
    .use(isWin ? "jpegtran.exe" : "jpegtran"),
  rdjpgcom: new BinWrappers()
    .dest(dest)
    .use(isWin ? "rdjpgcom.exe" : "rdjpgcom"),
  tjbench: new BinWrappers().dest(dest).use(isWin ? "tjbench.exe" : "tjbench"),
  wrjpgcom: new BinWrappers()
    .dest(dest)
    .use(isWin ? "wrjpgcom.exe" : "wrjpgcom")
};
