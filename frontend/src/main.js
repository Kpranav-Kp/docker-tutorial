const API_URL = 'http://localhost:3001/api/todos';

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  renderTodos(todos);
}

async function addTodo() {
  const input = document.getElementById('newTodo');
  const text = input.value.trim();
  if (!text) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  input.value = '';
  fetchTodos();
}

async function toggleTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'PUT' });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

function renderTodos(todos) {
  const container = document.getElementById('todoList');
  container.innerHTML = '';
  todos.forEach(todo => {
    const div = document.createElement('div');
    div.className = 'todo';
    div.innerHTML = `
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button onclick="toggleTodo(${todo.id})">✔️</button>
      <button onclick="deleteTodo(${todo.id})">❌</button>
    `;
    container.appendChild(div);
  });
}

window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;

document.getElementById('addBtn').onclick = addTodo;
fetchTodos();