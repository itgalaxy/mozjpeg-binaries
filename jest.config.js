"use strict";

module.exports = {
  collectCoverageFrom: ["src/**/*.{js,mjs,jsx}", "!src/install.js"],
  testPathIgnorePatterns: ["/node_modules/", "/fixtures/", "helpers.js"]
};
