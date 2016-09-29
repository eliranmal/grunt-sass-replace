/*
 * grunt-sass-replace
 * https://github.com/eliranmal/grunt-sass-replace
 *
 * Copyright (c) 2016 eliranmal
 * Licensed under the WTFPL license.
 */

var escapeStringRegexp = require('escape-string-regexp');

var util = module.exports = {

    isEmpty: function (val) {
        return !val || !util.hasProps(val);
    },

    hasProps: function (iterable) {
        for (var p in iterable) {
            return true;
        }
    },

    isScssFile: function (path) {
        return util.hasExtension(path, 'scss');
    },

    hasExtension: function (path, ext) {
        return util.endsWith(path, '.' + ext);
    },

    endsWith: function (str, term) {
        return str.indexOf(term) === str.length - term.length;
    },

    asRegexString: function (str) {
        return escapeStringRegexp(str + '');
    },

    stringify: function (json) {
        return JSON.stringify(json, function (key, val) {
            if (util.isRegex(val)) {
                return val.source;
            }
            return val;
        }, 2);
    },

    isString: function (val) {
        return typeof val === 'string';
    },

    isNumber: function (val) {
        return !isNaN(val) && typeof val === 'number';
    },

    isBoolean: function (val) {
        return typeof val === 'boolean';
    },

    isRegex: function (val) {
        return val instanceof RegExp;
    },

    isUndefined: function (val) {
        return typeof val === 'undefined';
    }

};