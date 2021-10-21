/**
 * @param array
 * @returns {Boolean}
 */
export const isNotEmptyArray = array => Array.isArray(array) && array.length > 0;

export const groupArrayByKeys = (array, key) => {
  return array.reduce((acc, curr) => {
    if (curr[key] === undefined) return acc;
    return Object.assign(acc, { [curr[key]]: (acc[curr[key]] || []).concat(curr) });
  }, {});
};

