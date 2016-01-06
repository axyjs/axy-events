/* eslint dot-location: 0, func-names: 0, global-require: 0, no-magic-numbers: 0 */
"use strict";

const
    config = require("./config"),
    jasmine = require("gulp-jasmine"),
    jasminePhantom = require("gulp-jasmine-phantom"),
    jasmineBrowser = require("gulp-jasmine-browser"),
    istanbul = require("gulp-istanbul"),
    runSequence = require("run-sequence");

module.exports = function define(gulp) {

    gulp.task("test-jasmine", function () {
        return gulp.src(["spec/**/*Spec.js"])
            .pipe(jasmine());
    });

    gulp.task("test-phantom", function () {
        return gulp.src([config.PATH_TO_ES5SHIM, "./spec/jasmine-pack.js"])
            .pipe(jasminePhantom({integration: true}));
    });

    gulp.task("test-without-build", ["test-jasmine"]); /* , "test-phantom" */

    gulp.task("test", function (callback) {
        runSequence("build-tests", "test-without-build", callback);
    });

    gulp.task("browser", function () {
        return gulp.src([config.PATH_TO_ES5SHIM, "./spec/jasmine-pack.js"])
            .pipe(jasmineBrowser.specRunner())
            .pipe(jasmineBrowser.server({port: config.TEST_PORT}));
    });

    gulp.task("istanbul-init", function () {
        return gulp.src(["index.js", "lib/**/*.js"])
            .pipe(istanbul({reporter: "html"}))
            .pipe(istanbul.hookRequire());
    });

    gulp.task("test-coverage", ["istanbul-init"], function () {
        return gulp.src(["spec/**/*Spec.js"])
            .pipe(jasmine())
            .pipe(istanbul.writeReports(config.DIR_COVERAGE));
    });
};
