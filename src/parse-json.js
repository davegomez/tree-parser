/* @flow */

import fs from 'fs';

const parseJSON = (file: string): Object =>
  JSON.parse(
    fs.readFileSync(file, 'utf-8')
  );

export default parseJSON;
