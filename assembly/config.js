/**
 * Build configuration
 */
"use strict";

const TEST_PORT = 8888,
    PATH_TO_ES5SHIM = "./node_modules/es5-shim/es5-shim.min.js",
    DIR_COVERAGE = "coverage",
    packageInfo = require("./../package.json"),
    name = packageInfo.name,
    path = require("path"),
    rootDir = path.resolve(path.join(__dirname, ".."));

module.exports = {

    rootDir: rootDir,

    name: name,

    version: packageInfo.version,

    package: packageInfo,

    browserFileName: "browser/" + name + ".min.js",

    browserVarName: name.split("-"),

    TEST_PORT: TEST_PORT,

    PATH_TO_ES5SHIM: PATH_TO_ES5SHIM,

    DIR_COVERAGE: DIR_COVERAGE,

    createPath: function createPath(relative) {
        return path.join(rootDir, relative);
    }
};
