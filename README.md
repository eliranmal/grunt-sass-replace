# grunt-sass-replace

> replaces sass values

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt][1] before, be sure to check out the [Getting Started][2] guide, as it explains 
how to create a [Gruntfile][3] as well as install and use Grunt plugins. Once you're familiar with that process, 
you may install this plugin with this command:

```shell
npm install grunt-sass-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-replace');
```

## The 'sass-replace' task

### Overview
In your project's Gruntfile, add a section named `sass-replace` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'sass-replace': {
    files: [
      {
        src: 'my-styles.scss',
        dest: 'my-new-styles.scss'
      }
    ],
    options: {
      variables: [
        {
          name: 'my-var',
          from: '10px',
          to: '3.333em'
        }
      ],
      imports: [
        {
          from: 'http://foo.wat.com',
          to: 'http://bar.wat.com'
        }
      ]
    }
  },
});
```

### Options

#### options.variables
*Type: `Array<Object>`.*  
*Default value: none.*

A collection of instructions for replacing variable values. Either this or the `imports` option must be set.

##### VariableInstruction
*Type: `Object`.*  
*Default value: none.*

An object representing a single instruction in the `options.variables` collection.  
The `to` field is mandatory, and either `from` or `name` can be used in conjunction to filter the lookup.

When both `name` and `from` are used, they both apply as filters. As `name` can be passed as a string *or* as a regular 
expression, it presents two use cases:

- passing both fields as strings can be used to only replace values of duplicate variable declarations, e.g. overriding 
a color variable in a specific file.
- passing a regular expression to `name` and a string to `from` can be used to achieve finer filtering, only matching
variables with a certain name which *also* have a certain value.

###### VariableInstruction.name
*Type: `String|RegExp`.*  
*Default value: `/\S+/` (match at least one non-whitespace character).*

The variable name for lookup, without the leading `$`.
 
When a string is passed, the literal value is searched, e.g. `my-var` will match `$my-var: "foo"`.

A regular expression can be passed in its literal form or as a `RegExp` instance.  
e.g. `/my[-_]?[Vv]ar/` or `new RegExp('my[-_]?[Vv]ar')` will match `$my-var: "foo"`, `$my_var: "foo"` and `$myVar: "foo"`.

When using `RegExp` instance, only its `source` is used for the lookup (flags are ignored).

###### VariableInstruction.from
*Type: `String|RegExp`.*  
*Default value: `/\S+/` (match at least one non-whitespace character).*

The variable name for lookup, without the leading `$`.


#### options.imports
*Type: `Array<Object>`.*  
*Default value: none.*

A collection of instructions for replacing import paths. Either this or the `variables` option must be set.


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  'sass-replace': {
    options: {},
    files: {
      'dest/default-options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  'sass-replace': {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default-options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2016 Eliran Malka. Licensed under the WTFPL license.





[1]: http://gruntjs.com/
[2]: http://gruntjs.com/getting-started
[3]: http://gruntjs.com/sample-gruntfile
