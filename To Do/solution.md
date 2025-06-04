✅ Updated JavaScript (todo.js)
js
Copy
Edit
let tasks = [];

// Load from localStorage on startup
function loadTasks() {
const stored = localStorage.getItem("tasks");
if (stored) {
tasks = JSON.parse(stored);
}
}

// Save to localStorage
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

form.addEventListener("submit", (e) => {
e.preventDefault();
const text = input.value.trim();
if (text) {
tasks.push({
id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
text,
completed: false,
createdAt: new Date().toISOString()
});
input.value = "";
saveTasks();
renderTasks();
}
});

function renderTasks() {
list.innerHTML = "";

let filteredTasks = [...tasks];

const filter = filterSelect.value;
if (filter === "completed") {
filteredTasks = filteredTasks.filter(t => t.completed);
} else if (filter === "incomplete") {
filteredTasks = filteredTasks.filter(t => !t.completed);
}

const sort = sortSelect.value;
filteredTasks.sort((a, b) =>
sort === "newest"
? new Date(b.createdAt) - new Date(a.createdAt)
: new Date(a.createdAt) - new Date(b.createdAt)
);

for (const task of filteredTasks) {
const li = document.createElement("li");
li.className = "todo";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, editBtn, delBtn);
    list.appendChild(li);

}
}

function toggleComplete(id) {
const task = tasks.find(t => t.id === id);
if (task) {
task.completed = !task.completed;
saveTasks();
renderTasks();
}
}

function deleteTask(id) {
tasks = tasks.filter(t => t.id !== id);
saveTasks();
renderTasks();
}

function editTask(id) {
const task = tasks.find(t => t.id === id);
if (task) {
const newText = prompt("Edit task:", task.text);
if (newText !== null) {
task.text = newText.trim();
saveTasks();
renderTasks();
}
}
}

filterSelect.addEventListener("change", renderTasks);
sortSelect.addEventListener("change", renderTasks);

// Initialize
loadTasks();
renderTasks();
