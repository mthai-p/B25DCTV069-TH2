import { fetchBooks } from './api.js';
import * as store from './storage.js';
import { renderBooks, showMessage, renderGenreOptions, setStatus } from './render.js';
import { validateField, validateAll } from './validate.js';

const $ = (id) => document.getElementById(id);
const grid = $('book-grid');
const statusEl = $('status');
const searchInput = $('search');
const genreFilter = $('genre-filter');
const favCount = $('fav-count');
const form = $('book-form');
const themeBtn = $('theme-toggle');

const state = {
  books: [],
  favorites: store.loadFavorites(),
  deleted: store.loadDeleted(),
  added: store.loadAdded(),
  query: '',
  genre: '',
};

function getVisible() {
  const q = state.query.trim().toLowerCase();
  return state.books.filter(
    (b) => b.title.toLowerCase().includes(q) && (state.genre === '' || b.genre === state.genre)
  );
}

function render() {
  const visible = getVisible();
  renderBooks(grid, visible, state.favorites);
  setStatus(statusEl, visible.length, state.books.length);
  favCount.textContent = state.favorites.size;
}

function refreshGenres() {
  renderGenreOptions(genreFilter, state.books, 'Tất cả thể loại');
  renderGenreOptions($('genre'), state.books, '-- Chọn thể loại --');
}

// ---------- Tải dữ liệu ----------
async function init() {
  applyTheme(store.loadTheme());
  showMessage(grid, 'Đang tải...');
  try {
    const data = await fetchBooks();
    const base = data.filter((b) => !state.deleted.has(b.id));
    state.books = [...state.added, ...base];
    refreshGenres();
    render();
  } catch (err) {
    showMessage(grid, `Không tải được dữ liệu: ${err.message}`, true);
  }
}

// ---------- Tìm kiếm & lọc ----------
searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});
genreFilter.addEventListener('change', (e) => {
  state.genre = e.target.value;
  render();
});

// ---------- Event delegation cho Yêu thích / Xóa ----------
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const card = btn.closest('.card');
  const id = Number(card.dataset.id);
  const book = state.books.find((b) => b.id === id);

  if (btn.dataset.action === 'favorite') {
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    store.saveFavorites(state.favorites);
  } else if (btn.dataset.action === 'delete') {
    if (!confirm(`Bạn có chắc muốn xóa "${book.title}"?`)) return;
    state.books = state.books.filter((b) => b.id !== id);
    state.favorites.delete(id);
    store.saveFavorites(state.favorites);
    // sách thêm tay thì bỏ khỏi danh sách added, sách gốc thì ghi vào deleted
    if (state.added.some((b) => b.id === id)) {
      state.added = state.added.filter((b) => b.id !== id);
      store.saveAdded(state.added);
    } else {
      state.deleted.add(id);
      store.saveDeleted(state.deleted);
    }
    refreshGenres();
  }
  render();
});

// ---------- Form thêm sách ----------
function showError(name, msg) {
  form.querySelector(`[data-error-for="${name}"]`).textContent = msg;
  form.elements[name].classList.toggle('invalid', Boolean(msg));
}

['title', 'author', 'genre', 'year'].forEach((name) => {
  const field = form.elements[name];
  field.addEventListener(name === 'genre' ? 'change' : 'input', () =>
    showError(name, validateField(name, field.value))
  );
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  const errors = validateAll(values);
  ['title', 'author', 'genre', 'year'].forEach((n) => showError(n, errors[n] ?? ''));
  if (Object.keys(errors).length > 0) return;

  const book = {
    id: Date.now(),
    title: values.title.trim(),
    author: values.author.trim(),
    genre: values.genre,
    year: Number(values.year),
  };
  state.books.unshift(book); // hiển thị ở đầu danh sách
  state.added.unshift(book);
  store.saveAdded(state.added);
  form.reset();
  refreshGenres();
  render();
});

// ---------- Chế độ sáng/tối (nâng cao) ----------
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '☀️ Sáng' : '🌙 Tối';
}
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  store.saveTheme(next);
});

init();
