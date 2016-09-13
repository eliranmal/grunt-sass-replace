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
    defaultOptions: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default-options/variables');
        var expected = grunt.file.read('test/expected/default-options/variables');
        test.equal(actual, expected, 'should replace sass variable values');

        test.done();
    },
    customOptions: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-options/variables');
        var expected = grunt.file.read('test/expected/custom-options/variables');
        test.equal(actual, expected, 'should replace sass variable values using custom options (e.g. exclude regex?)');

        test.done();
    }
};
