#!/usr/bin/env node

"use strict";

const { spawn } = require("child_process");
const paths = require("../src");

const input = process.argv.slice(2);

spawn(paths.wrjpgcom, input, { stdio: "inherit" }).on("exit", process.exit);
