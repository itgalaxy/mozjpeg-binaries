"use strict";

const path = require("path");
const fs = require("fs");

describe("package binaries", () => {
  it("should exist", () => {
    /* eslint-disable no-sync */
    expect(fs.existsSync(path.join(__dirname, "../bin/cjpeg.js"))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, "../bin/djpeg.js"))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, "../bin/jpegtran.js"))).toBe(
      true
    );
    expect(fs.existsSync(path.join(__dirname, "../bin/rdjpgcom.js"))).toBe(
      true
    );
    expect(fs.existsSync(path.join(__dirname, "../bin/tjbench.js"))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, "../bin/wrjpgcom.js"))).toBe(
      true
    );
    /* eslint-enable no-sync */
  });
});
