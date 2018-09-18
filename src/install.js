"use strict";

const os = require("os");
const binBuild = require("bin-build");
const bin = require("./bin-wrapper");

const buildCommands = () => {
  const cpus = (os.cpus() || { length: 1 }).length;

  let cfgExtras = "";

  if (process.platform === "darwin") {
    cfgExtras = "libpng_LIBS='/usr/local/lib/libpng16.a -lz' --enable-static";
  }

  const cfg = [
    `./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
    `--prefix="${bin.cjpeg.dest()}" --bindir="${bin.cjpeg.dest()}" --libdir="${bin.cjpeg.dest()}"`
  ].join(" ");

  return binBuild.url(
    "https://github.com/mozilla/mozjpeg/archive/v3.3.1.tar.gz",
    ["autoreconf -fiv", cfg, `make -j${cpus}`, `make install -j${cpus}`]
  );
};

Promise.resolve()
  .then(() => bin.cjpeg.run(["-version"]))
  .then(result => {
    console.log("mozjpeg pre-build test passed successfully"); // eslint-disable-line no-console

    return result;
  })
  .catch(error => {
    console.log(error.message); // eslint-disable-line no-console
    console.log("mozjpeg pre-build test failed"); // eslint-disable-line no-console
    console.log("compiling from source"); // eslint-disable-line no-console

    buildCommands()
      .then(result => {
        console.log("mozjpeg built successfully"); // eslint-disable-line no-console

        return result;
      })
      .catch(buildError => {
        console.log(buildError.stack); // eslint-disable-line no-console

        const exitCode =
          typeof buildError.code === "number" ? buildError.code : 1;

        process.exit(exitCode); // eslint-disable-line no-process-exit
      });
  });
