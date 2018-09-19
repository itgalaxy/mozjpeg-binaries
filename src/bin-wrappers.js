"use strict";

const path = require("path");
const BinWrappers = require("bin-wrapper");
const pkg = require("../package.json");

const dest = path.join(__dirname, "../vendor");
const isWin = process.platform === "win32";

const url = `https://raw.githubusercontent.com/itgalaxy/mozjpeg-binaries/v${
  pkg.version
}/vendor/`;

module.exports = {
  cjpeg: new BinWrappers()
    .src(`${url}linux/cjpeg`, "linux")
    .src(`${url}linux/libjpeg.a`, "linux")
    .src(`${url}linux/libjpeg.la`, "linux")
    .src(`${url}linux/libturbojpeg.a`, "linux")
    .src(`${url}linux/libturbojpeg.la`, "linux")
    .dest(dest)
    .use(isWin ? "cjpeg.exe" : "cjpeg"),

  djpeg: new BinWrappers()
    .src(`${url}linux/djpeg`, "linux")
    .dest(dest)
    .use(isWin ? "djpeg.exe" : "djpeg"),

  jpegtran: new BinWrappers()
    .src(`${url}linux/jpegtran`, "linux")
    .dest(dest)
    .use(isWin ? "jpegtran.exe" : "jpegtran"),

  rdjpgcom: new BinWrappers()
    .src(`${url}linux/rdjpgcom`, "linux")
    .dest(dest)
    .use(isWin ? "rdjpgcom.exe" : "rdjpgcom"),

  tjbench: new BinWrappers()
    .src(`${url}linux/tjbench`, "linux")
    .dest(dest)
    .use(isWin ? "tjbench.exe" : "tjbench"),

  wrjpgcom: new BinWrappers()
    .src(`${url}linux/wrjpgcom`, "linux")
    .dest(dest)
    .use(isWin ? "wrjpgcom.exe" : "wrjpgcom")
};
