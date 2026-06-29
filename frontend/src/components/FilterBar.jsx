import './FilterBar.css';

function FilterBar({ onFilterChange, onSortChange, currentFilter, currentSort }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter-select" className="filter-label">Filter:</label>
        <select id="filter-select" value={currentFilter} onChange={(e) => onFilterChange(e.target.value)} className="filter-select">
          <option value="all">All Todos</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">Sort by:</label>
        <select id="sort-select" value={currentSort} onChange={(e) => onSortChange(e.target.value)} className="filter-select">
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
