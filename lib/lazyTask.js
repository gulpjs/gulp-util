'use strict';

var path = require('path');

module.exports = function (gulp, taskPathBuilder) {
    var collection = {};

    if (!taskPathBuilder) {
        taskPathBuilder = function (taskName) {
            return path.resolve(process.cwd(), taskName);
        };
    }

    if (typeof taskPathBuilder === 'string') {
        var baseName = taskPathBuilder;

        taskPathBuilder = function (taskName) {
            return path.resolve(baseName, taskName);
        };
    }

    return function (taskName) {
        var taskPath = taskPathBuilder(taskName);

        if (collection.hasOwnProperty(taskName)) {
            return taskName;
        }

        collection[taskName] = true;

        gulp.task(taskName, function (callback) {
            var task = require(taskPath);

            return task(callback);
        });

        return taskName;
    };
};
