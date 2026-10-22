export default function Header({ title, favoriteCount }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-right">
        <span>
          Sách yêu thích: <strong>{favoriteCount}</strong>
        </span>
      </div>
    </header>
  );
}
