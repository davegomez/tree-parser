/* @flow */

/**
 * Helper function to replace Babel-Polyfill's Array.includes function
 * @param {Object} list Array list of any type
 * @param {Object} elem Object to look for inside the array list
 * @return {Boolean}
 */
export default (list: Array<any>, elem: any): boolean =>
  list.indexOf(elem) !== -1;
