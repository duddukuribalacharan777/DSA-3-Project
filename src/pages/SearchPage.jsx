/**
 * ============================================================================
 * SearchPage Component - Interactive Full-Text Search Console
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ROLE IN ARCHITECTURE:
 * - Primary search interface allowing users to query the indexed text corpus.
 * - Supports three algorithmic query paradigms:
 *     1. SUBSTRING: Locates any arbitrary substring occurrence in O(m + log n).
 *     2. PREFIX: Locates words or tokens beginning with the search pattern.
 *     3. PHRASE: Locates exact consecutive multi-word sequences.
 * - Displays relevance-ranked results alongside an algorithmic telemetry drawer
 *   showing Suffix Array search intervals and character comparisons skipped.
 * ============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchResultCard } from '../components/SearchResultCard';
import { SearchDetailsDrawer } from '../components/SearchDetailsDrawer';
import { EmptyState, LoadingState } from '../components/EmptyState';
import { DocumentModal } from '../components/DocumentModal';
import { searchEngine } from '../services/searchEngineService';
import { ChevronDown } from 'lucide-react';

export function SearchPage({ onNavigateToSuffix }) {
  // --------------------------------------------------------------------------
  // USER SEARCH CONTROLS STATE
  // --------------------------------------------------------------------------
  const [query, setQuery] = useState('suffix array');
  const [queryType, setQueryType] = useState('SUBSTRING'); // 'SUBSTRING' | 'PREFIX' | 'PHRASE'
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [maxResults, setMaxResults] = useState(25);
  const [highlightMatches, setHighlightMatches] = useState(true);

  // --------------------------------------------------------------------------
  // SEARCH RESULTS & PAGINATION STATE
  // Pre-seeded with initial search result for instantaneous render without waterfalls
  // --------------------------------------------------------------------------
  const [searchResults, setSearchResults] = useState(() =>
    searchEngine.search('suffix array', 'SUBSTRING', { caseSensitive: false, maxResults: 25 })
  );
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // Client-side card pagination

  // Document modal viewer state for full paragraph context inspection
  const [selectedDocForContext, setSelectedDocForContext] = useState(null);

  /**
   * Executes a search query via the asynchronous searchEngineService.
   * Dispatches an HTTP request to the REST backend (port 8080) with automatic
   * in-memory client-side fallback if the backend server is unreachable.
   */
  const executeSearch = useCallback(async (searchTerm, type = queryType, opts = {}) => {
    setIsLoading(true);
    setVisibleCount(5); // Reset visible count on fresh query

    try {
      const response = await searchEngine.searchAsync(searchTerm, type, {
        caseSensitive: opts.caseSensitive !== undefined ? opts.caseSensitive : caseSensitive,
        maxResults: opts.maxResults || maxResults
      });
      setSearchResults(response);
    } catch (err) {
      console.warn('[SearchPage] Backend query failed, using local engine fallback:', err);
      const fallback = searchEngine.search(searchTerm, type, {
        caseSensitive: opts.caseSensitive !== undefined ? opts.caseSensitive : caseSensitive,
        maxResults: opts.maxResults || maxResults
      });
      setSearchResults(fallback);
    } finally {
      setIsLoading(false);
    }
  }, [queryType, caseSensitive, maxResults]);

  /**
   * On component mount, synchronize with backend to ensure freshest index data.
   */
  useEffect(() => {
    let isCurrent = true;
    searchEngine.searchAsync('suffix array', 'SUBSTRING', { caseSensitive: false, maxResults: 25 })
      .then((res) => {
        if (isCurrent && res) {
          setSearchResults(res);
        }
      })
      .catch(() => {});
    return () => {
      isCurrent = false;
    };
  }, []);

  // --------------------------------------------------------------------------
  // SEARCH FILTER HANDLERS
  // --------------------------------------------------------------------------
  const handleQueryChange = (val) => {
    setQuery(val);
  };

  const handleQueryTypeChange = (type) => {
    setQueryType(type);
    executeSearch(query, type);
  };

  const handleToggleCaseSensitive = (val) => {
    setCaseSensitive(val);
    executeSearch(query, queryType, { caseSensitive: val });
  };

  const handleChangeMaxResults = (val) => {
    setMaxResults(val);
    executeSearch(query, queryType, { maxResults: val });
  };

  const handleViewContext = (result) => {
    const doc = searchEngine.getDocumentById(result.documentId);
    if (doc) {
      setSelectedDocForContext(doc);
    }
  };

  const handleViewIndexPosition = (result) => {
    if (onNavigateToSuffix) {
      onNavigateToSuffix({
        initialQuery: query,
        position: result.primaryPosition,
        filename: result.filename
      });
    }
  };

  // Pagination slice
  const resultsList = searchResults?.results || [];
  const visibleResults = resultsList.slice(0, visibleCount);
  const hasMore = visibleCount < resultsList.length;

  return (
    <div>
      {/* Page Title & Mission Statement */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">Search the Corpus</h1>
            <p className="page-description">
              Query the indexed text using suffix-array based search. Matches are located via binary search and ranked by relevance and term frequency.
            </p>
          </div>
        </div>
      </div>

      {/* Main Search Input & Filter Controls */}
      <SearchBar
        query={query}
        onQueryChange={handleQueryChange}
        onSearch={(term) => executeSearch(term)}
        queryType={queryType}
        onChangeQueryType={handleQueryTypeChange}
        caseSensitive={caseSensitive}
        onToggleCaseSensitive={handleToggleCaseSensitive}
        maxResults={maxResults}
        onChangeMaxResults={handleChangeMaxResults}
        highlightMatches={highlightMatches}
        onToggleHighlightMatches={setHighlightMatches}
      />

      {/* Search Content Layout: Results Stream + Algorithmic Telemetry */}
      {isLoading ? (
        <LoadingState message="Binary Searching Suffix Array & Evaluating LCP Intervals..." />
      ) : searchResults ? (
        <div className="search-results-container">
          {/* Left Column: Match Statistics & Result Cards */}
          <div>
            <div className="results-header-bar">
              <div className="results-stats-left">
                <span className="results-count-badge">
                  {searchResults.totalMatches} result{searchResults.totalMatches === 1 ? '' : 's'} found
                </span>
                <span>•</span>
                <span className="results-time-badge">
                  Search completed in {searchResults.queryTimeMs} ms
                </span>
                <span>•</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Query type: {searchResults.queryType}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Showing {Math.min(visibleCount, resultsList.length)} of {resultsList.length} docs
              </div>
            </div>

            {/* Results Cards List */}
            {visibleResults.length > 0 ? (
              <div>
                {visibleResults.map((result) => (
                  <SearchResultCard
                    key={result.documentId}
                    result={result}
                    searchQuery={searchResults.queryText}
                    highlightEnabled={highlightMatches}
                    onViewContext={handleViewContext}
                    onViewIndexPosition={handleViewIndexPosition}
                  />
                ))}

                {/* Pagination Expander */}
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setVisibleCount((prev) => prev + 5)}
                    >
                      <ChevronDown size={15} />
                      <span>Load More Results ({resultsList.length - visibleCount} remaining)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Zero Match Fallback UI */
              <EmptyState
                title="No Matches Found in Suffix Array"
                message={`The search pattern "${query}" did not match any suffix under ${queryType} mode. Try switching to Substring query or disabling Case Sensitivity.`}
                onReset={() => {
                  setQuery('suffix');
                  setQueryType('SUBSTRING');
                  setCaseSensitive(false);
                  executeSearch('suffix', 'SUBSTRING', { caseSensitive: false });
                }}
              />
            )}
          </div>

          {/* Right Column: Algorithmic Search Telemetry Drawer */}
          <div>
            <SearchDetailsDrawer details={searchResults.searchDetails} />
          </div>
        </div>
      ) : null}

      {/* Full Document Context Viewer Modal */}
      {selectedDocForContext && (
        <DocumentModal
          document={selectedDocForContext}
          onClose={() => setSelectedDocForContext(null)}
          onSearchDoc={(_doc) => {
            setQuery(query || 'suffix');
          }}
        />
      )}
    </div>
  );
}
