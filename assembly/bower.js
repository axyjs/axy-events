/* eslint dot-location: 0, func-names: 0, global-require: 0, no-magic-numbers: 0 */
"use strict";

const
    config = require("./config"),
    fs = require("fs");

module.exports = function define(gulp) {

    gulp.task("bower", function (callback) {
        const
            bower = require("./../bower.json"),
            old = JSON.stringify(bower, null, 4);
        let json;
        bower.name = config.name;
        bower.main = config.browserFileName;
        bower.version = config.version;
        bower.description = config.package.description;
        bower.homepage = config.package.homepage;
        json = JSON.stringify(bower, null, 4);
        if (json !== old) {
            return fs.writeFile(config.createPath("bower.json"), json, function (err) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        }
        callback();
    });
};
