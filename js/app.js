/* =========================================================
   PERSONAL DASHBOARD — app.js
   All features: greeting, timer, to-do, quick links,
                 light/dark mode, custom name
   ========================================================= */

'use strict';

// ─── LocalStorage keys ────────────────────────────────────
const KEY_NAME  = 'dashboard_name';
const KEY_THEME = 'dashboard_theme';
const KEY_TODOS = 'dashboard_todos';
const KEY_LINKS = 'dashboard_links';

// ─── DOM refs ─────────────────────────────────────────────
const datetimeEl     = document.getElementById('datetime');
const greetingTextEl = document.getElementById('greeting-text');
const greetingNameEl = document.getElementById('greeting-name');
const editNameBtn    = document.getElementById('edit-name-btn');

const nameModal      = document.getElementById('name-modal');
const nameInput      = document.getElementById('name-input');
const nameSaveBtn    = document.getElementById('name-save-btn');
const nameCancelBtn  = document.getElementById('name-cancel-btn');

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon      = document.getElementById('theme-icon');

const timerDisplay   = document.getElementById('timer-display');
const timerStartBtn  = document.getElementById('timer-start');
const timerStopBtn   = document.getElementById('timer-stop');
const timerResetBtn  = document.getElementById('timer-reset');
const timerStatus    = document.getElementById('timer-status');

const todoInput      = document.getElementById('todo-input');
const todoAddBtn     = document.getElementById('todo-add-btn');
const todoListEl     = document.getElementById('todo-list');
const todoErrorEl    = document.getElementById('todo-error');
const todoCountEl    = document.getElementById('todo-count');
const todoClearBtn   = document.getElementById('todo-clear-btn');

const linkNameInput  = document.getElementById('link-name-input');
const linkUrlInput   = document.getElementById('link-url-input');
const linkAddBtn     = document.getElementById('link-add-btn');
const linksGrid      = document.getElementById('links-grid');
const linkErrorEl    = document.getElementById('link-error');

/* ==========================================================
   1. DATE / TIME & GREETING
   ========================================================== */

const GREETINGS = {
  morning:   'Good morning',
  afternoon: 'Good afternoon',
  evening:   'Good evening',
  night:     'Good night',
};

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

function formatDateTime() {
  const now  = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const day    = days[now.getDay()];
  const date   = now.getDate();
  const month  = months[now.getMonth()];
  const year   = now.getFullYear();
  const hh     = String(now.getHours()).padStart(2, '0');
  const mm     = String(now.getMinutes()).padStart(2, '0');
  const ss     = String(now.getSeconds()).padStart(2, '0');
  return `${day}, ${date} ${month} ${year} &nbsp;|&nbsp; ${hh}:${mm}:${ss}`;
}

function updateClock() {
  datetimeEl.innerHTML = formatDateTime();
  const tod = getTimeOfDay();
  greetingTextEl.textContent = GREETINGS[tod] + (greetingNameEl.textContent ? ',' : '!');
}

// Update every second
setInterval(updateClock, 1000);
updateClock();

/* ==========================================================
   2. CUSTOM NAME
   ========================================================== */

function loadName() {
  const saved = localStorage.getItem(KEY_NAME);
  if (saved) {
    greetingNameEl.textContent = saved + '!';
    greetingTextEl.textContent = GREETINGS[getTimeOfDay()] + ',';
  }
}

function openNameModal() {
  const current = localStorage.getItem(KEY_NAME) || '';
  nameInput.value = current;
  nameModal.classList.remove('hidden');
  nameInput.focus();
}

function closeNameModal() {
  nameModal.classList.add('hidden');
}

function saveName() {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem(KEY_NAME, name);
    greetingNameEl.textContent = name + '!';
    greetingTextEl.textContent = GREETINGS[getTimeOfDay()] + ',';
  } else {
    localStorage.removeItem(KEY_NAME);
    greetingNameEl.textContent = '';
    greetingTextEl.textContent = GREETINGS[getTimeOfDay()] + '!';
  }
  closeNameModal();
}

