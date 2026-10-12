import React, { useState, useEffect } from 'react';
import { Menu, Info, Database, Server } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { searchEngine } from '../services/searchEngineService';

export function Topbar({
  pageTitle,
  breadcrumb,
  docCount = 12,
  onOpenMobile,
  onOpenInfoModal
}) {
  const [backendStatus, setBackendStatus] = useState({
    connected: searchEngine.backendConnected,
    info: searchEngine.backendInfo
  });

  useEffect(() => {
    // Initial check
    searchEngine.checkBackendHealth().then(status => {
      setBackendStatus(status);
    });

    // Subscribe to updates
    const unsubscribe = searchEngine.subscribe(state => {
      setBackendStatus({
        connected: state.connected,
        info: state.info
      });
    });

    // Periodic poll every 5s
    const timer = setInterval(() => {
      searchEngine.checkBackendHealth();
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onOpenMobile}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="topbar-breadcrumbs">
          <div className="topbar-subtitle">{breadcrumb || 'FULL-TEXT SEARCH • SUFFIX ARRAY INDEX'}</div>
          <div className="topbar-page-title">
            <span>{pageTitle}</span>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        {/* Backend Connectivity Badge */}
        {backendStatus.connected ? (
          <div
            className="status-chip ready"
            title={`${backendStatus.info?.engine || 'REST API'} • Runtime: ${backendStatus.info?.runtime || 'Ready'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Server size={12} style={{ color: '#10B981' }} />
            <span>
              {backendStatus.info?.engine?.includes('Java') ? 'JAVA REST :8080' : 'BACKEND :8080'}
            </span>
          </div>
        ) : (
          <div
            className="status-chip"
            title="Local in-memory engine active. Launch Java backend via backend-java/run.bat or npm run backend."
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Server size={12} style={{ color: 'var(--cyan)' }} />
            <span>LOCAL ENGINE</span>
          </div>
        )}

        {/* Index Status Badge */}
        <StatusBadge status="READY" label="INDEX READY" />

        {/* Document Count Badge */}
        <div className="status-chip counter">
          <Database size={12} style={{ color: 'var(--accent-primary)' }} />
          <span>{docCount} Documents</span>
        </div>

        {/* Info / Quick Details Button */}
        <button
          className="topbar-icon-btn"
          title="Project Architecture Info"
          onClick={onOpenInfoModal}
        >
          <Info size={16} />
        </button>
      </div>
    </header>
  );
}
