import { useState } from 'react';
import initialBooks from './data/books.js';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // State nằm ở App: danh sách id yêu thích + thể loại đang chọn
  const [books, setBooks] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  const genres = ['Tất cả', ...new Set(books.map((b) => b.genre))];
  // Nếu thể loại đang chọn không còn sách nào (sau khi xóa) thì quay về "Tất cả"
  const activeGenre = genres.includes(selectedGenre) ? selectedGenre : 'Tất cả';
  const visibleBooks =
    activeGenre === 'Tất cả' ? books : books.filter((b) => b.genre === activeGenre);

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  // Thể loại cho form lấy từ dữ liệu gốc (không mất khi xóa hết sách của thể loại)
  const formGenres = [...new Set(initialBooks.map((b) => b.genre))];

  function addBook(book) {
    setBooks((prev) => [book, ...prev]); // hiển thị ở đầu danh sách
  }

  function deleteBook(id) {
    const book = books.find((b) => b.id === id);
    if (!window.confirm(`Bạn có chắc muốn xóa "${book.title}"?`)) return;
    setBooks((prev) => prev.filter((b) => b.id !== id));
    setFavorites((prev) => prev.filter((x) => x !== id));
  }

  return (
    <>
      <Header title="📚 Thư viện lớp" favoriteCount={favorites.length} />
      <main className="container">
        <Section title="Thể loại">
          <GenreFilter genres={genres} selected={activeGenre} onSelect={setSelectedGenre} />
        </Section>
        <Section title={`Danh sách sách (${visibleBooks.length} / ${books.length} cuốn)`}>
          <BookList books={visibleBooks} favorites={favorites} onToggleFavorite={toggleFavorite}
            onDelete={deleteBook}
          />
        </Section>
        <Section title="Thêm sách mới">
          <BookForm genres={formGenres} onAddBook={addBook} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
