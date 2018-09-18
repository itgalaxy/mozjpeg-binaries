"use strict";

const binWrapper = require("../src/bin-wrapper");
const binCheck = require("bin-check");

describe("bin wrapper instances", () => {
  it("should work", () =>
    Promise.all([
      expect(binCheck(binWrapper.cjpeg.path(), ["-version"])).resolves.toBe(
        true
      ),
      expect(binCheck(binWrapper.djpeg.path(), ["-version"])).resolves.toBe(
        true
      ),
      expect(binCheck(binWrapper.jpegtran.path(), ["-version"])).resolves.toBe(
        true
      ),
      expect(binCheck(binWrapper.rdjpgcom.path(), ["-help"])).rejects.toThrow(
        "rdjpgcom displays any textual comments in a JPEG file."
      ),
      expect(binCheck(binWrapper.tjbench.path(), ["-version"])).rejects.toThrow(
        "tjbench"
      ),
      expect(
        binCheck(binWrapper.wrjpgcom.path(), ["-version"])
      ).rejects.toThrow("wrjpgcom inserts a textual comment in a JPEG file.")
    ]));
});
