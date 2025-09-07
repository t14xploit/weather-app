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
    <form onSubmit={onSearch} className="search-form" role="search">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
        aria-label="City name"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="words"
        spellCheck="false"
      />
      <button
        type="submit"
        className="search-button"
        disabled={loading || locationLoading}
        aria-label={loading ? 'Searching for weather...' : 'Search for weather'}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      <button
        type="button"
        className="location-button"
        onClick={onLocationSearch}
        disabled={loading || locationLoading}
        title="Use my current location"
        aria-label={locationLoading ? 'Getting your location...' : 'Use my current location'}
      >
        {locationLoading ? '📍' : '📍'}
      </button>
    </form>
  );
};

export default SearchForm;
