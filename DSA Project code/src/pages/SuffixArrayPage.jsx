/**
 * ============================================================================
 * SuffixArrayPage Component - Interactive Suffix Array Explorer
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ROLE IN ARCHITECTURE & VIVA:
 * - Provides an educational visual sandbox for arbitrary text strings (e.g. "banana", "mississippi").
 * - Visualizes the 3-phase transformation:
 *     1. Unsorted Suffix Generation: Suffixes starting at indices 0 to n - 1.
 *     2. Lexicographical Sorting: Suffixes ordered alphabetically (O(n log² n)).
 *     3. Suffix Array SA[] Extraction: Array storing starting positions by sorted rank.
 * - Merges Kasai's LCP array directly alongside suffixes to illustrate common prefixes.
 * - Features an interactive binary search range simulator finding matches in [L, R].
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import { Search, Info } from 'lucide-react';
import { buildSuffixArray } from '../algorithms/suffixArray';
import { buildKasaiLcp } from '../algorithms/kasaiLcp';
import { simulateLcpBinarySearch } from '../algorithms/lcpBinarySearch';

export function SuffixArrayPage({ initialParams }) {
  const [inputText, setInputText] = useState(initialParams?.initialQuery ? 'banana' : 'banana');
  const [hoveredPosition, setHoveredPosition] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [searchQuery, setSearchQuery] = useState('an');

  const presets = ['banana', 'mississippi', 'abracadabra', 'suffixarray', 'panama'];

  // Compute live Suffix Array
  const suffixData = useMemo(() => {
    return buildSuffixArray(inputText);
  }, [inputText]);

  // Compute live Kasai LCP
  const lcpData = useMemo(() => {
    return buildKasaiLcp(inputText, suffixData);
  }, [inputText, suffixData]);

  // Merge LCP into suffix rows
  const combinedRows = useMemo(() => {
    return (suffixData?.suffixArray || []).map((row, idx) => ({
      ...row,
      lcp: idx === 0 ? '—' : (lcpData?.rawLcp?.[idx] ?? '—')
    }));
  }, [suffixData, lcpData]);

  // Live binary search range over this suffix array
  const searchSimulation = useMemo(() => {
    if (!searchQuery) return null;
    return simulateLcpBinarySearch(inputText, suffixData?.suffixArray || [], lcpData?.rawLcp || [], searchQuery);
  }, [inputText, suffixData, lcpData, searchQuery]);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">Suffix Array Explorer</h1>
            <p className="page-description">
              Educational visualization of suffix generation, lexicographical sorting, and binary search range lookup.
            </p>
          </div>
        </div>
      </div>

      {/* Input Control & String Inspector */}
      <div className="string-inspector-box">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Source String (n = {inputText.length})
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <input
                type="text"
                className="search-main-input"
                style={{ width: '280px', padding: '10px 14px', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                  setSelectedRank(null);
                  setHoveredPosition(null);
                }}
                maxLength={24}
                placeholder="Enter text (e.g. banana)..."
              />
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                Max 24 chars for visualization clarity
              </span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>Presets:</span>
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                className="suggestion-pill"
                onClick={() => {
                  setInputText(p);
                  setSelectedRank(null);
                  setHoveredPosition(null);
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Character By Character Grid with Index Indicators */}
        <div style={{ marginTop: '12px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Character Index Pointers (Hover/click a suffix below to highlight):
          </span>
          <div className="string-char-grid">
            {inputText.split('').map((char, index) => {
              const isHighlighted = hoveredPosition !== null && index >= hoveredPosition;
              const isStartChar = hoveredPosition === index;

              return (
                <div
                  key={index}
                  className={`char-cell ${isStartChar ? 'active-char' : isHighlighted ? 'match-char' : ''}`}
                  onMouseEnter={() => setHoveredPosition(index)}
                  onMouseLeave={() => setHoveredPosition(null)}
                >
                  <span className="char-val">{char}</span>
                  <span className="char-idx">{index}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Unsorted Suffixes vs Sorted Suffix Array */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', marginBottom: '28px' }}>
        {/* Left: Unsorted Suffixes */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>
                Unsorted Suffixes
              </h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Pos: Suffix text substring(i)
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
              {suffixData.unsortedSuffixes.length} suffixes
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {suffixData.unsortedSuffixes.map((item) => {
              const isHovered = hoveredPosition === item.position;
              return (
                <div
                  key={item.position}
                  onMouseEnter={() => setHoveredPosition(item.position)}
                  onMouseLeave={() => setHoveredPosition(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: isHovered ? 'var(--bg-card-elevated)' : 'var(--bg-surface)',
                    border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: '700', minWidth: '20px' }}>
                      {item.position}
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>→</span>
                    <span style={{ color: isHovered ? '#fff' : 'var(--text-primary)', fontWeight: isHovered ? '700' : '400' }}>
                      {item.suffix}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    len {item.length}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sorted Suffix Array Table */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>
                Sorted Suffix Array (SA) + LCP
              </h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Lexicographical ranking: Rank | Position | Suffix | LCP
              </span>
            </div>
            <span className="status-chip ready" style={{ fontSize: '10px' }}>
              SA Ready
            </span>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Rank</th>
                  <th style={{ width: '80px' }}>SA[i]</th>
                  <th>Sorted Suffix</th>
                  <th style={{ width: '70px' }}>LCP</th>
                </tr>
              </thead>
              <tbody>
                {combinedRows.map((row) => {
                  const isSelected = selectedRank === row.rank;
                  const isHovered = hoveredPosition === row.position;

                  return (
                    <tr
                      key={row.rank}
                      className={isSelected || isHovered ? 'selected-row' : ''}
                      onMouseEnter={() => setHoveredPosition(row.position)}
                      onMouseLeave={() => setHoveredPosition(null)}
                      onClick={() => setSelectedRank(row.rank)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="font-mono" style={{ fontWeight: '700', color: 'var(--accent-highlight)' }}>
                        {row.rank}
                      </td>
                      <td className="font-mono">
                        <span style={{
                          background: 'rgba(22, 119, 255, 0.12)',
                          color: 'var(--accent-primary)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '700'
                        }}>
                          {row.position}
                        </span>
                      </td>
                      <td className="font-mono" style={{ color: isSelected ? '#fff' : 'var(--text-primary)' }}>
                        {row.suffix}
                      </td>
                      <td className="font-mono" style={{
                        color: row.lcp === '—' || row.lcp === 0 ? 'var(--text-dim)' : 'var(--success)',
                        fontWeight: '700'
                      }}>
                        {row.lcp}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive Binary Search Simulator on this Suffix Array */}
      <div className="card" style={{ padding: '24px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>Binary Search Range Lookup on SA</span>
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Search for any substring within "{inputText}" to see how binary search pinpoints the matching suffix range [L, R].
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Pattern:</span>
            <input
              type="text"
              className="search-main-input"
              style={{ width: '160px', padding: '6px 12px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. an, na, ba"
            />
          </div>
        </div>

        {searchSimulation && (
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: searchSimulation.found ? 'var(--success-bg)' : 'var(--warning-bg)',
                  color: searchSimulation.found ? 'var(--success)' : 'var(--warning)',
                  border: `1px solid ${searchSimulation.found ? 'var(--success-border)' : 'var(--warning-border)'}`
                }}>
                  {searchSimulation.found ? 'PATTERN FOUND' : 'NOT FOUND'}
                </span>

                <span className="font-mono" style={{ fontSize: '13px', color: '#fff' }}>
                  Matched Range: <strong>[{searchSimulation.matchRange[0]}, {searchSimulation.matchRange[1]}]</strong>
                </span>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  ({searchSimulation.totalMatches} occurrence{searchSimulation.totalMatches === 1 ? '' : 's'})
                </span>
              </div>

              <div className="font-mono" style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>
                Comparisons: {searchSimulation.comparisonsMade} made | {searchSimulation.comparisonsSaved} saved via LCP
              </div>
            </div>

            {/* Binary Search Step List */}
            {searchSimulation.steps.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                {searchSimulation.steps.map((st) => (
                  <div
                    key={st.step}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      padding: '6px 10px',
                      background: 'var(--bg-card)',
                      borderRadius: '4px',
                      border: '1px solid rgba(36, 50, 71, 0.4)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>
                        Step {st.step}
                      </span>
                      <span style={{ color: 'var(--text-dim)' }}>|</span>
                      <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                        Bounds [{st.low} .. {st.high}], Mid = {st.mid}
                      </span>
                      <span style={{ color: 'var(--text-dim)' }}>|</span>
                      <span className="font-mono" style={{ color: '#fff' }}>
                        Suffix: "{st.suffixPreview}"
                      </span>
                    </div>

                    <span style={{ color: 'var(--accent-highlight)', fontSize: '11.5px' }}>
                      {st.result}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Complexity & Educational Explanation Panel */}
      <div className="card-elevated" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Info size={16} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>
            Suffix Array Principles & Complexity
          </h3>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
          A Suffix Array is a sorted array of suffix starting positions used for efficient pattern matching through binary search. Because suffixes are in lexicographical order, all occurrences of any pattern appear in a contiguous range of the array.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Construction Complexity
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-highlight)', marginTop: '4px' }}>
              O(n log² n)
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
              Via prefix doubling comparison sort
            </span>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              Search Complexity
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--success)', marginTop: '4px' }}>
              O(m log n) → O(m + log n)
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
              Accelerated with LCP auxiliary array
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
