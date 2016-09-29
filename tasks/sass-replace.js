/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the WTFPL license.
 */

module.exports = function (grunt) {
    'use strict';

    var path = require('path'),
        util = require(path.resolve(__dirname, './lib/util')),
        sassReplace = require(path.resolve(__dirname, './lib/main')).init(grunt);

    // load 3rd party tasks
    grunt.task.loadTasks(path.resolve(__dirname, '../node_modules/grunt-string-replace/tasks'));

    grunt.registerMultiTask('sass-replace', 'replaces sass values', function () {
        var scssFiles,
            replacements,
            isScssFilesValid,
            isReplacementsValid,
            files = this.files,
            options = this.options();


        validate(files, 'no files passed.');

        if (util.isEmpty(options)) {
            grunt.fail.warn('no options passed.');
        } else if (util.isEmpty(options.variables) && util.isEmpty(options.imports)) {
            grunt.fail.warn('options must contain "variables", "imports", or both.');
        }

        scssFiles = files.filter(function (file) {
            var src = file.src,
                dest = file.dest,
                isSrcValid = !util.isEmpty(src) && src.filter(util.isScssFile).length,
                isDestValid = !util.isEmpty(dest) && util.isScssFile(dest);
            return isSrcValid && isDestValid;
        });

        isScssFilesValid = validate(scssFiles, 'no scss files found in passed files.');

        replacements = sassReplace.asStringReplacements(options);

        isReplacementsValid = validate(replacements, 'failed to resolve replacements.');

        if (isScssFilesValid && isReplacementsValid) {
            grunt.log.writeln('running string-replace task.');
            grunt.config.set('string-replace', {
                sass: {
                    files: scssFiles,
                    options: {
                        replacements: replacements
                    }
                }
            });
            grunt.task.run('string-replace:sass');
            grunt.log.ok().ok('sass-replace finished successfully.');
        }
    });

    function validate(value, invalidMessage, validMessage) {
        var isValid = !util.isEmpty(value);
        if (isValid) {
            if (validMessage) {
                grunt.log.ok(validMessage);
            }
        } else {
            if (invalidMessage) {
                grunt.fail.warn(invalidMessage);
            }
        }
        return isValid;
    }

};