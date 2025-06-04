/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  // throw 'Not implemented!';
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.call(this, ...args)
    }
    return curried.bind(this, ...args);
  }
}