"use strict";

const binCheck = require("bin-check");
const binWrappers = require("../src/bin-wrappers");

describe("bin wrapper instances", () => {
  it("should work", () =>
    Promise.all([
      expect(binCheck(binWrappers.cjpeg.path(), ["-version"])).resolves.toBe(
        true
      ),
      expect(binCheck(binWrappers.djpeg.path(), ["-version"])).resolves.toBe(
        true
      ),
      expect(binCheck(binWrappers.jpegtran.path(), ["-version"])).resolves.toBe(
        true
      ),
      expect(binCheck(binWrappers.rdjpgcom.path(), ["-help"])).rejects.toThrow(
        "rdjpgcom displays any textual comments in a JPEG file."
      ),
      expect(
        binCheck(binWrappers.tjbench.path(), ["-version"])
      ).rejects.toThrow("tjbench"),
      expect(
        binCheck(binWrappers.wrjpgcom.path(), ["-version"])
      ).rejects.toThrow("wrjpgcom inserts a textual comment in a JPEG file.")
    ]));
});
