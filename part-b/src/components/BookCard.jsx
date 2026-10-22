export default function BookCard({ book, isFavorite, onToggleFavorite, onDelete }) {
  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p>Tác giả: {book.author}</p>
      <p>Thể loại: {book.genre}</p>
      <p>Năm xuất bản: {book.year}</p>
      <div className="card-actions">
        <button
          type="button"
          className={isFavorite ? 'btn-fav active' : 'btn-fav'}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? '★ Đã thích' : '☆ Yêu thích'}
        </button>
        <button type="button" className="btn-delete" onClick={() => onDelete(book.id)}>
          Xóa
        </button>
      </div>
    </article>
  );
}
