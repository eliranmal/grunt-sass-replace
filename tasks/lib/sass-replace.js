/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the WTFPL license.
 */

exports.init = function (grunt) {
    'use strict';

    var log = lineLogger(grunt.log.writeln);
    var bla = lineLogger(grunt.verbose.writeln);
    var err = lineLogger(grunt.log.errorlns);

    exports.asStringReplacements = function (options) {
        var replacements,
            variableReplacements = buildReplacements(options.variables, variableReplacementBuilder),
            importReplacements = buildReplacements(options.imports, importReplacementBuilder);

        replacements = [].concat(variableReplacements, importReplacements);

        bla('effective string-replace replacements:');
        bla(stringify(replacements));

        return replacements;
    };

    // todo - add option to preserve !default in variables
    // todo - (which means the default behavior will be to overwrite everything after the ':')

    function variableReplacementBuilder(v) {
        var pattern,
            name = v.name,
            from = v.from,
            to = v.to;

        if (isUndefined(name) && isUndefined(from)) {
            err('one of "name" or "from" must be defined in a variable replacement');
            return false;
        }

        if (!isUndefined(name) && !isString(name) && !isRegex(name)) {
            err('"name" must be a string or a regex in a variable replacement');
            return false;
        }

        if (isUndefined(to)) {
            err('"to" must be defined in a variable replacement');
            return false;
        }

        bla('> building variable replacement', 'name: ' + name, 'from: ' + from, 'to: ' + to);

        pattern = buildVariableReplacementPattern(name, from);

        return {
            pattern: new RegExp(pattern, 'gm'),
            replacement: function (match, p1, p2, p3) {
                bla('> replacement callback', 'match: ' + match, 'p1: ' + p1, 'p2: ' + p2, 'p3: ' + p3);
                return p1 + to + p3;
            }
        };
    }

    function buildVariableReplacementPattern(name, from) {
        if (isUndefined(name)) {
            name = '\\S+'; // match at least one non-whitespace character
        } else if (isString(name)) {
            name = regexEscape(name);
        } else if (isRegex(name)) {
            name = name.source;
        }
        from = from ? regexEscape(from) : '[^\\s"\';!]*';
        bla('effective name: ' + name, 'effective from: ' + from);
        return [
            /**/    '^',                                // start line
            /**/    '(',                                // start capture group $1
            /**/        '\\$',                          // name must start with $
            /**/        '(' + name + ')',               // capture group $2 (for debugging)
            /**/        ':\\s*["\']?',                  // the value's optional open quote
            /**/    ')',                                // end capture group $1
            /**/    from,                               //
            /**/    '(',                                // start capture group $3
            /**/        '["\']?\\s*',                   // the value's optional close quote
            /**/        '(?:(?:!default\\s*;)|;)',      // allow for !default after value
            /**/    ')',                                // end capture group $3
            /**/    '$'                                 // end line
        ].join('');
    }

    function importReplacementBuilder(i) {
        var pattern,
            from = i.from,
            to = i.to;

        if ((isUndefined(from) || !isString(from)) || (isUndefined(to) || !isString(to))) {
            err('both "from" and "to" must be defined and of type string in an import replacement');
            return false;
        }

        pattern = buildImportReplacementPattern(from);

        return {
            pattern: new RegExp(pattern, 'gm'),
            replacement: '$1' + to + '$2'
        };
    }

    function buildImportReplacementPattern(from) {
        from = regexEscape(from);
        return [
            /**/    '^',                                                // start line
            /**/    '(',                                                // start group $1
            /**/        '\\s*',                                         // allow indentation (e.g. for nested imports)
            ///**/        '@import\\s+',                                //
            /**/        '(?:',                                          //
            /**/            '(?:@import\\s+)|(?:@import.*,\\s*)',       // allow multiple values, e.g. @import "wat", "wow"; todo - can i do this with \2 capturing the whole second group + from variable ?
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
                    if (replacement) {
                        replacements.push(replacement);
                    }
                }
            });
        }
        return replacements;
    }

    function regexEscape(str) {
        return (str + '').replace(/(["'\*\.\-\?\$\{}])/g, '\\$1');
    }

    function stringify(json) {
        return JSON.stringify(json, function (key, val) {
            if (isRegex(val)) {
                return val.source;
            }
            return val;
        }, 2);
    }

    function isString(val) {
        return typeof val === 'string';
    }

    function isRegex(val) {
        return val instanceof RegExp;
    }

    function isUndefined(val) {
        return typeof val === 'undefined';
    }

    function lineLogger(fn) {
        return function logLines() {
            [].slice.call(arguments).forEach(function (line) {
                fn(line);
            });
        };
    }

    return exports;
};
