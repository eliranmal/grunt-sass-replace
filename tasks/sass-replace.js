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
        sassReplace = require('./lib/main').init(grunt);

    // load 3rd party tasks
    grunt.task.loadTasks(path.resolve(__dirname, '../node_modules/grunt-string-replace/tasks'));

    grunt.registerMultiTask('sass-replace', 'replaces sass values', function () {
        var scssFiles,
            replacements,
            files = this.files,
            options = this.options();


        if (!files || !files.length) {
            grunt.fail.fatal('no files passed, aborting.');
        }

        if (!options || isEmptyObject(options)) {
            grunt.fail.fatal('no options passed, aborting.');
        }

        if (options && (!options.variables || !options.variables.length) && (!options.imports || !options.imports.length)) {
            grunt.fail.warn('options must contain "variables", "imports", or both. aborting.');
        }

        scssFiles = files.filter(function (file) {
            var src = file.src,
                dest = file.dest,
                isSrcValid = src && src.length && src.filter(isScssFile).length,
                isDestValid = dest && isScssFile(dest);
            if (!isSrcValid) {
                grunt.verbose.or.writeln(('src [' + src + '] is not an scss file, it will be excluded.').yellow.bold);
            }
            if (!isDestValid) {
                grunt.verbose.or.writeln(('dest [' + dest + '] is not an scss file, it will be excluded.').yellow.bold);
            }
            return isSrcValid && isDestValid;
        });

        if (scssFiles && scssFiles.length) {
            grunt.log.ok('scss files found in passed files.');
        }else {
            grunt.fail.warn('no scss files found in passed files, aborting.');
        }

        replacements = sassReplace.asStringReplacements(options);
        if (replacements) {
            grunt.log.ok('replacements resolved.');
        } else {
            grunt.fail.warn('failed to resolve replacements, aborting.');
        }

        // check that the required parameters are available, to avoid writing files when running with --force
        if (scssFiles && replacements) {
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

    function isEmptyObject(obj) {
        return !hasProps(obj);
    }

    function hasProps(obj) {
        for (var p in obj) {
            return true;
        }
    }

    function isScssFile(path) {
        return hasExtension(path, 'scss');
    }

    function hasExtension(path, ext) {
        return endsWith(path, '.' + ext);
    }

    function endsWith(str, ending) {
        return str.indexOf(ending) === str.length - ending.length;
    }

};