/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the WTFPL license.
 */

exports.init = function (grunt) {
    'use strict';

    var path = require('path'),
        util = require(path.resolve(__dirname, './util'));


    exports.asStringReplacements = function (options) {
        var replacements,
            variableReplacements = buildReplacements(options.variables, variableReplacementBuilder),
            importReplacements = buildReplacements(options.imports, importReplacementBuilder);

        replacements = [].concat(variableReplacements, importReplacements);

        grunt.log.debug('effective string-replace replacements:').debug(util.stringify(replacements));

        return replacements;
    };

    // todo - add option to preserve !default in variables
    // todo - (which means the default behavior will be to overwrite everything after the ':')

    function variableReplacementBuilder(v) {
        var pattern,
            name = v.name,
            from = v.from,
            to = v.to;

        if (util.isUndefined(to)) {
            grunt.log.error().error('"to" must be defined in a variable replacement instruction');
            return false;
        }

        if (util.isUndefined(name) && util.isUndefined(from)) {
            grunt.log.error().error('one of "name" or "from" must be defined in a variable replacement instruction');
            return false;
        }

        if (!util.isUndefined(name) && !util.isString(name) && !util.isRegex(name)) {
            grunt.log.error().error('"name" must be a string or a regex in a variable replacement instruction');
            return false;
        }

        if (!util.isUndefined(from) && !util.isString(from) && !util.isNumber(from) && !util.isBoolean(from)) {
            grunt.log.error().error('"from" must be a string, a number or a boolean in a variable replacement instruction');
            return false;
        }

        if (!util.isString(to) && !util.isNumber(to) && !util.isBoolean(to)) {
            grunt.log.error().error('"to" must be a string, a number or a boolean in a variable replacement instruction');
            return false;
        }

        pattern = buildVariableReplacementPattern(name, from, to);

        return {
            pattern: pattern,
            replacement: function (match, p1, p2, p3) {
                grunt.log
                    .debug('matching variable replacement'.bold)
                    .debug(('match=' + match).cyan)
                    .debug(('captured groups=' + grunt.log.wordlist([p1, p2, p3])).cyan);

                return p1 + to + p3;
            }
        };
    }

    function buildVariableReplacementPattern(name, from, to) {
        var patternSegments;

        grunt.verbose.writeln('building variable replacement pattern with: ' + ('name=' + name + ', from=' + from + ', to=' + to).cyan);

        if (util.isUndefined(name)) {
            name = '\\S+'; // match at least one non-whitespace character
        } else if (util.isString(name)) {
            name = util.asRegexString(name);
        } else if (util.isRegex(name)) {
            name = name.source;
        }

        if (util.isUndefined(from)) {
            from = '[^\\s"\';!]*';
        } else {
            from = util.asRegexString(from);
        }

        grunt.log.debug('effective variable replacement params: ' + ('name=' + name + ', from=' + from + ', to=' + to).cyan);

        patternSegments = [
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
        ];

        return new RegExp(patternSegments.join(''), 'gm');
    }

    function importReplacementBuilder(i) {
        var pattern,
            from = i.from,
            to = i.to;

        if ((util.isUndefined(from) || !util.isString(from)) || (util.isUndefined(to) || !util.isString(to))) {
            grunt.log.error().error('both "from" and "to" must be defined and of type string in an import replacement instruction');
            return false;
        }

        pattern = buildImportReplacementPattern(from);

        return {
            pattern: pattern,
            replacement: '$1' + to + '$2'
        };
    }

    function buildImportReplacementPattern(from) {
        var patternSegments;
        from = util.asRegexString(from);

        patternSegments = [
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
        ];

        return new RegExp(patternSegments.join(''), 'gm');
    }

    function buildReplacements(arr, builder) {
        var replacement,
            replacements = [];
        if (!util.isEmpty(arr)) {
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

    return exports;
};
