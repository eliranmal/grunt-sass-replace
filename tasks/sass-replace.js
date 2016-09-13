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

        options = this.options({
            variables: [],
            imports: []
        });

        stringReplaceConfig = getStringReplaceConfig(this.files, options);

        grunt.config.set('string-replace', stringReplaceConfig);
        grunt.task.run('string-replace:sass');
    });


    function getStringReplaceConfig(files, options) {
        var replacements,
            variableReplacements = buildVariableReplacements(options.variables),
            importReplacements = buildImportReplacements(options.imports);

        replacements = [].concat(variableReplacements, importReplacements);

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
        var name, from, to,
            replacements = [];
        variables.forEach(function (v) {
            name = v.name;
            from = v.from || '.*';
            to = v.to;
            replacements.push({
                pattern: new RegExp('\\$' + name + ':\\s*["\']' + from + '["\'](.*);', 'g'),
                replacement: '$' + name + ': "' + to + '"$1;'
            });
        });
        return replacements;
    }

    function buildImportReplacements(imports) {
        var from, to,
            replacements = [];
        imports.forEach(function (i) {
            from = i.from;
            to = i.to;
            replacements.push({
                // todo - account for all cases in 'imports' fixture
                pattern: new RegExp('@import\\s*["\']' + from + '["\'].*;', 'g'),
                replacement: '@import "' + to + '";'
            });
        });
        return replacements;
    }

};
