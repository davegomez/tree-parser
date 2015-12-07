/* @flow */

import fs from 'fs';

/**
 * Reads the content of a JSON file and returns it as a JavaScript Object
 * @param {string} file JSON file to be parsed
 * @return {Object} JavaScript object with the file data
 */
const parseJSON = (file: string): Object =>
  JSON.parse(
    fs.readFileSync(file, 'utf-8')
  );

export default parseJSON;
