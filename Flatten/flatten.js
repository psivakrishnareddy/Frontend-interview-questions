/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  // flatMap is a function in js that will flatten an array
  return Array.isArray(value) ? value.flatMap((item)=> flatten(item)) : value;
}

// type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value){
  while (value.some(Array.isArray)) {
    value = [].concat(...value); // Concant usually merges
  }

  return value;
}


// INPLACE

export default function flatten(value){
  for (let i = 0; i < value.length; ) {
    if (Array.isArray(value[i])) {
      value.splice(i, 1, ...value[i]); // Splice removes a value at Index, till where to remove, Replcae Value, if 0 is second arg then array insert is happening
    } else {
      i++;
    }
  }

  return value;
}



export default function flatten(value) {
  return JSON.parse('[' + JSON.stringify(value).replace(/(\[|\])/g, '') + ']');
}

export default function flatten(arr) {
  return arr.flat(Infinity);
}