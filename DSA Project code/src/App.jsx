/**
 * Main Application Controller - Full-Text Search Engine on Suffix-Array Index
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * Manages:
 * - Active view state routing across 8 specialized dashboards
 * - Real-time corpus synchronization via SearchEngineService
 * - Responsive navigation drawer for mobile/desktop layouts
 * - Global educational info modal triggers
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { InfoModal } from './components/InfoModal';
import { Overview } from './pages/Overview';
import { SearchPage } from './pages/SearchPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { SuffixArrayPage } from './pages/SuffixArrayPage';
import { LCPArrayPage } from './pages/LCPArrayPage';
import { PipelinePage } from './pages/PipelinePage';
import { PerformancePage } from './pages/PerformancePage';
import { AboutPage } from './pages/AboutPage';
import { searchEngine } from './services/searchEngineService';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [suffixParams, setSuffixParams] = useState(null);
  const [docCount, setDocCount] = useState(searchEngine.getDocuments().length);

  useEffect(() => {
    const unsubscribe = searchEngine.subscribe((state) => {
      if (state.documents) {
        setDocCount(state.documents.length);
      }
    });
    return () => unsubscribe();
  }, []);

  const pageMeta = {
    overview: {
      title: 'Full-Text Search Engine Dashboard',
      breadcrumb: 'FULL-TEXT SEARCH • SUFFIX ARRAY INDEX'
    },
    search: {
      title: 'Corpus Query & Relevance Search',
      breadcrumb: 'FULL-TEXT SEARCH • LCP-ACCELERATED BINARY SEARCH'
    },
    documents: {
      title: 'Document Corpus & Indexing',
      breadcrumb: 'CORPUS MANAGEMENT • TOKENIZATION & SENTINEL INJECTION'
    },
    'suffix-array': {
      title: 'Suffix Array Explorer',
      breadcrumb: 'DATA STRUCTURE VISUALIZER • LEXICOGRAPHICAL SORT'
    },
    'lcp-array': {
      title: 'LCP Array & Kasai’s Algorithm',
      breadcrumb: 'DATA STRUCTURE VISUALIZER • LINEAR-TIME O(N) KASAI'
    },
    pipeline: {
      title: 'Algorithm Pipeline & Methodology',
      breadcrumb: 'SYSTEM METHODOLOGY • 7-STAGE ARCHITECTURE'
    },
    performance: {
      title: 'Search Performance & Complexity Evaluation',
      breadcrumb: 'BENCHMARKING • ASYMPTOTIC COMPLEXITY ANALYSIS'
    },
    about: {
      title: 'About the Academic Project',
      breadcrumb: 'DSA-3 • 25CS2103E • TEAM 16 • SECTION 10'
    }
  };

  const handleNavigate = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSuffix = (params) => {
    setSuffixParams(params);
    setCurrentTab('suffix-array');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header */}
        <Topbar
          pageTitle={pageMeta[currentTab]?.title || 'Suffix Search Engine'}
          breadcrumb={pageMeta[currentTab]?.breadcrumb || 'FULL-TEXT SEARCH'}
          docCount={docCount}
          onOpenMobile={() => setMobileOpen(true)}
          onOpenInfoModal={() => setInfoModalOpen(true)}
        />

        {/* Dynamic Page Viewport */}
        <main className="page-viewport">
          {currentTab === 'overview' && (
            <Overview onNavigate={handleNavigate} />
          )}

          {currentTab === 'search' && (
            <SearchPage onNavigateToSuffix={handleNavigateToSuffix} />
          )}

          {currentTab === 'documents' && (
            <DocumentsPage onNavigateToSearch={() => handleNavigate('search')} />
          )}

          {currentTab === 'suffix-array' && (
            <SuffixArrayPage initialParams={suffixParams} />
          )}

          {currentTab === 'lcp-array' && (
            <LCPArrayPage />
          )}

          {currentTab === 'pipeline' && (
            <PipelinePage />
          )}

          {currentTab === 'performance' && (
            <PerformancePage />
          )}

          {currentTab === 'about' && (
            <AboutPage />
          )}

          {/* Persistent Academic Footer */}
          <footer className="app-footer">
            <div className="footer-left">
              <strong>Full-Text Search Engine on a Suffix-Array Index</strong>
              <div style={{ marginTop: '2px', color: 'var(--text-dim)' }}>
                DSA-3 • Team 16 • Section 10 • Academic Project Submission
              </div>
            </div>

            <div className="footer-right">
              <span>Academic Project • A.Y. 2026–2027</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Architecture Info Modal */}
      <InfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </div>
  );
}
