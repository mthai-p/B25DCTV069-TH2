export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <div className="genre-filter">
      {genres.map((g) => (
        <button
          key={g}
          type="button"
          className={g === selected ? 'chip active' : 'chip'}
          onClick={() => onSelect(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
