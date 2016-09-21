/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the WTFPL license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');

    // load 3rd party tasks
    grunt.task.loadTasks(path.resolve(__dirname, '../node_modules/grunt-string-replace/tasks'));

    grunt.registerMultiTask('sass-replace', 'replaces sass declarations', function () {
        var options, stringReplaceConfig;

        // set default options
        options = this.options();

        if (options) {
            stringReplaceConfig = getStringReplaceConfig(this.files, options);
            grunt.config.set('string-replace', stringReplaceConfig);
            grunt.task.run('string-replace:sass');
        }
    });


    function getStringReplaceConfig(files, options) {
        var replacements,
            variableReplacements = buildVariableReplacements(options.variables),
            importReplacements = buildImportReplacements(options.imports);

        replacements = [].concat(variableReplacements, importReplacements);

        grunt.verbose.writeln('effective string-replace replacements:');
        grunt.verbose.writeln(stringify(replacements));

        return {
            sass: {
                files: files,
                options: {
                    replacements: replacements
                }
            }
        };
    }


    function buildVariableReplacements(variables) {
        return buildReplacements(variables, function (v) {
            var name, from, to;
            name = v.name || '\\S+'; // match at least one non-whitespace character
            from = v.from || '.*';
            if (!v.to) {
                // todo - proper validations!
            }
            to = v.to;
            return {
                pattern: new RegExp('(\\$' + name + ':\\s*["\'])' + from + '(["\'].*;)', 'g'),
                replacement: '$1' + to + '$2'
            };
        });
    }

    function buildImportReplacements(imports) {
        return buildReplacements(imports, function (i) {
            var from, to;
            from = asRegex(i.from);
            to = i.to;
            return {
                // harness non-capturing groups (:?) to allow for optional url("") and to handle optional surrounding quotes
                pattern: new RegExp('(@import\\s+(?:url\\()*["\']*|["\'])' + from + '(["\']|(?:["\']*\\)).*;)', 'g'),
                replacement: '$1' + to + '$2'
            };
        });
    }

    function buildReplacements(arr, builder) {
        var replacement,
            replacements = [];
        if (arr && arr.length > 0) {
            arr.forEach(function (item) {
                if (builder) {
                    replacement = builder(item);
                }
                if (replacement) {
                    replacements.push(replacement);
                }
            });
        }
        return replacements;
    }

    function asRegex(str) {
        return str.replace(/(["'\*\.\-\?\$\{}])/g, '\\$1');
    }

    function stringify(json) {
        return JSON.stringify(json, function (key, val) {
            if (val instanceof RegExp) {
                return val.source;
            }
            return val;
        }, 2);
    }

};
