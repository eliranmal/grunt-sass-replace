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
        var files, options, stringReplaceConfig;

        // set default options
        options = this.options();
        files = this.files;

        if (files && options) {
            stringReplaceConfig = getStringReplaceConfig(files, options);
            grunt.config.set('string-replace', stringReplaceConfig);
            grunt.task.run('string-replace:sass');
        }
    });


    function getStringReplaceConfig(files, options) {
        var replacements,
            variableReplacements = buildReplacements(options.variables, variableReplacementBuilder),
            importReplacements = buildReplacements(options.imports, importReplacementBuilder);

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


    function variableReplacementBuilder(v) {
        var name, from, to;
        name = v.name || '\\S+'; // match at least one non-whitespace character
        from = v.from || '.*';
        if (!v.to) {
            // todo - go defensive!
        }
        to = v.to;
        return {
            pattern: new RegExp('(\\$' + name + ':\\s*["\'])' + from + '(["\'].*;)', 'g'),
            replacement: '$1' + to + '$2'
        };
    }

    function importReplacementBuilder(i) {
        var pattern,
            fromAsRegexString,
            from = i.from,
            to = i.to;

        if (!isString(from) || !isString(to)) {
            return false;
        }

        fromAsRegexString = asRegexString(from);
        pattern = buildImportReplacementPattern(fromAsRegexString);

        return {
            pattern: new RegExp(pattern, 'gm'),
            replacement: '$1' + to + '$2'
        };
    }

    function buildImportReplacementPattern(from) {
        return [
            /**/    '^',                                                //
            /**/    '(',                                                // start capture first group
            /**/        '\\s*',                                         // allow for indentation (e.g. for nested imports)
            ///**/        '@import\\s+',                                //
            /**/        '(?:',                                          //
            /**/            '(?:@import\\s+)|(?:@import.*,\\s*)',       // allow for multiple values, e.g. @import "wat", "wow"; todo - can i do this with \2 capturing the whole second group + from variable ?
            ///**/            '@import(?=\\s+|.*,\\s*)',                // attempt the previous line with assertions
            /**/        ')',                                            //
            /**/        '(?:',                                          //
            /**/            '(?:',                                      //
            /**/                'url\\(["\']?',                         //
            /**/            ')',                                        //
            /**/            '|',                                        //
            /**/            '["\']',                                    //
            /**/        ')',                                            //
            /**/    ')',                                                // end capture first group
            /**/    from,                                               //
            /**/    '(',                                                // start capture second group
            /**/        '(?:',                                          //
            /**/            '["\']|(?:["\']?\\))',                      //
            /**/        ')',                                            //
            ///**/        '(?:[\\w\\s]*;)|,\\s?',                       // todo - handle " screen; AND ", "
            ///**/        '.*;',                                        //
            /**/        '.*',                                           //
            /**/    ')',                                                // end capture second group
            /**/    '$'                                                 //
        ].join('');

        // original regex, for reference. todo - remove this!
        // harness non-capturing groups (:?) to allow for optional url("") and to handle optional surrounding quotes
        //pattern: new RegExp('(@import\\s+(?:url\\()*["\']*|["\'])' + from + '(["\']|(?:["\']*\\)).*;)', 'g'),
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

    function asRegexString(str) {
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

    function isString(val) {
        return val && typeof val === 'string';
    }

};
