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
            'variables_from-to': {
                files: [
                    {
                        //expand: true,
                        flatten: true,
                        //src: ['test/fixtures/**/*'],
                        src: 'test/fixtures/variables',
                        dest: 'tmp/variables/from-to'
                    }
                ],
                options: {
                    variables: [
                        {
                            from: 'foo',
                            to: 'bar'
                        }
                    ]
                }
            },
            'variables_name-to': {
                files: [
                    {
                        //expand: true,
                        flatten: true,
                        //src: ['test/fixtures/**/*'],
                        src: 'test/fixtures/variables',
                        dest: 'tmp/variables/name-to'
                    }
                ],
                options: {
                    variables: [
                        {
                            name: 'my-var',
                            to: 'bar'
                        },
                        {
                            name: 'my-default-var',
                            to: 'bar'
                        }
                    ]
                }
            },
            'variables_name-from-to': {
                files: [
                    {
                        //expand: true,
                        flatten: true,
                        //src: ['test/fixtures/**/*'],
                        src: 'test/fixtures/variables',
                        dest: 'tmp/variables/name-from-to'
                    }
                ],
                options: {
                    variables: [
                        {
                            name: 'my-var',
                            from: 'foo',
                            to: 'bar'
                        },
                        {
                            name: 'my-default-var',
                            from: 'foo',
                            to: 'bar'
                        }
                    ]
                }
            },
            'imports_from-to': {
                files: {
                    'tmp/imports/from-to': 'test/fixtures/imports'
                    //'tmp/custom-options': 'test/fixtures/imports'
                },
                options: {
                    imports: [
                        {
                            from: 'foo',
                            to: 'bar'
                        }
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
