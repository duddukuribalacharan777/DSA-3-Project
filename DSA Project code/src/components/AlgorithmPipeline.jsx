import React, { useState } from 'react';
import {
  FileText,
  Filter,
  Layers,
  GitMerge,
  Search,
  Award,
  CheckCircle2,
  Code2,
  Clock,
  HardDrive
} from 'lucide-react';

export function AlgorithmPipeline() {
  const [activeStepId, setActiveStepId] = useState('03');

  const steps = [
    {
      id: '01',
      title: 'Text Collection',
      tagline: 'Gather target documents or corpus data',
      icon: FileText,
      complexity: 'O(N)',
      space: 'O(N)',
      summary: 'Ingests plain text manuscripts, academic papers, and technical corpora into a structured memory corpus repository.',
      details: [
        'Collects arbitrary multi-format documents (plain text, utf-8, reports).',
        'Assigns unique document identifiers (doc-01, doc-02, etc.).',
        'Calculates character counts and precomputes corpus boundaries.'
      ],
      pseudocode: `// Stage 01: Corpus Ingestion
function ingestCorpus(files) {
    corpus = new Corpus();
    for (file of files) {
        doc = parseText(file);
        corpus.addDocument(doc);
    }
    return corpus;
}`
    },
    {
      id: '02',
      title: 'Text Preprocessing',
      tagline: 'Clean, normalize and tokenize input',
      icon: Filter,
      complexity: 'O(N)',
      space: 'O(N)',
      summary: 'Normalizes case folding, handles whitespace sanitization, and appends unique boundary sentinels ($ or #) between multi-document streams.',
      details: [
        'Performs case folding based on query sensitivity configurations.',
        'Injects sentinel characters ($) that sort lexicographically before all alphabet characters.',
        'Prevents substring matches from crossing disparate document boundaries.'
      ],
      pseudocode: `// Stage 02: Sentinel Injection
function preprocess(documents) {
    unifiedStream = "";
    for (doc of documents) {
        unifiedStream += normalize(doc.text) + "$";
    }
    return unifiedStream;
}`
    },
    {
      id: '03',
      title: 'Suffix Array Construction',
      tagline: 'Generate and sort suffixes and store starting positions',
      icon: Layers,
      complexity: 'O(N log² N)',
      space: '4N bytes',
      summary: 'Constructs the Suffix Array SA[] where SA[i] stores the starting index of the i-th lexicographically smallest suffix.',
      details: [
        'Stores pure integer starting offsets rather than redundant full strings, keeping memory to just 4 bytes per character.',
        'Employs prefix doubling / sorting comparisons to achieve O(N log² N) construction.',
        'Provides flat array locality for efficient CPU cache utilization.'
      ],
      pseudocode: `// Stage 03: Suffix Array Builder
function buildSuffixArray(text) {
    n = text.length;
    suffixes = [0 ... n-1];
    suffixes.sort((i, j) => {
        return text.substring(i).compareTo(text.substring(j));
    });
    return suffixes; // SA array of integer positions
}`
    },
    {
      id: '04',
      title: 'LCP Array Construction',
      tagline: 'Use Kasai’s Algorithm to compute longest common prefixes',
      icon: GitMerge,
      complexity: 'O(N) Strictly Linear',
      space: '4N bytes',
      summary: 'Builds the Longest Common Prefix (LCP) array between adjacent sorted suffixes in O(N) using Kasai’s invariant theorem.',
      details: [
        'Inverts SA into rank array where rank[SA[i]] = i in O(N).',
        'Processes suffixes in sequential text order (i = 0 to n-1).',
        'Reuses common prefix count: if LCP(i, j) = h, then LCP for suffix (i+1) is at least h-1.'
      ],
      pseudocode: `// Stage 04: Kasai's LCP Algorithm
function buildKasaiLCP(text, SA) {
    n = text.length;
    rank = invert(SA);
    lcp = new Array(n);
    h = 0;
    for (i = 0; i < n; i++) {
        if (rank[i] > 0) {
            j = SA[rank[i] - 1];
            while (i + h < n && j + h < n && text[i+h] == text[j+h]) {
                h++;
            }
            lcp[rank[i]] = h;
            if (h > 0) h--;
        }
    }
    return lcp;
}`
    },
    {
      id: '05',
      title: 'LCP-Accelerated Search',
      tagline: 'Use binary search with LCP info to reduce repeated comparisons',
      icon: Search,
      complexity: 'O(M + log N)',
      space: 'O(1)',
      summary: 'Executes binary search to find the lower and upper bounds [L, R] of suffixes matching pattern P of length M.',
      details: [
        'Standard binary search requires O(M * log N) character comparisons.',
        'LCP acceleration skips previously matched characters between bounds and mid.',
        'Locates all occurrences of pattern P as a single contiguous slice SA[L ... R].'
      ],
      pseudocode: `// Stage 05: LCP-Accelerated Range Search
function searchPattern(pattern, SA, LCP, text) {
    // Binary search for lower bound L
    L = binarySearchLower(pattern, SA, LCP);
    // Binary search for upper bound R
    R = binarySearchUpper(pattern, SA, LCP);
    
    // Contiguous matches: SA[L ... R]
    return [L, R];
}`
    },
    {
      id: '06',
      title: 'Result Ranking',
      tagline: 'Rank matches by relevance and term frequency',
      icon: Award,
      complexity: 'O(K log K)',
      space: 'O(K)',
      summary: 'Ranks matched documents by term frequency, positional proximity, document length normalization, and query type affinity.',
      details: [
        'Term Frequency (TF) calculated in O(1) from range width (R - L + 1).',
        'Applies document title matching bonus factor.',
        'Calculates normalized scores between 0.0 and 1.0.'
      ],
      pseudocode: `// Stage 06: Relevance Ranking
function rankMatches(matches, query) {
    for (doc of matches) {
        tf = doc.occurrences.length;
        doc.score = calculateTFScore(tf, doc.length) 
                  + titleBoost(doc, query) 
                  + proximityScore(doc.firstPos);
    }
    return matches.sort((a, b) => b.score - a.score);
}`
    },
    {
      id: '07',
      title: 'Display Search Results',
      tagline: 'Return ranked matches with positions and scores',
      icon: CheckCircle2,
      complexity: 'O(1)',
      space: 'O(K)',
      summary: 'Delivers formatted result cards with contextual text snippets, highlighted keywords, LCP values, and index telemetry.',
      details: [
        'Generates surrounding contextual window snippets with ellipsis padding.',
        'Highlights exact matching substrings in high-contrast electric blue.',
        'Presents search telemetry (time, binary search bounds, comparisons skipped).'
      ],
      pseudocode: `// Stage 07: Presentation Viewport
function displayResults(rankedList) {
    return rankedList.map(item => ({
        title: item.title,
        snippet: generateSnippet(item.content, item.pos),
        meta: { score: item.score, tf: item.tf, lcp: item.lcp }
    }));
}`
    }
  ];

  const currentStep = steps.find(s => s.id === activeStepId) || steps[2];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Horizontal Steps Navigator */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
        gap: '10px'
      }}>
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStepId === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStepId(step.id)}
              style={{
                background: isActive ? 'var(--bg-card-elevated)' : 'var(--bg-card)',
                border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px 10px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all var(--transition-fast)',
                boxShadow: isActive ? '0 0 14px var(--accent-glow)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-mono" style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: isActive ? '#fff' : 'var(--accent-primary)',
                  background: isActive ? 'var(--accent-primary)' : 'rgba(22, 119, 255, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '3px'
                }}>
                  {step.id}
                </span>
                <Icon size={16} style={{ color: isActive ? 'var(--accent-highlight)' : 'var(--text-dim)' }} />
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: isActive ? '#fff' : 'var(--text-secondary)', lineHeight: '1.2' }}>
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Technical Deep-Dive */}
      <div className="card" style={{ padding: '28px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="font-mono" style={{
                fontSize: '14px',
                fontWeight: '800',
                color: 'var(--accent-primary)',
                background: 'rgba(22, 119, 255, 0.15)',
                padding: '3px 10px',
                borderRadius: '4px'
              }}>
                STAGE {currentStep.id}
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                {currentStep.title}
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              {currentStep.tagline}
            </p>
          </div>

          {/* Complexity Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Clock size={13} style={{ color: 'var(--accent-primary)' }} />
              <span className="font-mono" style={{ fontSize: '12px', color: '#fff', fontWeight: '600' }}>
                Time: {currentStep.complexity}
              </span>
            </div>

            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <HardDrive size={13} style={{ color: 'var(--cyan)' }} />
              <span className="font-mono" style={{ fontSize: '12px', color: '#fff', fontWeight: '600' }}>
                Space: {currentStep.space}
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
              Process Specification
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              {currentStep.summary}
            </p>

            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
              Key Algorithmic Operations
            </h4>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {currentStep.details.map((point, idx) => (
                <li key={idx} style={{ lineHeight: '1.5' }}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
                <Code2 size={14} style={{ color: 'var(--accent-primary)' }} />
                <span>ALGORITHM PSEUDOCODE</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Java Compatible
              </span>
            </div>

            <pre style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              overflowX: 'auto'
            }}>
              {currentStep.pseudocode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
