/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the none license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        'sass-replace': {
            'default-options': {
                options: {
                    variables: [
                        {
                            name: 'my-var',
                            from: 'foo', // optional filter, omit to replace all matching names
                            to: 'bar'
                        },
                        {
                            name: 'my-default-var',
                            from: 'foo', // optional filter, omit to replace all matching names
                            to: 'bar'
                        },
                        {
                            name: 'my_var',
                            from: 'foo', // optional filter, omit to replace all matching names
                            to: 'bar'
                        },
                        {
                            name: 'my_default_var',
                            from: 'foo', // optional filter, omit to replace all matching names
                            to: 'bar'
                        },
                        {
                            name: 'myVar',
                            from: 'foo', // optional filter, omit to replace all matching names
                            to: 'bar'
                        },
                        {
                            name: 'myDefaultVar',
                            from: 'foo', // optional filter, omit to replace all matching names
                            to: 'bar'
                        },
                    ],
                    //imports: [
                    //    {
                    //        from: 'foo/bar',
                    //        to: 'foo/wat'
                    //    }
                    //]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['test/fixtures/**/*'],
                        dest: 'tmp/default-options'
                    }
                ]
                //files: {
                //    //'tmp/default-options': 'test/fixtures/variables'
                //    'tmp/default-options': ['test/fixtures/variables', 'test/fixtures/imports']
                //    //'tmp/default-options': 'test/fixtures/imports'
                //}
                //},
                //'custom-options': {
                //    options: {
                //        separator: ': ',
                //        punctuation: ' !!!'
                //    },
                //    files: {
                //        'tmp/custom-options': 'test/fixtures/variables'
                //        //'tmp/custom-options': 'test/fixtures/imports'
                //    }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'sass-replace', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
