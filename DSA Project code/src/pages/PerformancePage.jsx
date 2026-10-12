import React from 'react';
import { PerformanceChart } from '../components/PerformanceChart';

export function PerformancePage() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">Search Performance & Complexity Evaluation</h1>
            <p className="page-description">
              Rigorous comparative analysis of Suffix Array + LCP indexing against Linear Search, Inverted Indexes, and Suffix Trees.
            </p>
          </div>
        </div>
      </div>

      <PerformanceChart />
    </div>
  );
}
