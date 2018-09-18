"use strict";

const path = require("path");
const paths = require("../src");

describe("paths", () => {
  it("should be exported", () => {
    expect(path.basename(paths.cjpeg)).toBe("cjpeg");
    expect(path.basename(paths.djpeg)).toBe("djpeg");
    expect(path.basename(paths.jpegtran)).toBe("jpegtran");
    expect(path.basename(paths.rdjpgcom)).toBe("rdjpgcom");
    expect(path.basename(paths.tjbench)).toBe("tjbench");
    expect(path.basename(paths.wrjpgcom)).toBe("wrjpgcom");
  });
});
