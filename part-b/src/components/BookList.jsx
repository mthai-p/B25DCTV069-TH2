import BookCard from './BookCard.jsx';

export default function BookList({ books, favorites, onToggleFavorite, onDelete }) {
  if (books.length === 0) return <p className="message">Không có cuốn sách nào.</p>;

  return (
    <div className="grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
