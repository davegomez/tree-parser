/* @flow */

import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import dirContent from './dir-content';
import parseJSON from './parse-json';

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
        if (filesToParse.includes(rawFileName)) {
          dirStructure[rawFileName] = parseJSON(filePath);
        } else {
          dirStructure._contents.push(fileName);
        }
      }
    });

  return dirStructure;
};

export default parseTree;
