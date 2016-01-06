/**
 * Config for pack jasmine tests to the browser version
 */
"use strict";

const PACK_BASE_NAME = "jasmine-pack.js",
    JasmineWebpackPlugin = require("jasmine-webpack-plugin"),
    config = require("./config");

module.exports = {
    context: config.rootDir,
    entry: "./spec/indexSpec.js", // will be changed in gulp task build-tests-browser
    output: {
        filename: "./" + PACK_BASE_NAME
    },
    plugins: [
        new JasmineWebpackPlugin({filename: "index.html"})
    ]
};
