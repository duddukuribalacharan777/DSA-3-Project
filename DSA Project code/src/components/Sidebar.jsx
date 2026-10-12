import React from 'react';
import {
  LayoutDashboard,
  Search,
  Files,
  Layers,
  GitMerge,
  Workflow,
  BarChart3,
  GraduationCap
} from 'lucide-react';

export function Sidebar({ currentTab, onSelectTab, mobileOpen, onCloseMobile }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'search', label: 'Search', icon: Search, badge: 'Primary' },
    { id: 'documents', label: 'Documents', icon: Files, badge: 'Corpus' },
    { id: 'suffix-array', label: 'Suffix Array', icon: Layers },
    { id: 'lcp-array', label: 'LCP Array', icon: GitMerge },
    { id: 'pipeline', label: 'Algorithm Pipeline', icon: Workflow },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'about', label: 'About Project', icon: GraduationCap }
  ];

  return (
    <aside className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <Layers size={20} />
          </div>
          <div className="sidebar-brand-text">
            <h1>SuffixSearch</h1>
            <span className="brand-tagline">SA + Kasai LCP Engine</span>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Core Engine</span>
        {navItems.slice(0, 3).map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
            >
              <div className="nav-item-icon">
                <Icon size={17} />
              </div>
              <span>{item.label}</span>
              {item.badge && <span className="nav-item-badge">{item.badge}</span>}
            </div>
          );
        })}

        <span className="nav-section-label" style={{ marginTop: '12px' }}>
          Algorithm Visualizers
        </span>
        {navItems.slice(3, 6).map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
            >
              <div className="nav-item-icon">
                <Icon size={17} />
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}

        <span className="nav-section-label" style={{ marginTop: '12px' }}>
          Evaluation
        </span>
        {navItems.slice(6).map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
            >
              <div className="nav-item-icon">
                <Icon size={17} />
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>


    </aside>
  );
}
