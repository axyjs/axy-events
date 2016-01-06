/* eslint dot-location: 0, func-names: 0, global-require: 0, no-magic-numbers: 0 */
"use strict";

const
    config = require("./config"),
    typescript = require("gulp-typescript"),
    webpack = require("gulp-webpack"),
    tsConfig = require("./../src/tsconfig.json"),
    tsTestsConfig = require("./../tests/tsconfig.json"),
    webpackConfig = require("./webpack.config.gulp.js"),
    webpackJasmineConfig = require("./webpack.config.jasmine.js"),
    merge = require("merge2"),
    runSequence = require("run-sequence"),
    fs = require("fs"),
    path = require("path"),
    glob = require("glob");

module.exports = function define(gulp) {

    gulp.task("build-npm", function () {
        const options = tsConfig.compilerOptions;
        let pipe;
        options.outDir = "."; // For normal path to typings in <reference> in generated d.ts files
        pipe = gulp.src("src/**/*.ts")
            .pipe(typescript(options));
        return merge([
            pipe.dts.pipe(gulp.dest(".")),
            pipe.js.pipe(gulp.dest("."))
        ]);
    });

    gulp.task("build-browser-without-npm", function () {
        return gulp.src("./index.js")
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest("."));
    });

    gulp.task("build-browser-export", function (callback) {
        const
            fileName = config.createPath(config.browserFileName),
            varName = config.browserVarName.join("."),
            options = {encoding: "utf-8"};
        fs.readFile(fileName, options, function (err, data) {
            if (err) {
                return callback(err);
            }
            if (data.substr(-1) !== ";") {
                data += ";";
            }
            data += varName + "=" + varName + ".default;";
            fs.writeFile(fileName, data, options, function (err) {
                callback(err);
            });
        });
    });

    gulp.task("build-browser", function (callback) {
        fs.exists(path.join(config.rootDir, "index.js"), function (isExists) {
            const sequence = ["build-browser-without-npm", "build-browser-export", callback];
            if (!isExists) {
                sequence.unshift("build-npm");
            }
            runSequence.apply(null, sequence);
        });
    });

    gulp.task("build-src", function (callback) {
        runSequence("build-npm", "build-browser", callback);
    });

    gulp.task("build-tests-npm", function () {
        return gulp.src(["tests/**/*.ts", "typings/jasmine.d.ts"])
            .pipe(typescript(tsTestsConfig.compilerOptions))
            .pipe(gulp.dest("spec"));
    });

    gulp.task("build-tests-browser", function () {
        webpackJasmineConfig.entry = glob.sync("./spec/**/*.js");
        return gulp.src("/spec/**/*.js")
            .pipe(webpack(webpackJasmineConfig))
            .pipe(gulp.dest("./spec"));
    });

    gulp.task("build-tests", function (callback) {
        runSequence("build-tests-npm", "build-tests-browser", callback);
    });

    gulp.task("build", function (callback) {
        runSequence("clean", "build-src", "build-tests", callback);
    });
};
