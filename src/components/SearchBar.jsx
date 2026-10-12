import React from 'react';
import { Search, X } from 'lucide-react';
import { QueryTypeSelector } from './QueryTypeSelector';

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
  queryType,
  onChangeQueryType,
  caseSensitive,
  onToggleCaseSensitive,
  maxResults,
  onChangeMaxResults,
  highlightMatches,
  onToggleHighlightMatches
}) {
  const suggestions = [
    'algorithm',
    'suffix array',
    'binary search',
    'data structure',
    'Kasai',
    'prefix',
    'LCP'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-control-panel">
      <form onSubmit={handleSubmit}>
        <div className="search-input-group">
          <Search className="search-input-icon" size={20} />
          <input
            type="text"
            className="search-main-input"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for a word, phrase, or substring..."
            autoComplete="off"
            spellCheck="false"
          />

          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              style={{
                position: 'absolute',
                right: '120px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                padding: '4px'
              }}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}

          <button type="submit" className="search-submit-btn">
            <span>Search</span>
          </button>
        </div>

        {/* Options Row */}
        <QueryTypeSelector
          queryType={queryType}
          onChangeQueryType={onChangeQueryType}
          caseSensitive={caseSensitive}
          onToggleCaseSensitive={onToggleCaseSensitive}
          maxResults={maxResults}
          onChangeMaxResults={onChangeMaxResults}
          highlightMatches={highlightMatches}
          onToggleHighlightMatches={onToggleHighlightMatches}
        />

        {/* Suggestions Row */}
        <div className="search-suggestions-row">
          <span className="suggestions-tag">Sample queries:</span>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="suggestion-pill"
              onClick={() => {
                onQueryChange(item);
                onSearch(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
