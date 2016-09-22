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
        var pattern,
            name = v.name,
            from = v.from,
            to = v.to;

        if (isUndefined(name) && isUndefined(from)) {
            grunt.log.errorlns('one of "name" or "from" must be defined in a variable replacement');
            return false;
        }

        if (!isUndefined(name) && !isString(name)) {
            grunt.log.errorlns('"name" must be a string in a variable replacement');
            return false;
        }

        if (isUndefined(to)) {
            grunt.log.errorlns('"to" must be defined in a variable replacement');
            return false;
        }

        pattern = buildVariableReplacementPattern(from, name);

        return {
            pattern: new RegExp(pattern, 'gm'),
            replacement: '$1' + to + '$2'
        };
    }

    function buildVariableReplacementPattern(from, name) {
        // todo - add option to preserve !default in variables
        // todo - add option to pass regex as filter in the "name" field, e.g. name: /my[-_][vV]ar/
        name = name ? asRegexString(name) : '\\S+'; // match at least one non-whitespace character
        from = from ? asRegexString(from) : '.*';
        return [
            /**/    '^',                                // start line
            /**/    '(',                                // start capture first group
            /**/        '\\$',                          // name must start with $
            /**/        name,                           //
            /**/        ':\\s*["\']?',                  // the value's optional open quote
            /**/    ')',                                // end capture first group
            /**/    from,                               //
            /**/    '(',                                // start capture second group
            /**/        '["\']?\\s*',                   // the value's optional close quote
            /**/        '(?:(?:!default\\s*;)|;)',      // allow for !default after value
            /**/    ')',                                // end capture second group
            /**/    '$'                                 // end line
        ].join('');
    }

    function importReplacementBuilder(i) {
        var pattern,
            from = i.from,
            to = i.to;

        if (!isString(from) || !isString(to)) {
            grunt.log.errorlns('both "from" and "to" must be defined and of type string in an import replacement');
            return false;
        }

        pattern = buildImportReplacementPattern(from);

        return {
            pattern: new RegExp(pattern, 'gm'),
            replacement: '$1' + to + '$2'
        };
    }

    function buildImportReplacementPattern(from) {
        from = asRegexString(from);
        return [
            /**/    '^',                                                // start line
            /**/    '(',                                                // start group $1
            /**/        '\\s*',                                         // allow for indentation (e.g. for nested imports)
            ///**/        '@import\\s+',                                //
            /**/        '(?:',                                          //
            /**/            '(?:@import\\s+)|(?:@import.*,\\s*)',       // allow for multiple values, e.g. @import "wat", "wow"; todo - can i do this with \2 capturing the whole second group + from variable ?
            ///**/            '@import(?=\\s+|.*,\\s*)',                // attempt the previous line with assertions
            /**/        ')',                                            //
            /**/        '(?:',                                          //
            /**/            '(?:',                                      //
            /**/                'url\\(["\']?',                         // path may be surrounded with url(), with optional quotes
            /**/            ')',                                        //
            /**/            '|',                                        //
            /**/            '["\']',                                    //
            /**/        ')',                                            //
            /**/    ')',                                                // end group $1
            /**/    from,                                               //
            /**/    '(',                                                // start group $2
            /**/        '(?:',                                          //
            /**/            '["\']|(?:["\']?\\))',                      // path may be surrounded with url(), with optional quotes
            /**/        ')',                                            //
            ///**/        '(?:[\\w\\s]*;)|,\\s?',                       // todo - handle " screen; AND ", "
            ///**/        '.*;',                                        //
            /**/        '.*',                                           //
            /**/    ')',                                                // end group $2
            /**/    '$'                                                 // end line
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
        return (str + '').replace(/(["'\*\.\-\?\$\{}])/g, '\\$1');
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

    function isUndefined(val) {
        return typeof val === 'undefined';
    }

};
