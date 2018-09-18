"use strict";

const path = require("path");
const BinWrapper = require("bin-wrapper");
const pkg = require("../package.json");

const dest = path.join(__dirname, "../vendor");
const isWin = process.platform === "win32";
const url = `https://raw.githubusercontent.com/itgalaxy/mozjpeg-binaries/v${
  pkg.version
}/vendor/`;

module.exports = {
  cjpeg: new BinWrapper()
    .src(`${url}linux/cjpeg`, "linux")
    .dest(dest)
    .use(isWin ? "cjpeg.exe" : "cjpeg"),
  djpeg: new BinWrapper()
    .src(`${url}linux/djpeg`, "linux")
    .dest(dest)
    .use(isWin ? "djpeg.exe" : "djpeg"),
  jpegtran: new BinWrapper()
    .src(`${url}linux/jpegtran`, "linux")
    .dest(dest)
    .use(isWin ? "jpegtran.exe" : "jpegtran"),
  rdjpgcom: new BinWrapper()
    .src(`${url}linux/rdjpgcom`, "linux")
    .dest(dest)
    .use(isWin ? "rdjpgcom.exe" : "rdjpgcom"),
  tjbench: new BinWrapper()
    .src(`${url}linux/tjbench`, "linux")
    .dest(dest)
    .use(isWin ? "tjbench.exe" : "tjbench"),
  wrjpgcom: new BinWrapper()
    .src(`${url}linux/wrjpgcom`, "linux")
    .dest(dest)
    .use(isWin ? "wrjpgcom.exe" : "wrjpgcom")
};
