"use strict";

const fs = require("fs");
const os = require("os");
const binBuild = require("bin-build");
const { default: PQueue } = require("p-queue");
const binWrappers = require("./bin-wrappers");

const buildCommands = () => {
  const cpus = (os.cpus() || { length: 1 }).length;

  let cfgExtras = "";

  if (process.platform === "darwin") {
    cfgExtras = "libpng_LIBS='/usr/local/lib/libpng16.a -lz' --enable-static";
  }

  const cfg = [
    `./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
    `--prefix="${binWrappers.cjpeg.dest()}" --bindir="${binWrappers.cjpeg.dest()}" --libdir="${binWrappers.cjpeg.dest()}"`
  ].join(" ");

  return binBuild.url(
    "https://github.com/mozilla/mozjpeg/archive/v3.3.1.tar.gz",
    ["autoreconf -fiv", cfg, `make -j${cpus}`, `make install -j${cpus}`]
  );
};

const queue = new PQueue({ concurrency: 1 });

Object.keys(binWrappers).forEach(program => {
  const binWrapper = binWrappers[program];

  queue.add(() =>
    Promise.resolve()
      // Workaround https://github.com/kevva/bin-wrapper/issues/67
      // Need use bin.run(['--version']) after resolve
      .then(() => binWrapper.findExisting())
      // eslint-disable-next-line no-sync
      .then(() => fs.chmodSync(binWrapper.path(), "755"))
      .then(() => {
        const commandWihtoutCheck = [
          "rdjpgcom",
          "tjbench",
          "wrjpgcom"
        ].includes(program);
        const checkCommand = commandWihtoutCheck ? ["-help"] : ["-version"];

        // eslint-disable-next-line no-console
        console.log(binWrapper.path());

        return binWrapper
          .runCheck(checkCommand)
          .then(binCheck => {
            console.log(`${program} pre-build test passed successfully`); // eslint-disable-line no-console

            return binCheck;
          })
          .catch(error => {
            const { message } = error;

            // eslint-disable-next-line no-console
            console.log(error);

            if (commandWihtoutCheck && /usage/iu.test(message)) {
              console.log(`${program} pre-build test passed successfully`); // eslint-disable-line no-console

              return;
            }

            throw error;
          });
      })
      .catch(error => {
        queue.pause();

        console.log(error.message); // eslint-disable-line no-console
        console.log("pre-build test failed"); // eslint-disable-line no-console
        console.log("compiling from source"); // eslint-disable-line no-console

        buildCommands()
          .then(result => {
            console.log("mozjpeg binaries built successfully"); // eslint-disable-line no-console

            return result;
          })
          .catch(buildError => {
            console.log(buildError.stack); // eslint-disable-line no-console

            const exitCode =
              typeof buildError.code === "number" ? buildError.code : 1;

            process.exit(exitCode);
          });

        queue.clear();
      })
  );
});

queue.start();
