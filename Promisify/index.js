/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  };
}

const promisifyCustomSymbol = Symbol.for('util.promisify.custom');



// n Promisify, the promisify function returns a promise for a function following the common callback-last error-first callback style,
//  i.e. taking a (err, value) => ... callback as the last argument. However, promisify does not work for functions that do not follow that exact signature.

// In Node.js, using the util.promisify.custom symbol, one can override the return value of util.promisify(),
//  which is useful for cases where the original function does not follow the standard format of taking an error-first
//  callback as the last argument. This is especially useful for functions with a legacy format that's incompatible with
//  util.promisify's callback-last convention.
/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  if (func[promisifyCustomSymbol]) {
    return func[promisifyCustomSymbol];
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });
  };
}
