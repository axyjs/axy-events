/**
 * It is config for the gulp webpack task (no for cli webpack)
 */
"use strict";

const path = require("path"),
    webpack = require("webpack"),
    config = require("./config.js"),
    uglifyConfig = require("./uglify.json");

module.exports = {
    context: path.join(__dirname, ".."),
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: config.browserFileName,
        library: config.browserVarName
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(uglifyConfig)
    ]
};
