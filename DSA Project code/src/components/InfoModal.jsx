import React from 'react';
import { X, Layers } from 'lucide-react';

export function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="sidebar-logo-icon" style={{ width: '30px', height: '30px' }}>
              <Layers size={16} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>
                Full-Text Search Engine on Suffix-Array Index
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                DSA-3 • Team 16 • Section 10
              </span>
            </div>
          </div>
          <button className="topbar-icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: 'rgba(22, 119, 255, 0.08)',
            border: '1px solid rgba(22, 119, 255, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5'
          }}>
            <strong style={{ color: '#fff' }}>Project Context:</strong>
            <p style={{ marginTop: '4px' }}>
              Demonstrates a full-text search engine built around a Suffix Array and LCP Array. Supports substring, prefix, and phrase queries with LCP-accelerated binary search and relevance ranking based on term frequency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                Suffix Array Build
              </div>
              <div className="font-mono" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-highlight)', marginTop: '2px' }}>
                O(n log² n)
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Prefix doubling sort</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                Kasai LCP Build
              </div>
              <div className="font-mono" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--success)', marginTop: '2px' }}>
                O(n) Linear
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Reuses common prefix count</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                Pattern Search
              </div>
              <div className="font-mono" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--cyan)', marginTop: '2px' }}>
                O(m + log n)
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>LCP-accelerated binary search</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                Memory Footprint
              </div>
              <div className="font-mono" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--warning)', marginTop: '2px' }}>
                8n bytes total
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>80% less than suffix trees</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Project Information:
            </span>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
              <div>• <strong>Course</strong>: Data Structures and Algorithms - 3 (25CS2103E)</div>
              <div>• <strong>Batch</strong>: Team 16 • Section 10</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Academic Year: 2026–2027</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
