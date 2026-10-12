import React from 'react';

export function QueryTypeSelector({
  queryType,
  onChangeQueryType,
  caseSensitive,
  onToggleCaseSensitive,
  maxResults,
  onChangeMaxResults,
  highlightMatches,
  onToggleHighlightMatches
}) {
  return (
    <div className="search-options-row">
      {/* Query Types: Substring, Prefix, Phrase */}
      <div className="query-type-selector">
        <button
          type="button"
          className={`query-type-btn ${queryType === 'SUBSTRING' ? 'active' : ''}`}
          onClick={() => onChangeQueryType('SUBSTRING')}
          title="Matches any substring anywhere within words or text"
        >
          Substring
        </button>
        <button
          type="button"
          className={`query-type-btn ${queryType === 'PREFIX' ? 'active' : ''}`}
          onClick={() => onChangeQueryType('PREFIX')}
          title="Matches terms starting with query string"
        >
          Prefix
        </button>
        <button
          type="button"
          className={`query-type-btn ${queryType === 'PHRASE' ? 'active' : ''}`}
          onClick={() => onChangeQueryType('PHRASE')}
          title="Matches exact consecutive multi-word sequences"
        >
          Phrase
        </button>
      </div>

      {/* Toggles & Options */}
      <div className="search-toggles-group">
        <label className="toggle-label" title="Enforce exact upper/lower case matching">
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={caseSensitive}
            onChange={(e) => onToggleCaseSensitive(e.target.checked)}
          />
          <span>Case Sensitive</span>
        </label>

        <label className="toggle-label" title="Highlight matching tokens in result snippets">
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={highlightMatches}
            onChange={(e) => onToggleHighlightMatches(e.target.checked)}
          />
          <span>Highlight Matches</span>
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Max:</span>
          <select
            className="select-dropdown"
            value={maxResults}
            onChange={(e) => onChangeMaxResults(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
