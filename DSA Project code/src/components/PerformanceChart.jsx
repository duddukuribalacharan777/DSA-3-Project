import React, { useState } from 'react';
import { BarChart3, HardDrive, Zap, AlertTriangle } from 'lucide-react';

export function PerformanceChart() {
  const [activeMetric, setActiveMetric] = useState('latency'); // 'latency' | 'memory'

  // Comparison data (Clearly marked as illustrative demo values)
  const comparisonData = [
    {
      name: 'Linear Search',
      type: 'Naive Scan',
      latencyMs: 142.0,
      memoryFactor: 1.0, // 1x raw text
      memoryDesc: '1x (Raw text only, no index)',
      substringSupport: true,
      prefixSupport: true,
      phraseSupport: true,
      color: '#94A3B8'
    },
    {
      name: 'Inverted Index',
      type: 'Posting Lists',
      latencyMs: 18.5,
      memoryFactor: 1.8,
      memoryDesc: '1.8x - 2.5x (Posting lists & dictionary)',
      substringSupport: false, // Inverted index cannot do arbitrary substrings without n-grams
      prefixSupport: true,
      phraseSupport: true,
      color: '#F59E0B'
    },
    {
      name: 'Suffix Tree',
      type: 'Compact Trie',
      latencyMs: 3.2,
      memoryFactor: 24.0,
      memoryDesc: '20x - 30x (Node pointers & edge labels)',
      substringSupport: true,
      prefixSupport: true,
      phraseSupport: true,
      color: '#A855F7'
    },
    {
      name: 'Suffix Array (Naive)',
      type: 'Binary Search',
      latencyMs: 7.9,
      memoryFactor: 4.0,
      memoryDesc: '4x (32-bit integer offsets)',
      substringSupport: true,
      prefixSupport: true,
      phraseSupport: true,
      color: '#06B6D4'
    },
    {
      name: 'Proposed System: SA + LCP',
      type: 'Kasai Accelerated',
      latencyMs: 3.8,
      memoryFactor: 8.0,
      memoryDesc: '8x (4 bytes SA + 4 bytes LCP)',
      substringSupport: true,
      prefixSupport: true,
      phraseSupport: true,
      color: '#1677FF',
      isProposed: true
    }
  ];

  const approachesTable = [
    {
      approach: 'Linear Search',
      mainIdea: 'Scans raw text sequentially for each query pattern',
      advantage: 'Simple; requires zero extra index memory or build time',
      limitation: 'Prohibitively slow on large datasets (O(n) per query)'
    },
    {
      approach: 'Inverted Index',
      mainIdea: 'Maps discrete tokens to document posting lists',
      advantage: 'Ultra-fast whole-word keyword lookup',
      limitation: 'Fails on arbitrary substring queries without massive n-gram explosion'
    },
    {
      approach: 'Suffix Tree',
      mainIdea: 'Trie of all suffixes in a compressed tree graph',
      advantage: 'Fast O(m) search supporting all substring queries',
      limitation: 'High pointer memory overhead (20x-30x text size)'
    },
    {
      approach: 'Suffix Array (Naive)',
      mainIdea: 'Lexicographically sorted array of suffix starting positions',
      advantage: 'Compact 4-byte representation; cache-friendly array',
      limitation: 'Redundant character comparisons (O(m log n)) without LCP'
    },
    {
      approach: 'Proposed: Suffix Array + LCP',
      mainIdea: 'Suffix Array accelerated by Kasai’s linear LCP array',
      advantage: 'Fast substring & phrase search in O(m + log n) with low memory',
      limitation: 'Index construction cost O(n log² n) prior to query execution'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Metric Visualizer Cards */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                Algorithmic Comparative Analysis
              </h3>
              <span className="metric-demo-tag">Illustrative demo values</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Evaluated on a simulated 1.24M character corpus with 12-character substring queries.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn btn-sm ${activeMetric === 'latency' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveMetric('latency')}
            >
              <Zap size={13} /> Query Latency (ms)
            </button>
            <button
              className={`btn btn-sm ${activeMetric === 'memory' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveMetric('memory')}
            >
              <HardDrive size={13} /> Memory Footprint (Multiplier)
            </button>
          </div>
        </div>

        {/* Custom Visual Bar Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
          {comparisonData.map((item) => {
            const isLatency = activeMetric === 'latency';
            const maxVal = isLatency ? 150 : 26;
            const currentVal = isLatency ? item.latencyMs : item.memoryFactor;
            const widthPct = Math.min(100, Math.max(8, (currentVal / maxVal) * 100));

            return (
              <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ fontWeight: item.isProposed ? '700' : '500', color: item.isProposed ? 'var(--accent-highlight)' : '#fff' }}>
                    {item.name} {item.isProposed && '★'}
                  </span>
                  <span className="font-mono" style={{ color: item.isProposed ? 'var(--accent-highlight)' : 'var(--text-secondary)' }}>
                    {isLatency ? `${item.latencyMs} ms` : `${item.memoryFactor}x`}
                  </span>
                </div>

                <div style={{ width: '100%', height: '24px', background: 'var(--bg-surface)', borderRadius: '6px', overflow: 'hidden', padding: '2px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${widthPct}%`,
                      background: item.isProposed
                        ? 'linear-gradient(90deg, var(--accent-primary), #60A5FA)'
                        : item.color,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '8px',
                      transition: 'width 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: item.isProposed ? '0 0 12px var(--accent-glow)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '10px', color: '#fff', fontWeight: '700', whiteSpace: 'nowrap' }}>
                      {isLatency ? `${item.latencyMs} ms` : item.memoryDesc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--text-dim)', marginTop: '16px' }}>
          <AlertTriangle size={13} style={{ color: 'var(--warning)' }} />
          <span>Values represent illustrative academic demonstration estimates across typical text distributions. Do not interpret as formal production hardware benchmarks.</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>
          Qualitative Architectural Trade-Offs
        </h4>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '180px' }}>Approach</th>
                <th>Main Idea</th>
                <th>Advantage</th>
                <th>Limitation</th>
              </tr>
            </thead>
            <tbody>
              {approachesTable.map((row) => {
                const isProposed = row.approach.includes('Proposed');
                return (
                  <tr key={row.approach} className={isProposed ? 'selected-row' : ''}>
                    <td style={{ fontWeight: '700', color: isProposed ? 'var(--accent-highlight)' : '#fff' }}>
                      {row.approach}
                    </td>
                    <td>{row.mainIdea}</td>
                    <td style={{ color: 'var(--success)' }}>{row.advantage}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{row.limitation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Big-O Complexity Matrix */}
      <div className="card" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>
          Theoretical Asymptotic Complexity Matrix
        </h4>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Data Structure</th>
                <th>Construction Time</th>
                <th>Substring Query Time</th>
                <th>Prefix Query Time</th>
                <th>Space Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600' }}>Linear Search</td>
                <td className="font-mono">O(1)</td>
                <td className="font-mono" style={{ color: '#EF4444' }}>O(N)</td>
                <td className="font-mono" style={{ color: '#EF4444' }}>O(N)</td>
                <td className="font-mono">O(1)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>Inverted Index</td>
                <td className="font-mono">O(N)</td>
                <td className="font-mono" style={{ color: '#EF4444' }}>N/A (Poor)</td>
                <td className="font-mono">O(K + log V)</td>
                <td className="font-mono">O(V + N)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>Suffix Tree</td>
                <td className="font-mono">O(N) (Ukkonen)</td>
                <td className="font-mono" style={{ color: 'var(--success)' }}>O(M)</td>
                <td className="font-mono" style={{ color: 'var(--success)' }}>O(M)</td>
                <td className="font-mono" style={{ color: '#EF4444' }}>O(N) [20x-30x bytes]</td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600' }}>Suffix Array (Naive)</td>
                <td className="font-mono">O(N log² N)</td>
                <td className="font-mono">O(M log N)</td>
                <td className="font-mono">O(M log N)</td>
                <td className="font-mono" style={{ color: 'var(--success)' }}>4N bytes</td>
              </tr>
              <tr className="selected-row">
                <td style={{ fontWeight: '700', color: 'var(--accent-highlight)' }}>
                  Proposed: SA + Kasai LCP
                </td>
                <td className="font-mono" style={{ color: 'var(--accent-highlight)' }}>
                  O(N log² N) + O(N) Kasai
                </td>
                <td className="font-mono" style={{ color: 'var(--success)', fontWeight: '700' }}>
                  O(M + log N)
                </td>
                <td className="font-mono" style={{ color: 'var(--success)', fontWeight: '700' }}>
                  O(M + log N)
                </td>
                <td className="font-mono" style={{ color: 'var(--cyan)', fontWeight: '700' }}>
                  8N bytes (SA + LCP)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
