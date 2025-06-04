Great question!

Let’s walk through how the `promisify` function works and how the callback arguments are **accessible and used**.

---

### 🔁 Original Problem:

You have a **Node-style callback function** like this:

```js
function myCallbackFunc(arg1, arg2, callback) {
  // Node-style: callback(err, result)
  setTimeout(() => {
    if (arg1 < 0) callback(new Error("Invalid number"));
    else callback(null, arg1 + arg2);
  }, 100);
}
```

---

### ✅ Goal:

Convert it into a **Promise-based** function like:

```js
const asyncFunc = promisify(myCallbackFunc);
asyncFunc(1, 2).then(console.log).catch(console.error);
```

---

### 📦 Explanation of Your `promisify` Function

```js
export default function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  };
}
```

#### 🔍 What's Happening?

1. **`promisify(func)`** returns a new function that wraps `func` in a `Promise`.

2. **`...args`** collects all arguments you pass to the returned function **except** the callback.

3. The callback `(err, result) => {}` is appended manually to the arguments and passed to `func`.

4. The callback function is where:

   - `err` is the error (if any)
   - `result` is the success value
   - The function chooses to `resolve(result)` or `reject(err)`

#### ⚙️ Why `call(this, ...args, callback)`?

- `.call(this, ...)` preserves the `this` context in case `func` uses `this`.
- `...args` are your actual arguments like `1, 2` in the example.
- The final callback `(err, result)` is what makes the `Promise` work.

---

### 🧠 Summary: How `err` and `result` are accessible?

They're available because:

- `promisify` appends a **custom callback** to the original function.
- That callback receives `(err, result)` from the original function.
- You control what happens with `err` and `result` by resolving or rejecting the `Promise`.

---

Let me know if you'd like a TypeScript version or real-world examples with `fs.readFile`, etc.
