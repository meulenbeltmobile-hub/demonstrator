export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter by category">
      {categories.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${active === key ? 'active' : ''}`}
          onClick={() => onChange(key)}
          aria-pressed={active === key}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
