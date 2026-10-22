// Lưu dữ liệu bằng JSON + localStorage
const KEYS = { favorites: 'lib:favorites', added: 'lib:added', deleted: 'lib:deleted', theme: 'lib:theme' };

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const loadFavorites = () => new Set(read(KEYS.favorites, []));
export const saveFavorites = (set) => write(KEYS.favorites, [...set]);
export const loadAdded = () => read(KEYS.added, []);
export const saveAdded = (arr) => write(KEYS.added, arr);
export const loadDeleted = () => new Set(read(KEYS.deleted, []));
export const saveDeleted = (set) => write(KEYS.deleted, [...set]);
export const loadTheme = () => read(KEYS.theme, 'light');
export const saveTheme = (t) => write(KEYS.theme, t);
