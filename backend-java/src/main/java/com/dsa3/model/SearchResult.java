package com.dsa3.model;

import java.util.List;

/**
 * Result item for a document matching a query.
 */
public class SearchResult {
    private String documentId;
    private String documentTitle;
    private String filename;
    private String author;
    private String category;
    private double score;
    private int termFrequency;
    private int primaryPosition;
    private List<Integer> occurrences;
    private String snippet;
    private int lcp;
    private String queryTerm;

    public SearchResult() {}

    public SearchResult(String documentId, String documentTitle, String filename, String author, String category,
                        double score, int termFrequency, int primaryPosition, List<Integer> occurrences,
                        String snippet, int lcp, String queryTerm) {
        this.documentId = documentId;
        this.documentTitle = documentTitle;
        this.filename = filename;
        this.author = author;
        this.category = category;
        this.score = score;
        this.termFrequency = termFrequency;
        this.primaryPosition = primaryPosition;
        this.occurrences = occurrences;
        this.snippet = snippet;
        this.lcp = lcp;
        this.queryTerm = queryTerm;
    }

    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }

    public String getDocumentTitle() { return documentTitle; }
    public void setDocumentTitle(String documentTitle) { this.documentTitle = documentTitle; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public int getTermFrequency() { return termFrequency; }
    public void setTermFrequency(int termFrequency) { this.termFrequency = termFrequency; }

    public int getPrimaryPosition() { return primaryPosition; }
    public void setPrimaryPosition(int primaryPosition) { this.primaryPosition = primaryPosition; }

    public List<Integer> getOccurrences() { return occurrences; }
    public void setOccurrences(List<Integer> occurrences) { this.occurrences = occurrences; }

    public String getSnippet() { return snippet; }
    public void setSnippet(String snippet) { this.snippet = snippet; }

    public int getLcp() { return lcp; }
    public void setLcp(int lcp) { this.lcp = lcp; }

    public String getQueryTerm() { return queryTerm; }
    public void setQueryTerm(String queryTerm) { this.queryTerm = queryTerm; }
}
