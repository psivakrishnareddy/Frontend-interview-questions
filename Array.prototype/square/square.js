/**
 * @return {Array<number>}
 */
Array.prototype.square = function () {
  const len = this.length;
  const res = new Array(len);

  for(let i = 0;i < len; i++) {
    if (Object.hasOwn(this, i)) {
      let aValue = this[i];
      res[i] = aValue * aValue;
    }
  }
  return res;
};