package com.dsa3.model;

import java.util.List;

public class BinarySearchSimulationResult {
    private boolean found;
    private List<Integer> matchRange;
    private int totalMatches;
    private List<SearchStep> steps;
    private int comparisonsSaved;
    private int comparisonsMade;
    private double searchTimeMs;

    public BinarySearchSimulationResult() {}

    public BinarySearchSimulationResult(boolean found, List<Integer> matchRange, int totalMatches,
                                        List<SearchStep> steps, int comparisonsSaved, int comparisonsMade,
                                        double searchTimeMs) {
        this.found = found;
        this.matchRange = matchRange;
        this.totalMatches = totalMatches;
        this.steps = steps;
        this.comparisonsSaved = comparisonsSaved;
        this.comparisonsMade = comparisonsMade;
        this.searchTimeMs = searchTimeMs;
    }

    public boolean isFound() { return found; }
    public void setFound(boolean found) { this.found = found; }

    public List<Integer> getMatchRange() { return matchRange; }
    public void setMatchRange(List<Integer> matchRange) { this.matchRange = matchRange; }

    public int getTotalMatches() { return totalMatches; }
    public void setTotalMatches(int totalMatches) { this.totalMatches = totalMatches; }

    public List<SearchStep> getSteps() { return steps; }
    public void setSteps(List<SearchStep> steps) { this.steps = steps; }

    public int getComparisonsSaved() { return comparisonsSaved; }
    public void setComparisonsSaved(int comparisonsSaved) { this.comparisonsSaved = comparisonsSaved; }

    public int getComparisonsMade() { return comparisonsMade; }
    public void setComparisonsMade(int comparisonsMade) { this.comparisonsMade = comparisonsMade; }

    public double getSearchTimeMs() { return searchTimeMs; }
    public void setSearchTimeMs(double searchTimeMs) { this.searchTimeMs = searchTimeMs; }
}
