package com.dsa3.model;

import java.util.List;

public class SearchDetails {
    private String query;
    private String queryType;
    private List<Integer> binarySearchRange;
    private List<Object> matchedSuffixRange;
    private int lcpComparisonsSaved;
    private int totalComparisons;
    private double searchTimeMs;
    private int resultsCount;
    private int docsCount;
    private int lcpDepth;
    private String indexingStructure;

    public SearchDetails() {}

    public SearchDetails(String query, String queryType, List<Integer> binarySearchRange,
                         List<Object> matchedSuffixRange, int lcpComparisonsSaved, int totalComparisons,
                         double searchTimeMs, int resultsCount, int docsCount, int lcpDepth,
                         String indexingStructure) {
        this.query = query;
        this.queryType = queryType;
        this.binarySearchRange = binarySearchRange;
        this.matchedSuffixRange = matchedSuffixRange;
        this.lcpComparisonsSaved = lcpComparisonsSaved;
        this.totalComparisons = totalComparisons;
        this.searchTimeMs = searchTimeMs;
        this.resultsCount = resultsCount;
        this.docsCount = docsCount;
        this.lcpDepth = lcpDepth;
        this.indexingStructure = indexingStructure;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getQueryType() { return queryType; }
    public void setQueryType(String queryType) { this.queryType = queryType; }

    public List<Integer> getBinarySearchRange() { return binarySearchRange; }
    public void setBinarySearchRange(List<Integer> binarySearchRange) { this.binarySearchRange = binarySearchRange; }

    public List<Object> getMatchedSuffixRange() { return matchedSuffixRange; }
    public void setMatchedSuffixRange(List<Object> matchedSuffixRange) { this.matchedSuffixRange = matchedSuffixRange; }

    public int getLcpComparisonsSaved() { return lcpComparisonsSaved; }
    public void setLcpComparisonsSaved(int lcpComparisonsSaved) { this.lcpComparisonsSaved = lcpComparisonsSaved; }

    public int getTotalComparisons() { return totalComparisons; }
    public void setTotalComparisons(int totalComparisons) { this.totalComparisons = totalComparisons; }

    public double getSearchTimeMs() { return searchTimeMs; }
    public void setSearchTimeMs(double searchTimeMs) { this.searchTimeMs = searchTimeMs; }

    public int getResultsCount() { return resultsCount; }
    public void setResultsCount(int resultsCount) { this.resultsCount = resultsCount; }

    public int getDocsCount() { return docsCount; }
    public void setDocsCount(int docsCount) { this.docsCount = docsCount; }

    public int getLcpDepth() { return lcpDepth; }
    public void setLcpDepth(int lcpDepth) { this.lcpDepth = lcpDepth; }

    public String getIndexingStructure() { return indexingStructure; }
    public void setIndexingStructure(String indexingStructure) { this.indexingStructure = indexingStructure; }
}
