import React from 'react';
import { Cpu, Zap } from 'lucide-react';

export function SearchDetailsDrawer({ details }) {
  if (!details) {
    return (
      <div className="search-details-panel">
        <div className="details-panel-header">
          <div className="details-panel-title">
            <Cpu size={15} style={{ color: 'var(--accent-primary)' }} />
            <span>Search Details</span>
          </div>
          <span className="details-panel-badge">Awaiting Query</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Execute a query to inspect internal Suffix Array binary search ranges, LCP comparison savings, and index offsets.
        </p>
      </div>
    );
  }

  const {
    query,
    queryType,
    binarySearchRange = [0, 12400],
    matchedSuffixRange = [1042, 1058],
    lcpComparisonsSaved = 18,
    totalComparisons = 42,
    searchTimeMs = 3.8,
    resultsCount = 24,
    docsCount = 6,
    indexingStructure = 'Suffix Array + Kasai LCP'
  } = details;

  return (
    <div className="search-details-panel">
      <div className="details-panel-header">
        <div className="details-panel-title">
          <Cpu size={15} style={{ color: 'var(--accent-primary)' }} />
          <span>Search Details</span>
        </div>
        <span className="details-panel-badge">DSA Telemetry</span>
      </div>

      <div className="algo-metrics-list">
        <div className="algo-metric-row">
          <span className="algo-metric-key">Index Structure</span>
          <span className="algo-metric-val" style={{ color: 'var(--accent-highlight)', fontSize: '11.5px' }}>
            {indexingStructure}
          </span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Query</span>
          <span className="algo-metric-val" style={{ color: 'var(--accent-highlight)' }}>
            "{query}"
          </span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Query Type</span>
          <span className="algo-metric-val">{queryType}</span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Binary Search Range</span>
          <span className="algo-metric-val">
            [{binarySearchRange[0]} ... {binarySearchRange[1]}]
          </span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Matched Suffix Range</span>
          <span className="algo-metric-val" style={{ color: 'var(--success)' }}>
            {Array.isArray(matchedSuffixRange)
              ? `[${matchedSuffixRange[0]}, ${matchedSuffixRange[1]}]`
              : matchedSuffixRange}
          </span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">LCP Comparisons Skipped</span>
          <span className="algo-metric-val" style={{ color: 'var(--cyan)' }}>
            {lcpComparisonsSaved} chars
          </span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Total Comparisons</span>
          <span className="algo-metric-val">{totalComparisons}</span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Search Time</span>
          <span className="algo-metric-val" style={{ color: 'var(--warning)' }}>
            {searchTimeMs} ms
          </span>
        </div>

        <div className="algo-metric-row">
          <span className="algo-metric-key">Results Count</span>
          <span className="algo-metric-val">
            {resultsCount} match{resultsCount === 1 ? '' : 'es'} ({docsCount} doc{docsCount === 1 ? '' : 's'})
          </span>
        </div>
      </div>

      {/* Algorithmic Viva Callout Box */}
      <div className="algo-callout-box">
        <div className="algo-callout-title">
          <Zap size={13} />
          <span>LCP Acceleration Principle</span>
        </div>
        <p>
          Instead of naive $O(m \log n)$ character comparisons, adjacent LCP bounds skip already-verified matching prefixes, reducing query latency down to $O(m + \log n)$.
        </p>
      </div>
    </div>
  );
}
