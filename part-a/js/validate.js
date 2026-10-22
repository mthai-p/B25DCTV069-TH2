// Validate form thêm sách
const currentYear = new Date().getFullYear();

const rules = {
  title: (v) => (v.trim().length < 3 ? 'Tên sách phải từ 3 ký tự.' : ''),
  author: (v) => (v.trim() === '' ? 'Tác giả là bắt buộc.' : ''),
  genre: (v) => (v === '' ? 'Vui lòng chọn thể loại.' : ''),
  year: (v) => {
    const n = Number(v);
    if (v === '' || !Number.isInteger(n)) return 'Năm phải là số nguyên.';
    if (n < 1900 || n > currentYear) return `Năm phải từ 1900 đến ${currentYear}.`;
    return '';
  },
};

export const validateField = (name, value) => rules[name](value);

export function validateAll(values) {
  const errors = {};
  for (const name of Object.keys(rules)) {
    const msg = rules[name](values[name] ?? '');
    if (msg) errors[name] = msg;
  }
  return errors;
}
