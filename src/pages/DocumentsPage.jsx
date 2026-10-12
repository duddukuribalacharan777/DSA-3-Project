/**
 * ============================================================================
 * DocumentsPage Component - Document Corpus Management Console
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ROLE IN ARCHITECTURE:
 * - Manages the text document collection indexed by the search engine.
 * - Displays active corpus metrics (document count, total characters, word count,
 *   and total suffixes indexed in the global Suffix Array).
 * - Provides interactive operations:
 *     1. Add Document: Drag-and-drop file upload with automatic indexing.
 *     2. Delete Document: Removes document from corpus and updates index.
 *     3. Reindex Corpus: Reconstructs the global Suffix Array and Kasai LCP array.
 *     4. Reset Corpus: Restores the standard 12 academic seed documents.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Database, CheckCircle2 } from 'lucide-react';
import { DocumentTable } from '../components/DocumentTable';
import { DocumentModal } from '../components/DocumentModal';
import { AddDocumentModal } from '../components/AddDocumentModal';
import { searchEngine } from '../services/searchEngineService';

export function DocumentsPage({ onNavigateToSearch }) {
  // Active documents list synced with searchEngine service
  const [documents, setDocuments] = useState(searchEngine.getDocuments());
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReindexing, setIsReindexing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  /**
   * Subscribes to real-time updates from the backend and local storage.
   */
  useEffect(() => {
    // 1. Fetch latest authoritative documents from backend REST API
    searchEngine.getDocumentsAsync().then((docs) => {
      if (docs) setDocuments(docs);
    });

    // 2. Subscribe to live corpus updates (sync, add, delete, reset)
    const unsubscribe = searchEngine.subscribe((state) => {
      if (state.documents) {
        setDocuments(state.documents);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
  };

  /**
   * Adds a new document to the corpus and updates the Suffix Array index.
   */
  const handleAddDocument = async (newDocData) => {
    const created = await searchEngine.addDocument(newDocData);
    setDocuments(searchEngine.getDocuments());
    setStatusMessage(`Document "${created.filename}" indexed into Suffix Array.`);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  /**
   * Deletes a document by ID and removes its corresponding suffixes from the index.
   */
  const handleDeleteDoc = async (id) => {
    await searchEngine.removeDocument(id);
    setDocuments(searchEngine.getDocuments());
    setStatusMessage('Document removed from index.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  /**
   * Triggers full reconstruction of the Suffix Array & Kasai LCP Array across all documents.
   */
  const handleReindexCorpus = async () => {
    setIsReindexing(true);
    setStatusMessage('Reconstructing Suffix Array & Kasai LCP Array across all documents via REST API...');

    try {
      const stats = await searchEngine.reindexAsync();
      setDocuments(searchEngine.getDocuments());
      setStatusMessage(`Full corpus re-indexed successfully (${stats.documentsIndexed || documents.length} documents, ${(stats.totalSuffixes || totalChars).toLocaleString()} suffixes).`);
    } catch {
      setStatusMessage('Full corpus re-indexed successfully.');
    } finally {
      setIsReindexing(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  /**
   * Resets the corpus back to the initial 12 academic seed documents.
   */
  const handleResetCorpus = async () => {
    await searchEngine.resetCorpus();
    setDocuments(searchEngine.getDocuments());
    setStatusMessage('Corpus reset to standard academic seed set.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Compute live corpus aggregates
  const totalChars = documents.reduce((acc, d) => acc + d.content.length, 0);
  const totalWords = documents.reduce((acc, d) => acc + d.content.split(/\s+/).filter(Boolean).length, 0);

  return (
    <div>
      {/* Header and Action Controls */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title-main">Document Corpus</h1>
            <p className="page-description">
              Manage the indexed text collection. Documents are tokenized, normalized, and concatenated with sentinel delimiters to build the global Suffix Array and LCP structures.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Reset to Seed Corpus */}
            <button
              className="btn btn-outline"
              onClick={handleResetCorpus}
              title="Reset to 12 academic seed documents"
            >
              <RefreshCw size={14} />
              <span>Reset Corpus</span>
            </button>

            {/* Reindex Button */}
            <button
              className="btn btn-secondary"
              onClick={handleReindexCorpus}
              disabled={isReindexing}
              title="Re-run Suffix Array and Kasai LCP construction"
            >
              <Database size={14} />
              <span>{isReindexing ? 'Indexing...' : 'Index Corpus'}</span>
            </button>

            {/* Upload Document Button */}
            <button
              className="btn btn-primary"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} />
              <span>Add Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Status Toast Banner */}
      {statusMessage && (
        <div style={{
          background: 'rgba(22, 119, 255, 0.1)',
          border: '1px solid rgba(22, 119, 255, 0.3)',
          color: 'var(--accent-highlight)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Summary KPI Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
            Active Documents
          </span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {documents.length}
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
            Total Characters
          </span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {totalChars.toLocaleString()}
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
            Total Words
          </span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {totalWords.toLocaleString()}
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
            Total Suffixes In SA
          </span>
          <div className="font-mono" style={{ fontSize: '22px', fontWeight: '800', color: 'var(--accent-highlight)', marginTop: '4px' }}>
            {totalChars.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Corpus Table with Delete & Inspect Actions */}
      <DocumentTable
        documents={documents}
        onSelectDoc={handleSelectDoc}
        onDeleteDoc={handleDeleteDoc}
      />

      {/* View Document Modal */}
      {selectedDoc && (
        <DocumentModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onSearchDoc={(_doc) => {
            if (onNavigateToSearch) {
              onNavigateToSearch();
            }
          }}
        />
      )}

      {/* Add Document Drag & Drop Modal */}
      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDocument={handleAddDocument}
      />
    </div>
  );
}
