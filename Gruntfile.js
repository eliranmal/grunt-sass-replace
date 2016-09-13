/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the WTFPL license.
 */

'use strict';

module.exports = function (grunt) {

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

        clean: {
            tests: ['tmp']
        },

        // configuration to be run (and then tested).
        'sass-replace': {
            'default-options': {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['test/fixtures/**/*'],
                        dest: 'tmp/default-options'
                    }
                ],
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
                //files: {
                //    //'tmp/default-options': 'test/fixtures/variables'
                //    'tmp/default-options': ['test/fixtures/variables', 'test/fixtures/imports']
                //    //'tmp/default-options': 'test/fixtures/imports'
                //}
            },
            'custom-options': {
                files: {
                    'tmp/custom-options/variables': 'test/fixtures/variables'
                    //'tmp/custom-options': 'test/fixtures/imports'
                },
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
                    ]
                }
            }
        },

        nodeunit: {
            tests: ['test/*-test.js']
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'sass-replace', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);

};
