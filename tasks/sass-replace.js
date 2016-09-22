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
        sassReplace = require('./lib/sass-replace').init(grunt);

    // load 3rd party tasks
    grunt.task.loadTasks(path.resolve(__dirname, '../node_modules/grunt-string-replace/tasks'));

    grunt.registerMultiTask('sass-replace', 'replaces sass declarations', function () {
        var files, options, stringReplaceConfig;

        // set default options
        options = this.options();
        files = this.files;

        if (files && options) {
            stringReplaceConfig = sassReplace.getStringReplaceConfig(files, options);
            grunt.config.set('string-replace', stringReplaceConfig);
            grunt.task.run('string-replace:sass');
        }
    });

};