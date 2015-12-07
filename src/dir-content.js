/* @flow */

import fs from 'fs';

/**
 * Creates an array list of string elements representing the file names inside a
 * given directory
 * @param {string} dirPath Directory path to be parsed
 * @return {Object} List of file names inside a given directory
 */
const dirContent = (dirPath: string): Array<string> =>
  fs.readdirSync(dirPath)
    .filter(name => name.charAt(0) !== '.')
    .map(file => `${dirPath}/${file}`);

export default dirContent;
