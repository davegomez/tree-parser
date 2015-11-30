/* @flow */

import fs from 'fs';

const dirContent = (dirPath: string): Array<string> =>
  fs.readdirSync(dirPath)
    .filter(name => name.charAt(0) !== '.')
    .map(file => `${dirPath}/${file}`);

export default dirContent;
