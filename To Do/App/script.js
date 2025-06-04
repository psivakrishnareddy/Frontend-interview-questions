window.addEventListener("DOMContentLoaded", () => {
  // DOM ELEMENTS
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const filters = document.getElementsByName("filter");
  const sortSelect = document.getElementById("sort");
  const list = document.querySelector(".to-do-list");
  let tasks = [];
  let currentFilter = "all";

  // STORAGE
  function loadTasks() {
    storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = storedTasks;
  }

  function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Initialise Tasks List
  function filterTasks() {
    return tasks.filter((task) => {
      if (currentFilter == "completed") return task.completed;
      if (currentFilter == "incomplete") return !task.completed;
      return true;
    });
  }

  function toggleComplete(id) {
    let task = tasks.find((task) => task.id == id);
    task.completed = !task.completed;
    render();
  }

  function editTask(id) {}

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id != id);
    render();
  }

  //Render
  function render() {
    list.innerHTML = "";
    let filteredTasks = filterTasks();

    filteredTasks.sort((a, b) => {
      return sortSelect.value == "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

    filteredTasks.forEach((task) => {
      // DOM
      const li = document.createElement("li");
      li.role = "listitem";
      li.id = task.id;
      li.className = "todo";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleComplete(task.id));

      const span = document.createElement("span");
      span.textContent = task.name;
      if (task.completed) span.classList.add("completed");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editTask(task.id));

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => deleteTask(task.id));

      li.append(checkbox, span, editBtn, delBtn);
      list.appendChild(li);
    });
  }

  // Add Task
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let taskName = input.value.trim();
    if (taskName !== "") {
      tasks.push({
        id: Math.random(10).toString(36).substring(2),
        name: taskName,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      input.value = "";
      storeTasks();
      render();
    }
  });

  //INIT
  loadTasks();
  render();

  filters.forEach((filter) => {
    filter.addEventListener("change", (e) => {
      currentFilter = e.target.value;
      render();
    });

    sortSelect.addEventListener("change", render);
  });
});
