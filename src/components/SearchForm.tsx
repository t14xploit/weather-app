import React from 'react';

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onLocationSearch: () => void;
  loading: boolean;
  locationLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  city,
  setCity,
  onSearch,
  onLocationSearch,
  loading,
  locationLoading
}) => {
  return (
    <form onSubmit={onSearch} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={loading || locationLoading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <button
        type="button"
        className="location-button"
        onClick={onLocationSearch}
        disabled={loading || locationLoading}
        title="Use my location"
      >
        {locationLoading ? '📍' : '📍'}
      </button>
    </form>
  );
};

export default SearchForm;
