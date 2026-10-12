import React from 'react';
import { FileText, Eye, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function DocumentTable({ documents, onSelectDoc, onDeleteDoc }) {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Category</th>
            <th>Characters</th>
            <th>Words</th>
            <th>Status</th>
            <th>Indexed Date</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => {
            const charCount = doc.content.length;
            const wordCount = doc.content.split(/\s+/).filter(Boolean).length;

            return (
              <tr key={doc.id} style={{ cursor: 'pointer' }} onClick={() => onSelectDoc(doc)}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(22, 119, 255, 0.1)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <FileText size={15} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#fff', fontSize: '13.5px' }}>
                        {doc.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {doc.filename}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    background: 'rgba(36, 50, 71, 0.5)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)'
                  }}>
                    {doc.category || 'General'}
                  </span>
                </td>
                <td className="font-mono">{charCount.toLocaleString()}</td>
                <td className="font-mono">{wordCount.toLocaleString()}</td>
                <td>
                  <StatusBadge status={doc.status} />
                </td>
                <td className="font-mono" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  {doc.dateIndexed || '2026-09-21'}
                </td>
                <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectDoc(doc)}
                      title="Inspect Document"
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </button>
                    {onDeleteDoc && documents.length > 3 && (
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        onClick={() => onDeleteDoc(doc.id)}
                        title="Remove Document"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
