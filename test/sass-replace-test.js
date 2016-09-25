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

    variablesRegexName: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/regex-name.scss');
        var expected = grunt.file.read('test/expected/variables/regex-name.scss');
        test.equal(actual, expected, 'should replace sass variable values, filtering by variable name as regex');

        test.done();
    },

    variablesNoop: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/variables/noop.scss');
        var expected = grunt.file.read('test/fixtures/variables.scss');
        test.equal(actual, expected, 'should not replace anything, input file should be equal to output file');

        test.done();
    },

    importsFromTo: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/imports/from-to.scss');
        var expected = grunt.file.read('test/expected/imports/from-to.scss');
        test.equal(actual, expected, 'should replace sass import values, filtering by old value');

        test.done();
    },

    importsNoop: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/imports/noop.scss');
        var expected = grunt.file.read('test/fixtures/imports.scss');
        test.equal(actual, expected, 'should not replace anything, input file should be equal to output file');

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
    }

};
