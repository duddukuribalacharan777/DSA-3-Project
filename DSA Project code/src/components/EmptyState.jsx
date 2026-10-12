import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

export function EmptyState({ title = "No Results Found", message = "No matching suffixes or phrases found. Try adjusting your search query or query type.", onReset }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(22, 119, 255, 0.1)',
        color: 'var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Search size={22} />
      </div>
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: '1.5' }}>
        {message}
      </p>
      {onReset && (
        <button className="btn btn-secondary btn-sm" onClick={onReset} style={{ marginTop: '8px' }}>
          <RefreshCw size={13} /> Reset Filter
        </button>
      )}
    </div>
  );
}

export function LoadingState({ message = "Traversing Suffix Array & Evaluating LCP Bounds..." }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      gap: '16px'
    }}>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: '3px solid rgba(22, 119, 255, 0.2)',
        borderTopColor: 'var(--accent-primary)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{
        fontSize: '13px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)'
      }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
