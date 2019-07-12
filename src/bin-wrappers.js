"use strict";

const path = require("path");
const BinWrappers = require("bin-wrapper");
const pkg = require("../package.json");

const dest =
  typeof process.env.MOZJPEG_COMPILATION_DEST !== "undefined"
    ? process.env.MOZJPEG_COMPILATION_DEST
    : path.join(__dirname, "../vendor");
const isWin = process.platform === "win32";

const url = `https://raw.githubusercontent.com/itgalaxy/mozjpeg-binaries/v${pkg.version}/vendor/`;

module.exports = {
  cjpeg: new BinWrappers()
    .src(`${url}linux/cjpeg`, "linux")
    .src(`${url}macos/cjpeg`, "darwin")
    .src(`${url}windows/cjpeg.exe`, "win32")
    .dest(dest)
    .use(isWin ? "cjpeg.exe" : "cjpeg"),

  djpeg: new BinWrappers()
    .src(`${url}linux/djpeg`, "linux")
    .src(`${url}macos/djpeg`, "darwin")
    .src(`${url}windows/djpeg.exe`, "win32")
    .dest(dest)
    .use(isWin ? "djpeg.exe" : "djpeg"),

  jpegtran: new BinWrappers()
    .src(`${url}linux/jpegtran`, "linux")
    .src(`${url}macos/jpegtran`, "darwin")
    .src(`${url}windows/jpegtran.exe`, "win32")
    .dest(dest)
    .use(isWin ? "jpegtran.exe" : "jpegtran"),

  rdjpgcom: new BinWrappers()
    .src(`${url}linux/rdjpgcom`, "linux")
    .src(`${url}macos/rdjpgcom`, "darwin")
    .src(`${url}windows/rdjpgcom.exe`, "win32")
    .dest(dest)
    .use(isWin ? "rdjpgcom.exe" : "rdjpgcom"),

  tjbench: new BinWrappers()
    .src(`${url}linux/tjbench`, "linux")
    .src(`${url}macos/tjbench`, "darwin")
    .src(`${url}windows/tjbench.exe`, "win32")
    .dest(dest)
    .use(isWin ? "tjbench.exe" : "tjbench"),

  wrjpgcom: new BinWrappers()
    .src(`${url}linux/wrjpgcom`, "linux")
    .src(`${url}macos/wrjpgcom`, "darwin")
    .src(`${url}windows/wrjpgcom.exe`, "win32")
    .dest(dest)
    .use(isWin ? "wrjpgcom.exe" : "wrjpgcom")
};
