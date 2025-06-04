/**
 * @param {number} value
 * @return {Function}
 */
export default function sum(a) {
  if (a === undefined) throw "A is not found";
  return function (b) {
    // if (b) return sum(value + b)

    return b !== undefined ? sum(a + b) : a; // Check with undefined if we need 0 else
  };
}
