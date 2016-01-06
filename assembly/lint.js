/* eslint dot-location: 0, func-names: 0, global-require: 0, no-magic-numbers: 0 */
"use strict";

const
    tslint = require("gulp-tslint"),
    eslint = require("gulp-eslint"),
    jsonlint = require("gulp-jsonlint"),
    tslintCustom = require("tslint"), // tslint for gulp-tslint
    tslintConfig = require("../src/tslint.json");

module.exports = function define(gulp) {

    /* Lints typescript sources */
    gulp.task("tslint", function () {
        const options = {
            tslint: tslintCustom, // internal tslint of gulp-tslint fails on import/export
            configuration: tslintConfig
        };
        return gulp.src(["src/**/*.ts", "tests/**/*.ts"])
            .pipe(tslint(options))
            .pipe(tslint.report("verbose", {summarizeFailureOutput: true}));
    });

    /* Lints javascript configs and helpers (such as this file) */
    gulp.task("eslint", function () {
        return gulp.src(["gulpfile.js", "assembly/**/*.js"])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    /* Lints JSON files */
    gulp.task("jsonlint", function () {
        return gulp.src(["**/*.json", ".eslintrc", "!node_modules/**/*"])
            .pipe(jsonlint())
            .pipe(jsonlint.reporter());
    });

    gulp.task("lint", ["tslint", "eslint", "jsonlint"]);
};
