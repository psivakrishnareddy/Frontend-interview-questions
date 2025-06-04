Perfect! Let’s enhance the React **nested checkbox tree** by adding **indeterminate states** (when only some children are selected).

This will cover:

- ✅ Controlled checkbox state within `nodesList`
- ✅ Parent auto-check when all children are checked
- ✅ Parent **indeterminate** when **some** children are checked
- ✅ **Accessibility** with `aria-checked="mixed"`

---

### 🧠 1. Data Structure

We’ll add an `indeterminate: boolean` property to each node:

```js
const initialNodes = [
  {
    id: 1,
    label: "Fruits",
    checked: false,
    indeterminate: false,
    children: [
      {
        id: 2,
        label: "Apple",
        checked: false,
        indeterminate: false,
        children: [],
      },
      {
        id: 3,
        label: "Banana",
        checked: false,
        indeterminate: false,
        children: [],
      },
    ],
  },
  {
    id: 4,
    label: "Vegetables",
    checked: false,
    indeterminate: false,
    children: [
      {
        id: 5,
        label: "Leafy",
        checked: false,
        indeterminate: false,
        children: [
          {
            id: 6,
            label: "Spinach",
            checked: false,
            indeterminate: false,
            children: [],
          },
        ],
      },
    ],
  },
];
```

---

### 🧩 2. Update Utilities

```js
// Update a node and ALL its children recursively
const updateNodeChecked = (nodes, id, checked) => {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        checked,
        indeterminate: false,
        children: node.children.map((child) =>
          setAllChildrenChecked(child, checked)
        ),
      };
    }
    return {
      ...node,
      children: updateNodeChecked(node.children, id, checked),
    };
  });
};

const setAllChildrenChecked = (node, checked) => ({
  ...node,
  checked,
  indeterminate: false,
  children: node.children.map((child) => setAllChildrenChecked(child, checked)),
});

// After changing children, update parent check/indeterminate states
const updateParentState = (nodes) => {
  return nodes.map((node) => {
    const children = updateParentState(node.children);
    if (children.length) {
      const allChecked = children.every(
        (child) => child.checked && !child.indeterminate
      );
      const noneChecked = children.every(
        (child) => !child.checked && !child.indeterminate
      );
      const isIndeterminate = !allChecked && !noneChecked;

      return {
        ...node,
        checked: allChecked,
        indeterminate: isIndeterminate,
        children,
      };
    }
    return node;
  });
};
```

---

### 🧱 3. React Component

```jsx
import React, { useState, useEffect, useRef } from "react";

const CheckboxTree = () => {
  const [nodes, setNodes] = useState(initialNodes);

  const handleCheck = (id, checked) => {
    let updated = updateNodeChecked(nodes, id, checked);
    updated = updateParentState(updated);
    setNodes(updated);
  };

  const renderTree = (nodes) => {
    return (
      <ul role="group" style={{ listStyle: "none", paddingLeft: 20 }}>
        {nodes.map((node) => (
          <CheckboxNode key={node.id} node={node} onCheck={handleCheck} />
        ))}
      </ul>
    );
  };

  return (
    <div role="tree" aria-label="Nested Checkbox Tree">
      {renderTree(nodes)}
    </div>
  );
};

const CheckboxNode = ({ node, onCheck }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = node.indeterminate;
    }
  }, [node.indeterminate]);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          ref={ref}
          checked={node.checked}
          onChange={(e) => onCheck(node.id, e.target.checked)}
          aria-checked={
            node.indeterminate ? "mixed" : node.checked ? "true" : "false"
          }
        />
        {node.label}
      </label>
      {node.children.length > 0 && (
        <ul role="group" style={{ listStyle: "none", paddingLeft: 20 }}>
          {node.children.map((child) => (
            <CheckboxNode key={child.id} node={child} onCheck={onCheck} />
          ))}
        </ul>
      )}
    </li>
  );
};
```

---

### ✅ Summary of Features

| Feature                       | ✅ Implemented |
| ----------------------------- | -------------- |
| Tree state stored in one list | ✅             |
| Select parent → select all    | ✅             |
| Unselect some → parent mixed  | ✅             |
| Indeterminate state support   | ✅             |
| Accessibility (`aria-*`)      | ✅             |

---

Would you like to:

- Load/save this to a backend?
- Add expand/collapse behavior?
- Add a “Select All” button?

Let me know!
