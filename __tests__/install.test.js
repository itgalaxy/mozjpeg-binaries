"use strict";

const path = require("path");
const tempy = require("tempy");
const execa = require("execa");
const compareSize = require("compare-size");
const binaries = require("../src");

// eslint-disable-next-line unicorn/prefer-exponentiation-operator
const infinityTimeout = Math.pow(2, 31) - 1;

describe("install", () => {
  it(
    "should build the mozjpeg binaries and minify",
    async () => {
      const result = await execa.node(
        path.join(__dirname, "../src/install.js")
      );

      expect(result.exitCode).toBe(0);

      const tmp = tempy.directory();
      const src = path.join(__dirname, "fixtures/test.jpg");
      const dest = path.join(tmp, "test.jpg");
      const args = ["-outfile", dest, src];
      const binResult = await execa(binaries.cjpeg, args);

      expect(binResult.exitCode).toBe(0);

      const compareResult = await compareSize(src, dest);

      expect(compareResult[dest]).toBeLessThan(compareResult[src]);
    },
    infinityTimeout
  );
});