editNameBtn.addEventListener('click', openNameModal);
nameSaveBtn.addEventListener('click', saveName);
nameCancelBtn.addEventListener('click', closeNameModal);

// Save on Enter key in modal input
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveName();
  if (e.key === 'Escape') closeNameModal();
});

// Close modal when clicking outside the card
nameModal.addEventListener('click', (e) => {
  if (e.target === nameModal) closeNameModal();
});

loadName();

/* ==========================================================
   3. LIGHT / DARK MODE
   ========================================================== */

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem(KEY_THEME, theme);
}

function loadTheme() {
  const saved = localStorage.getItem(KEY_THEME) || 'light';
  applyTheme(saved);
}

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

loadTheme();

/* ==========================================================
   4. FOCUS TIMER
   ========================================================== */

const TIMER_DURATION = 25 * 60; // seconds
let timerSeconds     = TIMER_DURATION;
let timerInterval    = null;
let timerRunning     = false;

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerStartBtn.disabled = true;
  timerStopBtn.disabled  = false;
  timerStatus.textContent = 'Focusing… stay on task! 💪';

  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerStartBtn.disabled = false;
      timerStopBtn.disabled  = true;
      timerStatus.textContent = '🎉 Session complete! Take a break.';
      timerDisplay.textContent = '00:00';
      return;
    }
    timerSeconds--;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  if (!timerRunning) return;
  clearInterval(timerInterval);
  timerRunning = false;
  timerStartBtn.disabled = false;
  timerStopBtn.disabled  = true;
  timerStatus.textContent = 'Paused. Resume when ready.';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning   = false;
  timerSeconds   = TIMER_DURATION;
  timerStartBtn.disabled = false;
  timerStopBtn.disabled  = true;
  renderTimer();
  timerStatus.textContent = 'Ready to focus!';
}

timerStartBtn.addEventListener('click', startTimer);
timerStopBtn.addEventListener('click', stopTimer);
timerResetBtn.addEventListener('click', resetTimer);

renderTimer();

/* ==========================================================
   5. TO-DO LIST
   ========================================================== */

let todos = [];

