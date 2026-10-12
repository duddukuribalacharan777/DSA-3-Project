import React from 'react';
import { GraduationCap, Server } from 'lucide-react';

export function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">About the Project</h1>

          </div>
        </div>
      </div>

      {/* Main Project Specification Card */}
      <div className="card-elevated" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(22, 119, 255, 0.15)',
            border: '1px solid rgba(22, 119, 255, 0.3)',
            borderRadius: '9999px',
            padding: '4px 14px',
            color: 'var(--accent-highlight)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            marginBottom: '16px'
          }}>
            <GraduationCap size={14} />
            <span>ACADEMIC PROJECT • A.Y. 2026–2027</span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
            Full-Text Search Engine on a Suffix-Array Index
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '850px', marginBottom: '24px' }}>
            Full-Text Search Engine on a Suffix-Array Index is designed to provide fast and efficient searching over large collections of text documents. The system supports substring, prefix and phrase queries using a Suffix Array, LCP Array and LCP-accelerated binary search.
          </p>

          {/* Academic Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)'
          }}>

            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
                Target Runtime
              </span>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginTop: '2px' }}>
                Java Runtime Environment
              </div>
              <span className="font-mono" style={{ fontSize: '11.5px', color: 'var(--cyan)' }}>
                VS Code / IntelliJ IDEA
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* Java Backend REST API Architecture Blueprint */}
      <div className="card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server size={18} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
              Java Backend Architecture & REST API Contract
            </h3>
          </div>
          <span className="status-chip ready" style={{ fontSize: '11px' }}>
            API Ready / Decoupled Architecture
          </span>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
          This modern web UI is cleanly decoupled through <code>searchEngineService.js</code>. The frontend can seamlessly consume a production Java REST API (Spring Boot or Java HTTP Server) implementing the exact core data structures:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-highlight)' }}>
              POST /api/search
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
              Receives query string, query type (SUBSTRING, PREFIX, PHRASE), case sensitivity, and returns ranked occurrences with LCP comparison metrics.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--cyan)' }}>
              GET /api/index/suffix-array
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
              Retrieves the compiled Suffix Array and Kasai LCP values for visualization inspection.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--warning)' }}>
              POST /api/documents/reindex
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
              Triggers the Java engine's SA-IS / prefix doubling construction and Kasai's O(n) algorithm across all registered text files.
            </p>
          </div>
        </div>
      </div>

      {/* Target Application Domains */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '14px' }}>
          Real-World Application Domains
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '12px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Digital Libraries</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Sub-millisecond full-text queries across archives of literature and technical journals.
            </p>
          </div>

          <div style={{ padding: '12px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Search Engines</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              High-throughput substring and wildcard matching with compact memory footprint.
            </p>
          </div>

          <div style={{ padding: '12px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Bioinformatics</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Genomic motif discovery and alignment across billion-character DNA sequences.
            </p>
          </div>

          <div style={{ padding: '12px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#fff' }}>Text Analytics</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Plagiarism detection, n-gram extraction, and longest repeated substring discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
