/**
 * @template {Function} T
 * @param {T} func
 * @return {T}
 */
export default function once(func) {
  let ranOnce = false; // Uses the concept of Closures
  let value;
  return function (...args) {
    if (!ranOnce) {
      value = func.apply(this, [...args]);
      ranOnce = true;
    }
    return value;
  };
}
let i = 1;

function incrementBy(value) {
  i += value;
  return i;
}

const incrementByOnce = once(incrementBy);
incrementByOnce(2); // i is now 3; The function returns 3.
incrementByOnce(3); // i is still 3; The function returns the result of the first invocation, which is 3.
i = 4;
incrementByOnce(2); // i is still 4 as it is not modified. The function returns the result of the first invocation, which is 3.
