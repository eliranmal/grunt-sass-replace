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
<sup>
**Type:** `Array<Object>`  
**Default value:** none  
**Mandatory:** either this or the [`imports`][4] option must be set
</sup>

A collection of instructions for replacing variable values.

##### VariableInstruction
<sup>
**Type:** `Object`  
**Default value:** none  
**Mandatory:** yes, at least one instruction must be passed
</sup>

An object representing a single instruction in the `options.variables` collection.  
The [`to`][5] field is mandatory, and either [`from`][6], [`name`][7] or both can be used to filter the lookup.

When both `name` and `from` are used, they both apply as filters. As `name` can be passed as a string *or* as a regular 
expression, it presents two common use cases:

- passing both fields as strings can be used to only replace values of duplicate variable declarations, e.g. a 
variable overriding a color in a specific file.
- passing a string to `from` and a regular expression to `name` can be used to achieve finer filtering, matching
variables which have a certain value, by several names.

###### VariableInstruction.name
<sup>
**Type:** `String|RegExp`  
**Default value:** `/\S+/` (match at least one non-whitespace character)  
**Mandatory:** either this or the [`from`][6] field must be set
</sup>

The variable name for lookup, without the leading `$`.
 
When a string is passed, the literal value is searched, e.g. `my-var` will match `$my-var: "foo"`.

A regular expression can be passed in its literal form or as a `RegExp` instance.  
e.g. `/my[-_]?[Vv]ar/` or `new RegExp('my[-_]?[Vv]ar')` will both match `$my-var: "foo"`, `$my_var: "foo"` and `$myVar: "foo"`.

When using a `RegExp` instance, only its source is used for the lookup (flags are ignored).

###### VariableInstruction.from
<sup>
**Type:** `String|Number|Boolean`  
**Default value:** none  
**Mandatory:** either this or the [`name`][7] field must be set
</sup>

The variable's current value for lookup. Note that `!default` statements are not captured for replacement, and are 
kept as is ([post an issue][12] if you want to be able to alter `!default` statements as well).

See [note on using double quotes when replacing string values][9].

###### VariableInstruction.to
<sup>
**Type:** `String|Number|Boolean`  
**Default value:** none  
**Mandatory:** yes
</sup>

A new value for the matched variable.

See [note on using double quotes when replacing string values][9].

---

##### Note on replacing string values

When replacing variable values of type string, e.g. `$my-var: "foo"` &rarr; `$my-var: "bar"`, the variable value's 
surrounding double quotes may be omitted from the `from`/`to` field's value, as they will be captured and passed on to 
the replacement.  
However, it is advised to prefer the explicit notation and always surround string values with double quotes, for better 
readability and to avoid confusion or unexpected behavior.

:+1:  
```javascript
  {
    from: '"foo"',
    to: '"bar"'
  },
  ...
```

:-1:  
```javascript
  {
    from: 'foo',
    to: 'bar'
  },
  ...
```


#### options.imports
<sup>
**Type:** `Array<Object>`  
**Default value:** none  
**Mandatory:** either this or the [`variables`][8] option must be set
</sup>

A collection of instructions for replacing `@import` paths.

##### ImportInstruction
<sup>
**Type:** `Object`  
**Default value:** none  
**Mandatory:** yes, at least one instruction must be passed
</sup>

An object representing a single instruction in the `options.imports` collection.  
Both [`from`][10] and [`to`][11] fields are mandatory.

###### ImportInstruction.from
<sup>
**Type:** `String`  
**Default value:** none  
**Mandatory:** yes
</sup>

The import path(s) current value for lookup. Captures only the path contents, i.e. everything between the surrounding 
quotes, or inside a `url()`.

Capturing of everything after the `@import` is currently not supported ([post an issue][12] if you find it useful).

###### ImportInstruction.to
<sup>
**Type:** `String`  
**Default value:** none  
**Mandatory:** yes
</sup>

A new value for the matched import path(s).


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
[4]: #optionsimports
[5]: #variableinstructionto
[6]: #variableinstructionfrom
[7]: #variableinstructionname
[8]: #optionsvariables
[9]: #note-on-replacing-string-values
[10]: #importinstructionfrom
[11]: #importinstructionto
[12]: https://github.com/eliranmal/grunt-sass-replace/issues
