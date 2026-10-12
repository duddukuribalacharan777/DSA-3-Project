package com.dsa3.model;

import java.util.List;

public class SearchResponse {
    private List<SearchResult> results;
    private int totalMatches;
    private int totalDocsMatched;
    private double queryTimeMs;
    private String queryType;
    private String queryText;
    private SearchDetails searchDetails;

    public SearchResponse() {}

    public SearchResponse(List<SearchResult> results, int totalMatches, int totalDocsMatched,
                          double queryTimeMs, String queryType, String queryText, SearchDetails searchDetails) {
        this.results = results;
        this.totalMatches = totalMatches;
        this.totalDocsMatched = totalDocsMatched;
        this.queryTimeMs = queryTimeMs;
        this.queryType = queryType;
        this.queryText = queryText;
        this.searchDetails = searchDetails;
    }

    public List<SearchResult> getResults() { return results; }
    public void setResults(List<SearchResult> results) { this.results = results; }

    public int getTotalMatches() { return totalMatches; }
    public void setTotalMatches(int totalMatches) { this.totalMatches = totalMatches; }

    public int getTotalDocsMatched() { return totalDocsMatched; }
    public void setTotalDocsMatched(int totalDocsMatched) { this.totalDocsMatched = totalDocsMatched; }

    public double getQueryTimeMs() { return queryTimeMs; }
    public void setQueryTimeMs(double queryTimeMs) { this.queryTimeMs = queryTimeMs; }

    public String getQueryType() { return queryType; }
    public void setQueryType(String queryType) { this.queryType = queryType; }

    public String getQueryText() { return queryText; }
    public void setQueryText(String queryText) { this.queryText = queryText; }

    public SearchDetails getSearchDetails() { return searchDetails; }
    public void setSearchDetails(SearchDetails searchDetails) { this.searchDetails = searchDetails; }
}
