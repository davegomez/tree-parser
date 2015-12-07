# tree-parser

[![Circle CI](https://circleci.com/gh/davegomez/tree-parser/tree/master.svg?style=shield)](https://circleci.com/gh/davegomez/tree-parser/tree/master) [![Build Status](https://travis-ci.org/davegomez/tree-parser.svg?branch=master)](https://travis-ci.org/davegomez/tree-parser) [![npm version](https://badge.fury.io/js/tree-parser.svg)](https://badge.fury.io/js/tree-parser)

*tree-parser* helps you to create JavaScript objects representing the structure of a given directory.

If you pass additional parameters as strings representing the names of JSON files inside your directories, *tree-parser* will parse their content, and will include it in the output as a regular object inside its parent directory, as you can see in the example below.

## Usage
    var parser = require('tree-parser');

    var tree = parser('directory-path', [, files]);

*tree-parser* accepts two arguments:

- `directory-path: string` - A string representing the absolute or relative path for the target directory.
- `[, files]: Array<string>` - An optional list of comma separated *file-names* to be excluded from the `_content` list of files and included as an object in the current tree level.

**Note:** the files to be excluded can only be **JSON** files.

## Sample Project
This is a sample project where you can find a lot of directories and files. Also you will find some JSON files named as `_data``, this files can be included in the output object as a regular **JavaScript** object exposing all its inner data.

You can use the path to this directory together with the name of the JSON file(s) to be parse.

    .
    ├── README.md
    ├── build
    │   ├── css
    │   │   ├── styles.css
    │   │   └── styles.min.css
    │   ├── img
    │   │   ├── banner.png
    │   │   ├── burguer-icon.svg
    │   │   ├── chevron-icon.svg
    │   │   ├── hero.png
    │   │   └── logo.svg
    │   ├── index.html
    │   └── js
    │       ├── app.js
    │       ├── app.min.js
    │       └── vendor
    ├── circle.yml
    ├── package.json
    ├── src
    │   ├── _data.json               <-- JSON file to be included as Object
    │   ├── index.js
    │   ├── main.scss
    │   ├── modules
    │   │   ├── app.js
    │   │   ├── commands.js
    │   │   ├── data.js
    │   │   └── parser.js
    │   └── scss
    │       ├── base.scss
    │       ├── fonts.scss
    │       ├── functions
    │       │   ├── colors.scss
    │       │   └── metrics.scss
    │       ├── grid.scss
    │       └── themes.scss
    ├── tests
    │   ├── _data.json               <-- JSON file to be included as Object
    │   ├── index.spec.js
    │   └── modules
    │       ├── app.spec.js
    │       ├── commands.spec.js
    │       ├── data.spec.js
    │       └── parser.spec.js
    └── webpack.config.js

## The Output

For an input like `parser('directory-path', '_data');` using the directory structure we can find above, the output will be:

    {
      _contents: [ 'README.md', 'app.js', 'circle.yml', 'package.json', 'webpack.config.js' ],
      build: {
        _contents: [ 'index.html' ],
        css: {
          _contents: [ 'styles.css', 'styles.min.css' ]
        },
        img: {
          _contents: [ 'banner.png', 'burguer-icon.svg', 'chevron-icon.svg', 'hero.png', 'logo.svg' ]
        },
        js: {
          _contents: [ 'app.js', 'app.min.js' ],
          vendor: {
            _contents: [ ]
          }
        }
      },
      src: {
        _contents: [ 'index.js', 'main.scss' ],
        _data: {                                          <-- This is the JSON file after beign parsed
          appName: 'The Application Name',
          description: 'Application's description',
          module: 'src'
        },
        modules: {
          _contents: [ 'app.js', 'commands.js', 'data.js', 'parser.js' ]
        },
        scss: {
          _contents: [ 'base.scss', 'fonts.scss', 'grid.scss', 'themes.scss' ],
          functions: {
            _contents: [ 'colors.scss', 'metrics.scss' ]
          }
        }
      },
      tests: {
        _contents: [ 'index.spec.js' ],
        _data: {                                          <-- This is the JSON file after beign parsed
          testingFramework: 'Tape',
          description: 'This is a test JSON file',
          version: '1.0.0'
        },
        modules: {
          _contents: [ 'app.spec.js', 'commands.spec.js', 'data.spec.js', 'parser.spec.js' ]
        }
      }
    }

Note how the `_data.json` file was included in its directory tree level with the file content exposed as an object.
