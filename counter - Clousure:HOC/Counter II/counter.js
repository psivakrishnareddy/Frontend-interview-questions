/**
 * @param {number} initialValue
 * @return {{get: Function, increment: Function, decrement: Function, reset: Function }}
 */
export default function makeCounter(initialValue = 0) {
  let value = initialValue;
  return {
    get: () => value,
    increment: () => ++value,
    decrement: () => --value,
    reset: () => {
      value = initialValue;
      return value;
    },
  };
}


class Counter {
  constructor(initialValue = 0) {
    this.initialValue = initialValue;
    this.value = initialValue;
  }
  get() {
    return this.value;
  }
  increment() {
    return ++this.value;
  }
  decrement() {
    return --this.value;
  }
  reset() {
    this.value = this.initialValue;
    return this.value;
  }
}

/**
 * @param {number} initialValue
 * @return {{get: Function, increment: Function, decrement: Function, reset: Function }}
 */
export default function makeCounter(initialValue = 0) {
  return new Counter(initialValue);
}
