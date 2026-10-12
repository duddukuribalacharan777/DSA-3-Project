package com.dsa3.model;

import java.util.List;

public class LcpArrayResult {
    private List<Integer> rawLcp;
    private List<SuffixArrayRow> lcpResults;
    private List<Integer> rankArray;
    private List<KasaiStep> steps;
    private int totalSteps;
    private double constructionTimeMs;
    private String complexity;

    public LcpArrayResult() {}

    public LcpArrayResult(List<Integer> rawLcp, List<SuffixArrayRow> lcpResults, List<Integer> rankArray,
                          List<KasaiStep> steps, int totalSteps, double constructionTimeMs, String complexity) {
        this.rawLcp = rawLcp;
        this.lcpResults = lcpResults;
        this.rankArray = rankArray;
        this.steps = steps;
        this.totalSteps = totalSteps;
        this.constructionTimeMs = constructionTimeMs;
        this.complexity = complexity;
    }

    public List<Integer> getRawLcp() { return rawLcp; }
    public void setRawLcp(List<Integer> rawLcp) { this.rawLcp = rawLcp; }

    public List<SuffixArrayRow> getLcpResults() { return lcpResults; }
    public void setLcpResults(List<SuffixArrayRow> lcpResults) { this.lcpResults = lcpResults; }

    public List<Integer> getRankArray() { return rankArray; }
    public void setRankArray(List<Integer> rankArray) { this.rankArray = rankArray; }

    public List<KasaiStep> getSteps() { return steps; }
    public void setSteps(List<KasaiStep> steps) { this.steps = steps; }

    public int getTotalSteps() { return totalSteps; }
    public void setTotalSteps(int totalSteps) { this.totalSteps = totalSteps; }

    public double getConstructionTimeMs() { return constructionTimeMs; }
    public void setConstructionTimeMs(double constructionTimeMs) { this.constructionTimeMs = constructionTimeMs; }

    public String getComplexity() { return complexity; }
    public void setComplexity(String complexity) { this.complexity = complexity; }
}
