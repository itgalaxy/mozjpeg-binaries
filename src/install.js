"use strict";

const path = require("path");
const fs = require("fs");
const os = require("os");
const binBuild = require("bin-build");
const { default: PQueue } = require("p-queue");
const binWrappers = require("./bin-wrappers");

const buildCommands = async () => {
  const cpus = (os.cpus() || { length: 1 }).length;

  let cfgExtras = "";

  if (process.platform === "darwin") {
    cfgExtras = "libpng_LIBS='/usr/local/lib/libpng16.a -lz' --enable-static";
  }

  const dest = binWrappers.cjpeg.dest();
  const compilationDest = path.isAbsolute(dest)
    ? dest
    : path.join(process.cwd(), dest);

  const cfg = [
    `./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
    `--prefix="${compilationDest}" --bindir="${compilationDest}" --libdir="${compilationDest}"`
  ].join(" ");

  await binBuild.url(
    "https://github.com/mozilla/mozjpeg/archive/v3.3.1.tar.gz",
    ["autoreconf -fiv", cfg, `make -j${cpus}`, `make install -j${cpus}`]
  );
};

const queue = new PQueue({ concurrency: 1 });

Object.keys(binWrappers).forEach(program => {
  const binWrapper = binWrappers[program];
  const compilationRequired =
    typeof process.env.MOZJPEG_COMPILATION_REQUIRED !== "undefined"
      ? process.env.MOZJPEG_COMPILATION_REQUIRED === "true"
      : false;

  queue.add(async () => {
    try {
      if (compilationRequired) {
        throw new Error("Compilation required");
      }

      // Workaround https://github.com/kevva/bin-wrapper/issues/67
      // Need use bin.run(['--version']) after resolve
      await binWrapper.findExisting();

      // eslint-disable-next-line no-sync
      fs.chmodSync(binWrapper.path(), "755");

      const commandWihtoutCheck = ["rdjpgcom", "tjbench", "wrjpgcom"].includes(
        program
      );
      const checkCommand = commandWihtoutCheck ? ["-help"] : ["-version"];

      try {
        await binWrapper.runCheck(checkCommand);
      } catch (error) {
        const { message } = error;

        if (commandWihtoutCheck && /usage/i.test(message)) {
          console.log(`${program} pre-build test passed successfully`); // eslint-disable-line no-console

          return binWrapper;
        }

        throw error;
      }

      console.log(`${program} pre-build test passed successfully`); // eslint-disable-line no-console

      return binWrapper;
    } catch (error) {
      queue.pause();

      if (!compilationRequired) {
        console.log(error.message); // eslint-disable-line no-console
        console.log("pre-build test failed"); // eslint-disable-line no-console
      }

      console.log("compiling from source"); // eslint-disable-line no-console

      // eslint-disable-next-line init-declarations
      let result;

      try {
        result = await buildCommands();
      } catch (buildError) {
        console.log(buildError.stack); // eslint-disable-line no-console

        const exitCode =
          typeof buildError.code === "number" ? buildError.code : 1;

        const ignoreMozjpegCompilationError =
          typeof process.env.IGNORE_MOZJPEG_COMPATION_ERROR !== "undefined"
            ? process.env.IGNORE_MOZJPEG_COMPATION_ERROR === "true"
            : false;

        if (!ignoreMozjpegCompilationError) {
          process.exit(exitCode);
        }
      }

      console.log("mozjpeg binaries built successfully"); // eslint-disable-line no-console

      queue.clear();

      return result;
    }
  });
});

queue.start();
