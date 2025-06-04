/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  // console.log(this) // this - is the Array Object we will use for the prototype
  // [0, 2,4]
  if (typeof callbackFn !=='function'
  || !callbackFn.call || !callbackFn.apply) {
    throw new TypeError(`${callbackFn} is not a function`);
  }
  const len = this.length;
  const results = []
  let to = 0; // new Array Index Tracker instead of Push

  for (let k =0; k< len; k++) { // Iterate over the array
    const kValue = this[k]; //this[k] is the array value
    // if index is present and callback is tre
    if (Object.hasOwn(this, k) && callbackFn.call(thisArg, kValue, k, this)) //hasOwn checks if array has that index
    {
      results[to] = kValue;
      to+=1
    }
  }
  return results;
};

