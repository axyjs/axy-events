/* eslint dot-location: 0, func-names: 0, global-require: 0, no-magic-numbers: 0 */
"use strict";

const
    config = require("./config.js"),
    fs = require("fs-extra"),
    path = require("path");

module.exports = function define(gulp) {

    gulp.task("clean-npm", function (callback) {
        fs.removeSync(config.createPath("lib"));
        fs.removeSync(config.createPath("index.js"));
        fs.removeSync(config.createPath("index.d.ts"));
        callback();
    });

    gulp.task("clean-browser", function (callback) {
        fs.removeSync(config.createPath(config.browserFileName));
        callback();
    });

    gulp.task("clean-tests", function (callback) {
        const dest = config.createPath("spec");
        fs.removeSync(dest);
        fs.copySync(path.join(__dirname, "spec"), dest);
        callback();
    });

    gulp.task("clean", ["clean-npm", "clean-browser", "clean-tests"]);
};
