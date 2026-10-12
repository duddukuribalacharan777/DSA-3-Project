import React from 'react';
import { AlgorithmPipeline } from '../components/AlgorithmPipeline';

export function PipelinePage() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">Algorithm Pipeline & Methodology</h1>
            <p className="page-description">
              End-to-end data flow from unstructured document collection to indexed Suffix Array, Kasai LCP construction, accelerated binary search, and relevance ranking.
            </p>
          </div>
        </div>
      </div>

      <AlgorithmPipeline />
    </div>
  );
}
