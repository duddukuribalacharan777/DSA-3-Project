/**
 * ============================================================================
 * SearchResultCard Component - Ranked Document Result Card
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ROLE IN ARCHITECTURE:
 * - Renders an individual document match returned by the search engine.
 * - Displays the relevance score (computed from Term Frequency and Suffix position).
 * - Highlights search pattern occurrences directly within the text snippet.
 * - Displays metadata chips: Match Score, Term Frequency, Byte Offset, and LCP.
 * - Provides quick actions:
 *     - "View Context": Opens full document viewer modal centered on match.
 *     - "View Index Position": Navigates to Suffix Array Explorer for this match.
 * ============================================================================
 */

import React from 'react';
import { FileText, Eye, Compass } from 'lucide-react';

export function SearchResultCard({
  result,
  searchQuery,
  highlightEnabled = true,
  onViewContext,
  onViewIndexPosition
}) {
  /**
   * Highlights occurrences of the query pattern inside the text snippet.
   * Uses case-insensitive regex partitioning to wrap matches in styled spans.
   * 
   * @param {string} snippet - The extracted document text snippet.
   * @param {string} term - The query pattern to highlight.
   * @returns {Array<React.ReactNode>|string} Snippet with highlighted match elements.
   */
  const renderHighlightedSnippet = (snippet, term) => {
    if (!highlightEnabled || !term || term.trim() === '') {
      return snippet;
    }

    try {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = snippet.split(new RegExp(`(${escaped})`, 'gi'));

      return parts.map((part, i) => {
        if (part.toLowerCase() === term.toLowerCase()) {
          return (
            <span key={i} className="search-highlight">
              {part}
            </span>
          );
        }
        return part;
      });
    } catch {
      return snippet;
    }
  };

  return (
    <article className="result-card">
      {/* Result Header: Title, Category, and Relevance Score */}
      <div className="result-title-row">
        <div>
          <h3 className="result-title">
            <FileText size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <span>{result.documentTitle}</span>
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span className="result-doc-badge">{result.filename}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
              Category: {result.category || 'Corpus'}
            </span>
          </div>
        </div>

        {/* Normalized Relevance Score */}
        <div className="result-score-badge" title="Relevance Score calculated from Term Frequency and Suffix Position">
          Score: {result.score.toFixed(2)}
        </div>
      </div>

      {/* Match Snippet with Highlighted Occurrences */}
      <div className="result-snippet-box">
        {renderHighlightedSnippet(result.snippet, searchQuery || result.queryTerm)}
      </div>

      {/* Algorithmic Metadata Chips */}
      <div className="result-meta-chips">
        <div className="result-meta-item">
          <span>Match Score:</span>
          <strong>{result.score}</strong>
        </div>
        <div className="result-meta-item">
          <span>Term Frequency:</span>
          <strong>{result.termFrequency}</strong>
        </div>
        <div className="result-meta-item">
          <span>Position:</span>
          <strong>{result.primaryPosition}</strong>
        </div>
        <div className="result-meta-item">
          <span>LCP:</span>
          <strong>{result.lcp}</strong>
        </div>
        <div className="result-meta-item">
          <span>Document:</span>
          <strong style={{ color: 'var(--accent-highlight)' }}>{result.filename}</strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions-row">
        {/* Full Document Viewer */}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onViewContext(result)}
          title="Inspect surrounding document paragraph"
        >
          <Eye size={13} />
          <span>View Context</span>
        </button>

        {/* Suffix Array Range Navigation */}
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => onViewIndexPosition(result)}
          title="Inspect the Suffix Array index range and character position"
        >
          <Compass size={13} />
          <span>View Index Position</span>
        </button>
      </div>
    </article>
  );
}
