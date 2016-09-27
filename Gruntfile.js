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
                'tasks/**/*.js',
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
                        //flatten: true,
                        //src: ['test/fixtures/**/*'],
                        src: 'test/fixtures/variables.scss',
                        dest: 'tmp/variables/from-to.scss'
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
                        src: 'test/fixtures/variables.scss',
                        dest: 'tmp/variables/name-to.scss'
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
                        src: 'test/fixtures/variables.scss',
                        dest: 'tmp/variables/name-from-to.scss'
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
            'variables_regex-name-to': {
                files: {
                    'tmp/variables/regex-name-to.scss': 'test/fixtures/variables.scss'
                },
                options: {
                    variables: [
                        {
                            name: new RegExp('my[-_]?[Vv]ar'),
                            to: 1000000000000
                        },
                        {
                            name: /my[-_]?[Nn]um[-_]?[Vv]ar/,
                            to: -1
                        }
                    ]
                }
            },
            'variables_regex-name-from-to': {
                files: {
                    'tmp/variables/regex-name-from-to.scss': 'test/fixtures/variables.scss'
                },
                options: {
                    variables: [
                        {
                            name: new RegExp('my[-_]?[Vv]ar'),
                            from: "foo",
                            to: 1000000000000
                        },
                        {
                            name: /my[-_]?[Nn]um[-_]?[Vv]ar/,
                            from: 10,
                            to: -1
                        }
                    ]
                }
            },
            'imports_from-to': {
                files: {
                    'tmp/imports/from-to.scss': 'test/fixtures/imports.scss'
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
            'mixed_imports': {
                files: {
                    'tmp/mixed/imports.scss': 'test/fixtures/mixed.scss'
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
                    'tmp/mixed/variables.scss': 'test/fixtures/mixed.scss'
                },
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
                            from: '3.333',
                            to: 6.666
                        },
                        {
                            from: '10px',
                            to: '20em'
                        }
                    ]
                }
            },
            'mixed_all': {
                files: {
                    'tmp/mixed/all.scss': 'test/fixtures/mixed.scss'
                },
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
                            from: '3.333',
                            to: 6.666
                        },
                        {
                            from: '10px',
                            to: '20em'
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
            },
            'invalid_file_ext_src': {
                files: {
                    'tmp/mixed/invalid-ext-src.scss': 'test/fixtures/doc.md'
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
            'invalid_file_ext_dest': {
                files: {
                    'tmp/mixed/invalid-ext-dest.md': 'test/fixtures/mixed.scss'
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
            'invalid_file_ext_src_dest': {
                files: {
                    'tmp/mixed/invalid-ext-src-dest.md': 'test/fixtures/doc.md'
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
            'missing_options': {
                files: {
                    'tmp/mixed/no-options.scss': 'test/fixtures/mixed.scss'
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
