/* @flow */

import fs from 'fs';
import path from 'path';
import dirContent from './dir-content';
import parseJSON from './parse-json';
import includes from '../helpers/includes';

/**
 * Takes a directory path and optional names for internal JSON files to include
 * them inside the returned object
 * @param {string} rootPath Absolute or relative path for a directory to parsed
 * @param {Object} filesToParse Comma separated list of JSON file names to be
 * included in the resulting object
 * @returns {Object} A JavaScript object representing a directory tree and its
 * content
 */
const parseTree = (rootPath: string, ...filesToParse: Array<string>) => {
  const dirStructure: Object = {};
  dirStructure._contents = [];

  dirContent(rootPath)
    .forEach(filePath => {
      const target: Object = fs.statSync(filePath);
      const fileName: string = path.basename(filePath);
      const rawFileName: string = path.basename(filePath, '.json');

      if (target.isDirectory()) {
        dirStructure[fileName] = parseTree(filePath, ...filesToParse);
      } else {
        if (includes(filesToParse, rawFileName)) {
          dirStructure[rawFileName] = parseJSON(filePath);
        } else {
          dirStructure._contents.push(fileName);
        }
      }
    });

  return dirStructure;
};

export default parseTree;
