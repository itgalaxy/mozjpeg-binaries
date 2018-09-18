"use strict";

const path = require("path");
const tempy = require("tempy");
const execa = require("execa");
const binaries = require("../src");
const compareSize = require("compare-size");

// eslint-disable-next-line unicorn/prefer-exponentiation-operator
const infinityTimeout = Math.pow(2, 31) - 1;

describe("command", () => {
  it(
    "should rebuild the mozjpeg binaries",
    () =>
      execa("node", [path.join(__dirname, "../src/install.js")]).then(
        result => {
          expect(result.code).toBe(0);

          return result;
        }
      ),
    infinityTimeout
  );

  it("cjpeg should minify a JPG", () => {
    const tmp = tempy.directory();
    const src = path.join(__dirname, "fixtures/test.jpg");
    const dest = path.join(tmp, "test.jpg");
    const args = ["-outfile", dest, src];

    return execa(binaries.cjpeg, args)
      .then(result => {
        expect(result.code).toBe(0);

        return result;
      })
      .then(() => compareSize(src, dest))
      .then(result => {
        expect(result[dest]).toBeLessThan(result[src]);

        return result;
      });
  });
});
