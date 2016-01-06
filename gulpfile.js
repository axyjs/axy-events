/**
 * Sources (typescript) located in the directory `src`.
 * Sources of tests located in the directory `tests`. For testing used Jasmine.
 *
 * Sources compiled to the root directory of the package (index.js in root, other sub-modules in their directories).
 * It is NPM version of the library. It can used in browser via webpack.
 * And created d.ts files for use the library features in typescript code.
 *
 * Moreover creates file for direct include in browsers: `./browser/{packageName}.min.js`.
 * It creates a global variable, which correspond to the library name.
 *
 * Tests compiled to the directory `./spec/` (they ignored in Git).
 * They can run using the node version of Jasmine.
 *
 * For testing in a browser the tests packed using webpack to `spec/jasmine-pack.js` (ignored in Git).
 * It can tested using the PhantomJS.
 * Or using `gulp browser` can run local server on `TEST_PORT` port (see below) and test it in browsers.
 *
 * All TypeScript, JavaScript (excluding the generated) and JSON files linted using TSLint, JSLint and JSONLint.
 *
 *
 * Gulp tasks:
 *
 * `default` - lint, build and test
 * `build` - build all sources and tests to server and browser versions
 *   `build-src` - build sources to server and browser versions
 *     `build-npm` - build sources to server NPM version
 *     `build-browser` - pack NPM to browser versions
 *   `build-tests` - build tests to server and browser version
 *     `build-tests-npm` - build tests sources
 *     `build-tests-browser` - pack tests to browser version
 * `test` - build and run tests
 *   `test-without-build` - run tests without building
 *   `test-jasmine` - testing via Jasmine
 *   `test-phantom` - testing browser version using PhantomJS
 * `clean` - clean the previous build
 *   `clean-npm`
 *   `clean-browser`
 *   `clean-test`
 * `lint`
 *   `tslint`
 *   `eslint`
 *   `jsonlint`
 * `bower` - create bower.json for the current version
 * `browser` - run local server for testing in browsers
 * `test-coverage` - run Jasmine with code coverage (HTML-report save to coverage directory). Do not included in `test`.
 */

/* eslint dot-location: 0, func-names: 0, global-require: 0, no-magic-numbers: 0 */
"use strict";

const gulp = require("gulp"),
    build = require("./assembly/build.js"),
    clean = require("./assembly/clean.js"),
    lint = require("./assembly/lint.js"),
    test = require("./assembly/test.js"),
    bower = require("./assembly/bower.js"),
    runSequence = require("run-sequence");

build(gulp);
test(gulp);
clean(gulp);
lint(gulp);
bower(gulp);

gulp.task("default", function (callback) {
    runSequence(["lint", "build", "bower"], "test-without-build", callback);
});
