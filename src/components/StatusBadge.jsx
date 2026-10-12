import React from 'react';

export function StatusBadge({ status, label }) {
  const normalized = (status || 'INDEXED').toUpperCase();

  let className = 'status-chip ready';
  let dotColor = '#10B981';
  let text = label || normalized;

  if (normalized === 'INDEXED' || normalized === 'READY') {
    className = 'status-chip ready';
    dotColor = '#10B981';
  } else if (normalized === 'PROCESSING') {
    className = 'status-chip';
    dotColor = '#F59E0B';
    text = label || 'PROCESSING';
  } else if (normalized === 'NOT INDEXED') {
    className = 'status-chip';
    dotColor = '#EF4444';
    text = label || 'NOT INDEXED';
  }

  return (
    <span className={className}>
      <span className="status-dot" style={{ backgroundColor: dotColor }} />
      {text}
    </span>
  );
}
