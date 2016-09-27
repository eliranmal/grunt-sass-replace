'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['sass-replace'] = {

    setUp: function (done) {
        // setup here if necessary
        done();
    },

    variablesFromTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/from-to.scss');
        var expected = grunt.file.read('test/expected/variables/from-to.scss');
        test.equal(actual, expected, 'should replace sass variable values, filtering by variable old value');

        test.done();
    },

    variablesNameTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/name-to.scss');
        var expected = grunt.file.read('test/expected/variables/name-to.scss');
        test.equal(actual, expected, 'should replace sass variable values, filtering by variable name');

        test.done();
    },

    variablesNameFromTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/name-from-to.scss');
        var expected = grunt.file.read('test/expected/variables/name-from-to.scss');
        test.equal(actual, expected, 'should replace sass variable values, filtering by variable name and old value');

        test.done();
    },

    variablesRegexNameTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/regex-name-to.scss');
        var expected = grunt.file.read('test/expected/variables/regex-name-to.scss');
        test.equal(actual, expected, 'should replace sass variable values, filtering by variable name as regex');

        test.done();
    },

    variablesRegexNameFromTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/regex-name-from-to.scss');
        var expected = grunt.file.read('test/expected/variables/regex-name-from-to.scss');
        test.equal(actual, expected, 'should replace sass variable values, filtering by variable name as regex, and by variable value');

        test.done();
    },

    importsFromTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/imports/from-to.scss');
        var expected = grunt.file.read('test/expected/imports/from-to.scss');
        test.equal(actual, expected, 'should replace sass import values, filtering by old value');

        test.done();
    },

    mixedVariables: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/mixed/variables.scss');
        var expected = grunt.file.read('test/expected/mixed/variables.scss');
        test.equal(actual, expected, 'should only replace sass variable values in a file with both imports and variables');

        test.done();
    },

    mixedImports: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/mixed/imports.scss');
        var expected = grunt.file.read('test/expected/mixed/imports.scss');
        test.equal(actual, expected, 'should only replace sass import values in a file with both imports and variables');

        test.done();
    },

    mixedAll: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/mixed/all.scss');
        var expected = grunt.file.read('test/expected/mixed/all.scss');
        test.equal(actual, expected, 'should replace sass import values and variable values in a file with both imports and variables');

        test.done();
    },

    invalidFileExtensionSrc: function (test) {
        test.expect(1);

        var isDestFileExists = grunt.file.exists('tmp/mixed/invalid-ext-src.scss');
        test.equal(isDestFileExists, false, 'should not write any files');

        test.done();
    },

    invalidFileExtensionDest: function (test) {
        test.expect(1);

        var isDestFileExists = grunt.file.exists('tmp/mixed/invalid-ext-dest.md');
        test.equal(isDestFileExists, false, 'should not write any files');

        test.done();
    },

    invalidFileExtensionSrcDest: function (test) {
        test.expect(1);

        var isDestFileExists = grunt.file.exists('tmp/mixed/invalid-ext-src-dest.md');
        test.equal(isDestFileExists, false, 'should not write any files');

        test.done();
    },

    missingOptions: function (test) {
        test.expect(1);

        var isDestFileExists = grunt.file.exists('tmp/mixed/no-options.scss');
        test.equal(isDestFileExists, false, 'should not write any files');

        test.done();
    }

};
