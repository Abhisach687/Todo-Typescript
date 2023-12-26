// Select Elements
const todosWrapper: HTMLElement | null =
  document.querySelector(".todos-wrapper");
const addTodoTitleInput: HTMLInputElement | null =
  document.querySelector(".add-todo-title");
const addTodoDescInput: HTMLInputElement | null =
  document.querySelector(".add-todo-desc");
const addTodoForm: HTMLFormElement | null = document.querySelector(
  ".add-todo-wrapper form"
);
const searchTodoInput: HTMLInputElement | null =
  document.querySelector(".search-todos");
const searchTodoForm: HTMLFormElement | null = document.querySelector(
  ".search-wrapper form"
);
const filterButtons: NodeListOf<Element> = document.querySelectorAll(".filter");

interface Todo {
  id: number;
  title: string;
  description: string;
  complete: boolean;
}

let todos: Todo[] = [];

// Add Todo
function addTodo(e: Event): void {
  e.preventDefault();

  if (addTodoDescInput?.value) {
    todos.push({
      id: Date.now(),
      title: addTodoTitleInput?.value || "",
      description: addTodoDescInput.value,
      complete: false,
    });
  }

  renderTodos();

  addTodoTitleInput!.value = "";
  addTodoDescInput!.value = "";
}

// Delete Todo
function deleteTodo(id: number): void {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  renderTodos();
}

// Toggle Complete
function toggleTodo(id: number): void {
  todos.forEach(function (todo) {
    if (todo.id == id) {
      todo.complete = !todo.complete;
    }
  });

  renderTodos();
}

// Filter Todos
function filterTodos(e: Event): void {
  const filter = (e.target as HTMLElement).dataset.filter;

  let filteredTodos: Todo[] = []; // Initialize with an empty array

  switch (filter) {
    case "all":
      filteredTodos = todos;
      break;

    case "unfinished":
      filteredTodos = todos.filter(function (todo) {
        return !todo.complete;
      });
      break;

    case "finished":
      filteredTodos = todos.filter(function (todo) {
        return todo.complete;
      });
      break;
  }

  // Re-render todos
  renderTodos(filteredTodos);
}

// Search Todos
function searchTodos(e: Event): void {
  e.preventDefault();
  const query: string = searchTodoInput!.value.trim().toLowerCase();

  const filteredTodos: Todo[] = todos.filter(function (todo) {
    const title: string = todo.title.toLowerCase();
    const desc: string = todo.description.toLowerCase();

    return title.includes(query) || desc.includes(query);
  });

  // Re-render todos
  renderTodos(filteredTodos);
}

// Render Todos
function renderTodos(filteredTodos: Todo[] = todos): void {
  todosWrapper!.innerHTML = "";

  filteredTodos.forEach(function (todo) {
    const checked: string = todo.complete ? "checked" : "";

    const item: HTMLDivElement = document.createElement("div");
    item.classList.add("todo-item");
    item.innerHTML = `
                <div class="todo-title-wrapper">
                        <div class="title-checkbox">
                                <input type="checkbox" ${checked} class="checkbox" onclick="toggleTodo(${
      todo.id
    })">
                                <h4 class="${todo.complete ? "finished" : ""}">
                                        ${todo.title}
                                </h4>
                                <p>${todo.description}</p>
                        </div>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
        `;

    todosWrapper!.appendChild(item);
  });
}

// Event Listeners
addTodoForm!.addEventListener("submit", addTodo);
searchTodoForm!.addEventListener("submit", searchTodos);
filterButtons.forEach((btn) => btn.addEventListener("click", filterTodos));
