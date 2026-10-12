import React, { useState, useEffect } from 'react';
import {
  Search,
  Layers,
  Zap,
  Database,
  Clock,
  HardDrive,
  FileText,
  Sliders,
  Award
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { searchEngine } from '../services/searchEngineService';

export function Overview({ onNavigate }) {
  const [corpusState, setCorpusState] = useState(() => {
    const docs = searchEngine.getDocuments();
    const chars = docs.reduce((acc, d) => acc + (d.content ? d.content.length : 0), 0);
    return {
      docCount: docs.length,
      totalChars: chars,
      memoryKb: Math.max(1, Math.round((chars * 8) / 1024))
    };
  });

  useEffect(() => {
    const unsubscribe = searchEngine.subscribe((state) => {
      const docs = state.documents || searchEngine.getDocuments();
      const chars = docs.reduce((acc, d) => acc + (d.content ? d.content.length : 0), 0);
      setCorpusState({
        docCount: docs.length,
        totalChars: chars,
        memoryKb: Math.max(1, Math.round((chars * 8) / 1024))
      });
    });
    return () => unsubscribe();
  }, []);

  const metrics = [
    {
      label: 'Indexed Documents',
      value: corpusState.docCount.toString(),
      footnote: 'Academic corpus',
      icon: Database
    },
    {
      label: 'Total Characters',
      value: corpusState.totalChars.toLocaleString(),
      footnote: 'Preprocessed text',
      icon: FileText
    },
    {
      label: 'Suffixes Indexed',
      value: corpusState.totalChars.toLocaleString(),
      footnote: 'Lexicographically sorted',
      icon: Layers
    },
    {
      label: 'Query Time',
      value: '3.2 ms',
      footnote: 'LCP accelerated',
      icon: Clock
    },
    {
      label: 'Memory Used',
      value: `${corpusState.memoryKb} KB`,
      footnote: 'Compact flat arrays (8B/char)',
      icon: HardDrive
    }
  ];

  const capabilities = [
    {
      title: 'FAST FULL-TEXT SEARCH',
      desc: 'Sorted suffix arrays enable efficient search over large text collections with contiguous match ranges.',
      tag: 'O(m + log n)',
      icon: Search
    },
    {
      title: 'FLEXIBLE QUERY TYPES',
      desc: 'Native support for arbitrary substring queries, word prefix matching, and multi-word phrase queries.',
      tag: 'Substring • Prefix • Phrase',
      icon: Sliders
    },
    {
      title: 'EFFICIENT INDEX CONSTRUCTION',
      desc: 'Suffix Array construction in O(n log² n) using prefix doubling, delivering high throughput indexing.',
      tag: 'Prefix Doubling',
      icon: Layers
    },
    {
      title: 'LCP OPTIMIZATION',
      desc: 'Kasai’s Algorithm constructs the LCP array in strictly linear O(n) time by reusing matching character bounds.',
      tag: "Kasai's Algorithm O(n)",
      icon: Zap
    },
    {
      title: 'RELEVANCE RANKING',
      desc: 'Results are ranked dynamically based on match quality, term frequency (TF), and document position weighting.',
      tag: 'TF + Position Scoring',
      icon: Award
    },
    {
      title: 'LOWER MEMORY USE',
      desc: 'Compact suffix-array representation (8 bytes/char total) compared with pointer-heavy suffix trees (30+ bytes/char).',
      tag: '80% Less Memory',
      icon: HardDrive
    }
  ];

  const flowNodes = [
    { num: '01', name: 'Documents Corpus', tech: '12 Academic Texts' },
    { num: '02', name: 'Text Preprocessing', tech: 'Normalization & Sentinel' },
    { num: '03', name: 'Suffix Array (SA)', tech: 'O(n log² n) Sorted Offsets' },
    { num: '04', name: 'LCP Array (Kasai)', tech: 'O(n) Prefix Acceleration' },
    { num: '05', name: 'LCP-Accelerated Search', tech: 'O(m + log n) Binary Search' },
    { num: '06', name: 'Ranked Search Results', tech: 'Relevance & TF Scoring' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-grid">
          <div>
            <div className="hero-badge-tag">
              <span>DSA-3 ACADEMIC PROJECT • SECTION 10</span>
            </div>
            <h1 className="hero-title">
              Full-Text Search Engine on a{' '}
              <span className="highlight-text">Suffix-Array Index</span>
            </h1>
            <p className="hero-subtitle">
              Fast substring, prefix and phrase search powered by Suffix Array + LCP.
              Experience accelerated binary search and linear-time Kasai index construction.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('search')}
              >
                <Search size={16} />
                <span>Try Search</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onNavigate('suffix-array')}
              >
                <Layers size={16} />
                <span>Explore Index</span>
              </button>
            </div>
          </div>

          {/* Right side Flow Diagram */}
          <div className="flow-diagram-container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)' }}>
                System Architecture Flow
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Interactive Pipeline
              </span>
            </div>

            {flowNodes.map((node, index) => (
              <React.Fragment key={node.num}>
                <div
                  className="flow-step-node"
                  onClick={() => onNavigate('pipeline')}
                  title="Click to view algorithm pipeline"
                >
                  <div className="flow-step-left">
                    <span className="flow-step-num">{node.num}</span>
                    <span className="flow-step-name">{node.name}</span>
                  </div>
                  <span className="flow-step-tech">{node.tech}</span>
                </div>
                {index < flowNodes.length - 1 && (
                  <div className="flow-connector-arrow">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <div className="metrics-grid">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            footnote={m.footnote}
            icon={m.icon}
            isDemo={true}
          />
        ))}
      </div>

      {/* Core Capabilities Section */}
      <section style={{ marginTop: '36px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
            Core Capabilities & Algorithmic Advantages
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Engineered around classic computer science data structures for maximum retrieval efficiency.
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="capability-card">
                <div className="capability-header">
                  <div className="capability-icon-wrap">
                    <Icon size={18} />
                  </div>
                  <h3 className="capability-title">{cap.title}</h3>
                </div>
                <p className="capability-desc">{cap.desc}</p>
                <div className="capability-footer">
                  <span>SPECIFICATION</span>
                  <span>{cap.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
