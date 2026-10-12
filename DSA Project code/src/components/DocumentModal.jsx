import React from 'react';
import { X, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function DocumentModal({ document, onClose, onSearchDoc }) {
  if (!document) return null;

  const charCount = document.content.length;
  const wordCount = document.content.split(/\s+/).filter(Boolean).length;
  const suffixCount = charCount;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                {document.title}
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {document.filename}
              </span>
            </div>
          </div>
          <button
            className="topbar-icon-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {/* Metadata Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Status</span>
              <div style={{ marginTop: '4px' }}>
                <StatusBadge status={document.status} />
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Characters</span>
              <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'var(--font-mono)', color: '#fff' }}>
                {charCount.toLocaleString()}
              </span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Words</span>
              <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'var(--font-mono)', color: '#fff' }}>
                {wordCount.toLocaleString()}
              </span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Suffixes Indexed</span>
              <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'var(--font-mono)', color: 'var(--accent-highlight)' }}>
                {suffixCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Full Text View */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Document Corpus Text
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                UTF-8 / Plain Text
              </span>
            </div>

            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              maxHeight: '320px',
              overflowY: 'auto',
              fontFamily: 'var(--font-sans)',
              fontSize: '13.5px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap'
            }}>
              {document.content}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {onSearchDoc && (
            <button
              className="btn btn-primary"
              onClick={() => {
                onSearchDoc(document);
                onClose();
              }}
            >
              Search Inside Document
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
