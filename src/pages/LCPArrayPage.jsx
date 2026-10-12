/**
 * ============================================================================
 * LCPArrayPage Component - Interactive Kasai's LCP Visualizer
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ROLE IN ARCHITECTURE & VIVA:
 * - Visually demonstrates the mechanics of Kasai's strictly O(n) algorithm.
 * - Shows the rank inversion step (rank[i] = SA⁻¹[i]) for O(1) predecessor lookup.
 * - Details why naive pairwise comparison takes O(n²), while Kasai's theorem
 *   (h_{i+1} >= h_i - 1) bounds total character comparisons to at most 2n.
 * - Embeds the LCPVisualization playback component with step-by-step trace controls.
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import { Zap } from 'lucide-react';
import { buildSuffixArray } from '../algorithms/suffixArray';
import { buildKasaiLcp } from '../algorithms/kasaiLcp';
import { LCPVisualization } from '../components/LCPVisualization';

export function LCPArrayPage() {
  const [sampleWord, setSampleWord] = useState('banana');
  const presets = ['banana', 'mississippi', 'datastructures', 'project'];

  const suffixData = useMemo(() => {
    return buildSuffixArray(sampleWord);
  }, [sampleWord]);

  const lcpData = useMemo(() => {
    return buildKasaiLcp(sampleWord, suffixData);
  }, [sampleWord, suffixData]);

  const kasaiSteps = [
    {
      num: '1',
      title: 'Invert Suffix Array to Rank Array',
      desc: 'Build rank[i] representing the index of suffix starting at i in the sorted SA array. Allows O(1) predecessor lookup.'
    },
    {
      num: '2',
      title: 'Iterate in Sequential Text Order',
      desc: 'Traverse i from 0 to n-1. When moving to suffix i+1, the common prefix length decreases by at most 1.'
    },
    {
      num: '3',
      title: 'Reuse Previous LCP Information (h)',
      desc: 'Initialize matching counter h to max(0, h - 1). Skip comparing the first h characters because they are guaranteed to match.'
    },
    {
      num: '4',
      title: 'Compute Adjacent LCP & Store',
      desc: 'Compare characters beyond offset h until a mismatch occurs. Store LCP[rank[i]] = h, proving strictly O(n) runtime.'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">LCP Array & Kasai’s Algorithm</h1>
            <p className="page-description">
              Longest Common Prefix between adjacent sorted suffixes. Computed in linear O(n) time using Kasai's invariant theorem.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Text input:</span>
            <input
              type="text"
              className="search-main-input"
              style={{ width: '160px', padding: '6px 12px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
              value={sampleWord}
              onChange={(e) => setSampleWord(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))}
              maxLength={16}
            />
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                className="suggestion-pill"
                onClick={() => setSampleWord(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kasai Algorithm Concept Banner */}
      <div className="card-elevated" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#fff' }}>
              KASAI’S ALGORITHM
            </h3>
          </div>
          <span className="status-chip ready">Strictly O(n) Runtime</span>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '850px' }}>
          Computes the LCP array in O(n) while reducing repeated character comparisons. Traditional naive pairwise comparison takes O(n²), but Kasai's algorithm proves that as we iterate through suffixes in original text order, the LCP value h decreases by at most 1, guaranteeing linear bounds.
        </p>

        {/* 4 Core Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginTop: '18px'
        }}>
          {kasaiSteps.map((s) => (
            <div
              key={s.num}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span className="font-mono" style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--accent-primary)',
                  background: 'rgba(22, 119, 255, 0.15)',
                  padding: '1px 6px',
                  borderRadius: '3px'
                }}>
                  {s.num}
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#fff' }}>
                  {s.title}
                </span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Step Visualizer */}
      <LCPVisualization key={sampleWord} lcpData={lcpData} sampleText={sampleWord} />
    </div>
  );
}
