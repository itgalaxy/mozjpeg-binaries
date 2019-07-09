"use strict";

const path = require("path");
const paths = require("../src");

const isWin = process.platform === "win32";

describe("paths", () => {
  it("should be exported", () => {
    expect(path.basename(paths.cjpeg)).toBe(isWin ? "cjpeg.exe" : "cjpeg");
    expect(path.basename(paths.djpeg)).toBe(isWin ? "djpeg.exe" : "djpeg");
    expect(path.basename(paths.jpegtran)).toBe(
      isWin ? "jpegtran.exe" : "jpegtran"
    );
    expect(path.basename(paths.rdjpgcom)).toBe(
      isWin ? "rdjpgcom.exe" : "rdjpgcom"
    );
    expect(path.basename(paths.tjbench)).toBe(
      isWin ? "tjbench.exe" : "tjbench"
    );
    expect(path.basename(paths.wrjpgcom)).toBe(
      isWin ? "wrjpgcom.exe" : "wrjpgcom"
    );
  });
});
