/**
 * ============================================================================
 * AddDocumentModal Component - Drag-and-Drop Document Indexer
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ROLE IN ARCHITECTURE:
 * - Allows users/evaluators to ingest new plain-text manuscripts into the engine.
 * - Supports drag-and-drop file ingestion via the HTML5 File API FileReader.
 * - Automatically derives default titles from filenames.
 * - Emits onAddDocument event to append the document into the corpus and
 *   immediately regenerate suffixes and LCP structures in real-time.
 * ============================================================================
 */

import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2 } from 'lucide-react';

export function AddDocumentModal({ isOpen, onClose, onAddDocument }) {
  const [dragOver, setDragOver] = useState(false);
  const [filename, setFilename] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const category = 'Academic';
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // If modal is not triggered open, render nothing
  if (!isOpen) return null;

  /**
   * Handles native drag-and-drop file drop event.
   */
  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  /**
   * Handles manual file picker input selection.
   */
  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  /**
   * Reads raw text content from the selected file using standard FileReader.
   * Auto-populates title and filename form fields.
   */
  const processFile = (file) => {
    setFilename(file.name);
    setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));

    const reader = new FileReader();
    reader.onload = (event) => {
      setContent(event.target.result || '');
    };
    reader.readAsText(file);
  };

  /**
   * Submits the document to the search engine indexer.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      onAddDocument({
        filename: filename || `uploaded_doc_${Date.now()}.txt`,
        title: title || 'User Contributed Document',
        content,
        category,
        author: 'Student Contributor'
      });

      setIsProcessing(false);
      setSuccessMessage('Document indexed into Suffix Array successfully!');

      // Close modal and reset fields after short feedback delay
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
        setFilename('');
        setTitle('');
        setContent('');
      }, 1000);
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal-content"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UploadCloud size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                Add Document to Corpus
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Index into live Suffix Array & LCP structures
              </span>
            </div>
          </div>
          <button type="button" className="topbar-icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* Modal Ingestion Form */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Drag and Drop Zone */}
          <div
            className={`dropzone-box ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById('file-upload-input').click()}
          >
            <input
              id="file-upload-input"
              type="file"
              accept=".txt,.md,.csv,.json"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
            <UploadCloud size={28} style={{ color: 'var(--accent-primary)', margin: '0 auto 8px auto' }} />
            <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#fff' }}>
              Drag & Drop .txt document here, or <span style={{ color: 'var(--accent-primary)' }}>browse</span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Supports plain text manuscripts, notes, and research papers (Frontend Simulation)
            </p>
          </div>

          {/* Document Title & Filename Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Document Title
              </label>
              <input
                type="text"
                className="search-main-input"
                style={{ padding: '9px 12px', fontSize: '13px' }}
                placeholder="e.g. Distributed Suffix Trees"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Filename
              </label>
              <input
                type="text"
                className="search-main-input"
                style={{ padding: '9px 12px', fontSize: '13px' }}
                placeholder="e.g. distributed_suffix_trees.txt"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Raw Text Content Input */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Document Content / Text
            </label>
            <textarea
              className="search-main-input"
              style={{
                padding: '10px 12px',
                fontSize: '13px',
                minHeight: '110px',
                height: '110px',
                resize: 'vertical',
                fontFamily: 'var(--font-sans)',
                lineHeight: '1.6'
              }}
              placeholder="Paste or type document text here to extract suffixes and build index..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Confirmation Banner */}
          {successMessage && (
            <div style={{
              background: 'var(--success-bg)',
              border: '1px solid var(--success-border)',
              color: 'var(--success)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isProcessing || !content.trim()}
          >
            {isProcessing ? 'Constructing Suffix Array...' : 'Index Document'}
          </button>
        </div>
      </form>
    </div>
  );
}
