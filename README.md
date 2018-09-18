# mozjpeg-binaries

[![NPM version](https://img.shields.io/npm/v/mozjpeg-binaries.svg)](https://www.npmjs.org/package/mozjpeg-binaries)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/mozjpeg-binaries/master.svg?label=build)](https://travis-ci.org/itgalaxy/mozjpeg-binaries)
[![dependencies Status](https://david-dm.org/itgalaxy/mozjpeg-binaries/status.svg)](https://david-dm.org/itgalaxy/mozjpeg-binaries)
[![devDependencies Status](https://david-dm.org/itgalaxy/mozjpeg-binaries/dev-status.svg)](https://david-dm.org/itgalaxy/mozjpeg-binaries?type=dev)

Wrapper for `mozjpeg` binaries.

> [mozjpeg](https://github.com/mozilla/mozjpeg) is a production-quality JPEG encoder that improves compression while maintaining compatibility with the vast majority of deployed decoders

You probably want [`imagemin-mozjpeg-full`](https://github.com/itgalaxy/imagemin-mozjpeg-full) instead.

What is difference between [mozjpeg-bin](https://github.com/imagemin/mozjpeg-bin/):

- Contains all binaries delivered by `mozjpeg`: `cjpeg`, `djpeg`, `jpegtran`, `rdjpgcom`, `tjbench` and `wrjpgcom`.
- No security vulnerabilities.
- Latest version.

## Installation

```shell
$ npm install mozjpeg-binaries
```

## Usage

```js
const { execFile } = require("child_process");
const binaries = require("mozjpeg-binaries");

// `binaries` contains:
// - cjpeg (original `mozjpeg` binary)
// - djpeg
// - jpegtran
// - rdjpgcom
// - tjbench
// - wrjpgcom

execFile(binaries.cjpeg, ["-outfile", "output.jpg", "input.jpg"], err => {
  console.log("Image minified!");
});
```

## CLI

```shell
$ npm install --global mozjpeg
```

```shell
$ cjpeg --help
$ djpeg --help
$ jpegtran --help
$ rdjpgcom --help
$ tjbench --help
$ wrjpgcom --help
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
