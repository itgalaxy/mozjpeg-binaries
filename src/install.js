"use strict";

const os = require("os");
const binBuild = require("bin-build");
const bin = require("./bin-wrapper");

const cpus = (os.cpus() || { length: 1 }).length;

let cfgExtras = "";

if (process.platform === "darwin") {
  cfgExtras = "libpng_LIBS='/usr/local/lib/libpng16.a -lz' --enable-static";
}

const cfg = [
  `./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
  `--prefix="${bin.cjpeg.dest()}" --bindir="${bin.cjpeg.dest()}" --libdir="${bin.cjpeg.dest()}"`
].join(" ");

Promise.resolve()
  .then(() =>
    binBuild.url(
      "https://github.com/mozilla/mozjpeg/archive/v3.3.1.tar.gz",
      ["autoreconf -fiv", cfg, `make -j${cpus}`, `make install -j${cpus}`]
    )
  )
  .then(result => {
    console.log("mozjpeg built successfully"); // eslint-disable-line no-console

    return result;
  })
  .catch(error => {
    console.log(error.stack); // eslint-disable-line no-console

    const exitCode = typeof error.code === "number" ? error.code : 1;

    process.exit(exitCode); // eslint-disable-line no-process-exit
  });
