# tree-parser

[![Circle CI](https://circleci.com/gh/davegomez/tree-parser/tree/master.svg?style=svg)](https://circleci.com/gh/davegomez/tree-parser/tree/master)

## Usage
    var parser = require('tree-parser');

    var tree = parser('directory-path', [, files]);

tree-parser accepts two arguments:

1. A string representing the absolute or relative path for the target directory.
2. An optional list of comma separated *file-names* to be excluded from the `_content` list of files and included as an object in the current tree level.

**Note:** the files to be excluded can only be JSON files.

## Output

For an input like `parser('directory-path', '_data');` the output will be something like:

    {
      _contents: ['index.html', 'package.json', 'README.md'],
      src: {
        _contents: ['app.js', 'main.css'],
        _data: {
          name: 'app-name',
          version: '1.4.2',
          author: 'Your Name'
        },
        scss: {
          _contents: ['_base.scss', '_fonts.scss', '_grid.scss'],
          _functions: {
            ...
          },
          _mixins: {
            ...
          }
        },
        js: [],
        modules: {
          ...
        }
      }
    }

Note how the `_data.json` file was included in its directory tree level with the file content exposed as an object.
