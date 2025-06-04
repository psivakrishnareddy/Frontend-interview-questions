Here’s a clean and accessible **Tabs component in React**, fully functional with:

✅ Keyboard navigation
✅ ARIA roles
✅ Dynamic content switching

---

### 🧱 Tabs Component Structure

```jsx
import React, { useState, useRef, useEffect } from "react";

const tabsData = [
  { id: "tab1", title: "Tab One", content: "This is content for Tab One" },
  { id: "tab2", title: "Tab Two", content: "This is content for Tab Two" },
  { id: "tab3", title: "Tab Three", content: "This is content for Tab Three" },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef([]);

  const handleKeyDown = (e, index) => {
    const lastIndex = tabsData.length - 1;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = index === lastIndex ? 0 : index + 1;
      setActiveTab(nextIndex);
      tabsRef.current[nextIndex].focus();
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = index === 0 ? lastIndex : index - 1;
      setActiveTab(prevIndex);
      tabsRef.current[prevIndex].focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Sample Tabs">
        {tabsData.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[index] = el)}
            role="tab"
            id={tab.id}
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              padding: "8px 16px",
              marginRight: "4px",
              borderBottom: activeTab === index ? "2px solid blue" : "none",
              background: "none",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {tabsData.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={activeTab !== index}
          tabIndex={0}
          style={{
            padding: "16px",
            border: "1px solid #ccc",
            marginTop: "8px",
          }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

### 🧠 Key Accessibility Features:

- `role="tablist"`, `role="tab"`, and `role="tabpanel"`
- `aria-controls` and `aria-labelledby` link tabs and panels
- `aria-selected` to indicate active tab
- `tabIndex` ensures correct keyboard focus
- Arrow key navigation (left/right)

---

Let me know if you want:

- Vertical tabs
- Animated tab switching
- Dynamic tab adding/removing

I can also help convert this into TypeScript or Tailwind styled version if needed.
