import React from 'react';

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ city, setCity, onSearch, loading }) => {
  return (
    <form onSubmit={onSearch} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;
