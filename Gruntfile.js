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
                        },
                        {
                            from: 10,
                            to: '10%'
                        },
                        {
                            from: 3.333,
                            to: 6.666
                        },
                        {
                            from: '10px',
                            to: '20em'
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
                        },
                        {
                            name: 'my-num-var',
                            to: '20'
                        },
                        {
                            name: 'my-num-default-var',
                            to: 20
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
                        },
                        {
                            name: 'my_num_var',
                            from: 3.333,
                            to: '6.666'
                        },
                        {
                            name: 'myNumDefaultVar',
                            from: '10px',
                            to: '20em'
                        }
                    ]
                }
            },
            'variables_noop': {
                files: {
                    'tmp/variables/noop': 'test/fixtures/variables'
                }
            },
            'imports_from-to': {
                files: {
                    'tmp/imports/from-to': 'test/fixtures/imports'
                },
                options: {
                    imports: [
                        {
                            from: 'foo',
                            to: 'bar'
                        },
                        {
                            from: 'foo.css',
                            to: 'bar.css'
                        },
                        {
                            from: 'foo.scss',
                            to: 'bar.scss'
                        },
                        {
                            from: 'http://wat.com/foo',
                            to: 'http://wat.com/bar'
                        },
                        {
                            from: 'http://wat.tha.fuck.com/foo',
                            to: 'http://wat.tha.fuck.com/bar'
                        },
                        {
                            from: 'http://wat.com/foo?family=#{$family}',
                            to: 'http://wat.com/bar?family=#{$family}'
                        },
                        {
                            from: 'foo-foo',
                            to: 'bar-bar'
                        },
                        {
                            from: 'foo-foo-foo',
                            to: 'bar-bar-bar'
                        }
                    ]
                }
            },
            'imports_noop': {
                files: {
                    'tmp/imports/noop': 'test/fixtures/imports'
                }
            },
            'mixed_imports': {
                files: {
                    'tmp/mixed/imports': 'test/fixtures/mixed'
                },
                options: {
                    imports: [
                        {
                            from: 'foo',
                            to: 'bar'
                        },
                        {
                            from: 'foo.css',
                            to: 'bar.css'
                        },
                        {
                            from: 'foo.scss',
                            to: 'bar.scss'
                        },
                        {
                            from: 'http://wat.com/foo',
                            to: 'http://wat.com/bar'
                        },
                        {
                            from: 'http://wat.tha.fuck.com/foo',
                            to: 'http://wat.tha.fuck.com/bar'
                        },
                        {
                            from: 'http://wat.com/foo?family=#{$family}',
                            to: 'http://wat.com/bar?family=#{$family}'
                        },
                        {
                            from: 'foo-foo',
                            to: 'bar-bar'
                        },
                        {
                            from: 'foo-foo-foo',
                            to: 'bar-bar-bar'
                        }
                    ]
                }
            },
            'mixed_variables': {
                files: {
                    'tmp/mixed/variables': 'test/fixtures/mixed'
                },
                options: {
                    variables: [
                        {
                            from: 'foo',
                            to: 'bar'
                        }
                    ]
                }
            },
            'mixed_all': {
                files: {
                    'tmp/mixed/all': 'test/fixtures/mixed'
                },
                options: {
                    variables: [
                        {
                            from: 'foo',
                            to: 'bar'
                        }
                    ],
                    imports: [
                        {
                            from: 'foo',
                            to: 'bar'
                        },
                        {
                            from: 'foo.css',
                            to: 'bar.css'
                        },
                        {
                            from: 'foo.scss',
                            to: 'bar.scss'
                        },
                        {
                            from: 'http://wat.com/foo',
                            to: 'http://wat.com/bar'
                        },
                        {
                            from: 'http://wat.tha.fuck.com/foo',
                            to: 'http://wat.tha.fuck.com/bar'
                        },
                        {
                            from: 'http://wat.com/foo?family=#{$family}',
                            to: 'http://wat.com/bar?family=#{$family}'
                        },
                        {
                            from: 'foo-foo',
                            to: 'bar-bar'
                        },
                        {
                            from: 'foo-foo-foo',
                            to: 'bar-bar-bar'
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