function loadTodos() {
  try {
    todos = JSON.parse(localStorage.getItem(KEY_TODOS)) || [];
  } catch {
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
}

function isDuplicateTask(text) {
  const normalized = text.trim().toLowerCase();
  return todos.some(t => t.text.trim().toLowerCase() === normalized);
}

function showTodoError(msg) {
  todoErrorEl.textContent = msg;
  todoErrorEl.classList.remove('hidden');
  setTimeout(() => todoErrorEl.classList.add('hidden'), 3000);
}

function updateTodoCount() {
  const total  = todos.length;
  const done   = todos.filter(t => t.done).length;
  todoCountEl.textContent = `${total} task${total !== 1 ? 's' : ''} (${done} done)`;
}

function renderTodos() {
  todoListEl.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.done ? ' done' : ''}`;
    li.dataset.index = index;

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type      = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked   = todo.done;
    checkbox.setAttribute('aria-label', `Mark "${todo.text}" as done`);
    checkbox.addEventListener('change', () => toggleTodo(index));

    // Text span
    const textSpan = document.createElement('span');
    textSpan.className   = 'todo-text';
    textSpan.textContent = todo.text;

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const editBtn = document.createElement('button');
    editBtn.className   = 'todo-btn';
    editBtn.textContent = '✏️';
    editBtn.title       = 'Edit task';
    editBtn.setAttribute('aria-label', `Edit task: ${todo.text}`);
    editBtn.addEventListener('click', () => startEditTodo(index, li, textSpan));

    const deleteBtn = document.createElement('button');
    deleteBtn.className   = 'todo-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.title       = 'Delete task';
    deleteBtn.setAttribute('aria-label', `Delete task: ${todo.text}`);
    deleteBtn.addEventListener('click', () => deleteTodo(index));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(actions);
    todoListEl.appendChild(li);
  });

  updateTodoCount();
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    showTodoError('Please enter a task.');
    todoInput.focus();
    return;
  }
  if (isDuplicateTask(text)) {
    showTodoError('This task already exists!');
    todoInput.select();
    return;
  }
  todos.push({ text, done: false });
  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function startEditTodo(index, li, textSpan) {
  // Replace text span with an input
  const editInput = document.createElement('input');
  editInput.type      = 'text';
  editInput.className = 'todo-edit-input';
  editInput.value     = todos[index].text;
  editInput.maxLength = 100;

  li.replaceChild(editInput, textSpan);
  editInput.focus();
  editInput.select();

  function commitEdit() {
    const newText = editInput.value.trim();
    if (!newText) {
      // Revert if empty
      li.replaceChild(textSpan, editInput);
      return;
    }
    // Check duplicate (ignore own text)
    const normalized = newText.toLowerCase();
    const isDup = todos.some((t, i) => i !== index && t.text.trim().toLowerCase() === normalized);
    if (isDup) {
      showTodoError('Another task with that name already exists!');
      editInput.select();
      return;
    }
    todos[index].text = newText;
    saveTodos();
    renderTodos();
  }

  editInput.addEventListener('blur', commitEdit);
  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { editInput.blur(); }
    if (e.key === 'Escape') {
      editInput.removeEventListener('blur', commitEdit);
      li.replaceChild(textSpan, editInput);
    }
  });
}

function clearDoneTodos() {
  todos = todos.filter(t => !t.done);
  saveTodos();
  renderTodos();
}

todoAddBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });
todoClearBtn.addEventListener('click', clearDoneTodos);

loadTodos();
renderTodos();

/* ==========================================================
   6. QUICK LINKS
   ========================================================== */

let links = [];

function loadLinks() {
  try {
    links = JSON.parse(localStorage.getItem(KEY_LINKS)) || [];
  } catch {
    links = [];
  }
}

function saveLinks() {
  localStorage.setItem(KEY_LINKS, JSON.stringify(links));
}

function showLinkError(msg) {
  linkErrorEl.textContent = msg;
  linkErrorEl.classList.remove('hidden');
  setTimeout(() => linkErrorEl.classList.add('hidden'), 3000);
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function renderLinks() {
  linksGrid.innerHTML = '';

  links.forEach((link, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'link-wrapper';

    const anchor = document.createElement('a');
    anchor.href            = link.url;
    anchor.textContent     = link.label;
    anchor.className       = 'link-chip';
    anchor.target          = '_blank';
    anchor.rel             = 'noopener noreferrer';
    anchor.setAttribute('aria-label', `Open ${link.label}`);

    const deleteBtn = document.createElement('button');
    deleteBtn.className   = 'link-delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.title       = `Remove ${link.label}`;
    deleteBtn.setAttribute('aria-label', `Remove link: ${link.label}`);
    deleteBtn.addEventListener('click', () => deleteLink(index));

    wrapper.appendChild(anchor);
    wrapper.appendChild(deleteBtn);
    linksGrid.appendChild(wrapper);
  });
}

function addLink() {
  const label = linkNameInput.value.trim();
  const rawUrl = linkUrlInput.value.trim();

  if (!label) {
    showLinkError('Please enter a label for the link.');
    linkNameInput.focus();
    return;
  }

  // Auto-prepend https:// if missing
  const url = rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl;

  if (!isValidUrl(url)) {
    showLinkError('Please enter a valid URL (e.g. https://example.com).');
    linkUrlInput.focus();
    return;
  }

  links.push({ label, url });
  saveLinks();
  renderLinks();
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  linkNameInput.focus();
}

function deleteLink(index) {
  links.splice(index, 1);
  saveLinks();
  renderLinks();
}

linkAddBtn.addEventListener('click', addLink);
linkUrlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addLink(); });
linkNameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') linkUrlInput.focus(); });

loadLinks();
renderLinks();
