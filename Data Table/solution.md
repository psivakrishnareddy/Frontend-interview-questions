Here’s a **vanilla JavaScript implementation** of a **Data Table** with:

- Pagination
- Page size selection
- **Search box with ARIA support**
- **Column sorting** (ascending/descending)
- Accessibility considerations (`aria-label`, semantic roles)

---

### ✅ HTML

```html
<div>
  <label for="searchBox">Search:</label>
  <input
    id="searchBox"
    aria-label="Search users"
    type="text"
    placeholder="Search users..."
  />
</div>

<table id="dataTable" role="table">
  <thead role="rowgroup">
    <tr role="row" id="tableHeader"></tr>
  </thead>
  <tbody role="rowgroup" id="tableBody"></tbody>
</table>

<div class="controls">
  <label for="pageSize">Page Size:</label>
  <select id="pageSize" aria-label="Select page size">
    <option value="5">Show 5</option>
    <option value="10">Show 10</option>
    <option value="20">Show 20</option>
  </select>

  <button id="prevBtn">Prev</button>
  <span id="pageIndicator" aria-label="Page number">Page 1</span>
  <button id="nextBtn">Next</button>
</div>
```

---

### ✅ JavaScript

```js
const users = [
  { id: 1, name: "Alice", age: 28, occupation: "Engineer" },
  { id: 2, name: "Bob", age: 25, occupation: "Designer" },
  { id: 3, name: "Carol", age: 30, occupation: "Writer" },
  { id: 4, name: "David", age: 22, occupation: "Engineer" },
  { id: 5, name: "Eva", age: 29, occupation: "Doctor" },
  { id: 6, name: "Frank", age: 32, occupation: "Lawyer" },
  { id: 7, name: "Grace", age: 26, occupation: "Teacher" },
  { id: 8, name: "Helen", age: 27, occupation: "Nurse" },
  { id: 9, name: "Ian", age: 31, occupation: "Pilot" },
  { id: 10, name: "Jane", age: 24, occupation: "Artist" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "occupation", label: "Occupation" },
];

let currentPage = 1;
let pageSize = 5;
let searchTerm = "";
let sortKey = null;
let sortOrder = 1;

const tableHeader = document.getElementById("tableHeader");
const tableBody = document.getElementById("tableBody");
const pageSizeSelect = document.getElementById("pageSize");
const pageIndicator = document.getElementById("pageIndicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchBox = document.getElementById("searchBox");

function renderHeader() {
  tableHeader.innerHTML = "";
  columns.forEach((col) => {
    const th = document.createElement("th");
    th.setAttribute("role", "columnheader");
    th.style.cursor = "pointer";
    th.setAttribute("aria-label", `Sort by ${col.label}`);
    th.textContent =
      col.label + (sortKey === col.key ? (sortOrder > 0 ? " ↑" : " ↓") : "");
    th.addEventListener("click", () => {
      if (sortKey === col.key) sortOrder *= -1;
      else {
        sortKey = col.key;
        sortOrder = 1;
      }
      renderTable();
    });
    tableHeader.appendChild(th);
  });
}

function getFilteredSortedUsers() {
  return users
    .filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (a[sortKey] < b[sortKey]) return -1 * sortOrder;
      if (a[sortKey] > b[sortKey]) return 1 * sortOrder;
      return 0;
    });
}

function renderTable() {
  const filteredUsers = getFilteredSortedUsers();
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);

  tableBody.innerHTML = "";
  paginatedUsers.forEach((user) => {
    const tr = document.createElement("tr");
    tr.setAttribute("role", "row");
    columns.forEach((col) => {
      const td = document.createElement("td");
      td.setAttribute("role", "cell");
      td.textContent = user[col.key];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Event Listeners
pageSizeSelect.addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value, 10);
  currentPage = 1;
  renderTable();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  renderTable();
});

searchBox.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  currentPage = 1;
  renderTable();
});

// Init
renderHeader();
renderTable();
```

---

### 🧠 Cheatsheet Summary for this Widget

| Feature             | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| Pagination          | Slice data based on `page` and `pageSize`                               |
| Search              | Filter `users` array with `Array.prototype.filter()`                    |
| Sorting             | Sort by column key; toggle ascending/descending                         |
| ARIA Accessibility  | `aria-label` on buttons, input, headers; `role="table"`, `columnheader` |
| Keyboard Navigation | Can be added using `tabindex`, arrow keys, and `aria-activedescendant`  |

---

Let me know if you want:

- Export to CSV
- Add checkboxes for selection
- Editable rows
- React version of this table
