<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>To-Do App Enhanced</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 2rem;
      max-width: 600px;
      margin: auto;
    }
    ul {
      padding: 0;
      list-style: none;
    }
    li {
      background: #f4f4f4;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;
    }
    .done {
      text-decoration: line-through;
      color: gray;
    }
    button {
      margin-left: 10px;
    }
    .controls {
      margin-bottom: 1rem;
    }
    .controls select, .controls input[type="radio"] {
      margin-right: 1rem;
    }
  </style>
</head>
<body>
  <h1>To-Do App</h1>

  <form id="todo-form" aria-label="Add new task">
    <input id="todo-input" type="text" aria-label="Enter a new task" required placeholder="Add a task" />
    <button type="submit">Add</button>
  </form>

  <div class="controls">
    <label><input type="radio" name="filter" value="all" checked /> All</label>
    <label><input type="radio" name="filter" value="active" /> Active</label>
    <label><input type="radio" name="filter" value="completed" /> Completed</label>

    <select id="sort">
      <option value="date-desc">Newest</option>
      <option value="date-asc">Oldest</option>
      <option value="completed">Completed First</option>
      <option value="active">Active First</option>
    </select>
  </div>

  <ul id="todo-list" role="list" aria-label="To-Do list"></ul>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("todo-form");
      const input = document.getElementById("todo-input");
      const list = document.getElementById("todo-list");
      const filters = document.querySelectorAll("input[name='filter']");
      const sortSelect = document.getElementById("sort");

      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let currentFilter = "all";
      let currentSort = "date-desc";

      const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

      const render = () => {
        let filteredTasks = tasks.filter(task => {
          if (currentFilter === "completed") return task.done;
          if (currentFilter === "active") return !task.done;
          return true;
        });

        filteredTasks.sort((a, b) => {
          switch (currentSort) {
            case "date-asc": return a.date - b.date;
            case "date-desc": return b.date - a.date;
            case "completed": return (b.done - a.done);
            case "active": return (a.done - b.done);
            default: return 0;
          }
        });

        list.innerHTML = "";
        filteredTasks.forEach((task, index) => {
          const li = document.createElement("li");
          li.setAttribute("role", "listitem");

          const span = document.createElement("span");
          span.textContent = task.text;
          span.className = task.done ? "done" : "";
          span.setAttribute("aria-checked", task.done);
          span.setAttribute("role", "checkbox");
          span.style.cursor = "pointer";
          span.addEventListener("click", () => {
            task.done = !task.done;
            saveTasks();
            render();
          });

          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim()) {
              task.text = newText.trim();
              saveTasks();
              render();
            }
          });

          const delBtn = document.createElement("button");
          delBtn.textContent = "Delete";
          delBtn.setAttribute("aria-label", `Delete task: ${task.text}`);
          delBtn.addEventListener("click", () => {
            tasks.splice(tasks.indexOf(task), 1);
            saveTasks();
            render();
          });

          li.appendChild(span);
          li.appendChild(editBtn);
          li.appendChild(delBtn);
          list.appendChild(li);
        });
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
          tasks.push({ text, done: false, date: Date.now() });
          saveTasks();
          render();
          input.value = "";
        }
      });

      filters.forEach(filter => {
        filter.addEventListener("change", (e) => {
          currentFilter = e.target.value;
          render();
        });
      });

      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        render();
      });

      render();
    });
  </script>
</body>
</html>
