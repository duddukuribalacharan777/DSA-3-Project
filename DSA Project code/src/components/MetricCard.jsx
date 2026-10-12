import React from 'react';

export function MetricCard({ label, value, footnote, isDemo = true, icon: Icon }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        {Icon && (
          <div className="metric-icon-box">
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-footnote">
        {footnote}
        {isDemo && <span className="metric-demo-tag">Sample Demo</span>}
      </div>
    </div>
  );
}
