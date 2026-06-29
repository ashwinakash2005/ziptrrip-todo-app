import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search todos by title or description..." value={searchTerm} onChange={handleChange} className="search-input" />
      {searchTerm && <button className="search-clear" onClick={handleClear} aria-label="Clear search">✕</button>}
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;
