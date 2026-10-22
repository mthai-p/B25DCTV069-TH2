import { useState } from 'react';
import { validateField, validateAll } from '../utils/validate.js';

const emptyValues = { title: '', author: '', genre: '', year: '' };

export default function BookForm({ genres, onAddBook }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});

  // Controlled input: giá trị lấy từ state, báo lỗi ngay khi gõ
  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateAll(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onAddBook({
      id: Date.now(),
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre,
      year: Number(values.year),
    });
    setValues(emptyValues);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Tên sách</label>
        <input id="title" name="title" type="text" value={values.title} onChange={handleChange}
          className={errors.title ? 'invalid' : ''} />
        <small className="error">{errors.title}</small>
      </div>
      <div className="field">
        <label htmlFor="author">Tác giả</label>
        <input id="author" name="author" type="text" value={values.author} onChange={handleChange}
          className={errors.author ? 'invalid' : ''} />
        <small className="error">{errors.author}</small>
      </div>
      <div className="field">
        <label htmlFor="genre">Thể loại</label>
        <select id="genre" name="genre" value={values.genre} onChange={handleChange}
          className={errors.genre ? 'invalid' : ''}>
          <option value="">-- Chọn thể loại --</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <small className="error">{errors.genre}</small>
      </div>
      <div className="field">
        <label htmlFor="year">Năm xuất bản</label>
        <input id="year" name="year" type="number" value={values.year} onChange={handleChange}
          className={errors.year ? 'invalid' : ''} />
        <small className="error">{errors.year}</small>
      </div>
      <button type="submit" className="btn-submit">Thêm sách</button>
    </form>
  );
}
