package com.dsa3.model;

import java.util.List;
import java.util.Map;

public class SuffixArrayResult {
    private String text;
    private int length;
    private List<Map<String, Object>> unsortedSuffixes;
    private List<SuffixArrayRow> suffixArray;
    private double constructionTimeMs;
    private String complexity;

    public SuffixArrayResult() {}

    public SuffixArrayResult(String text, int length, List<Map<String, Object>> unsortedSuffixes,
                             List<SuffixArrayRow> suffixArray, double constructionTimeMs, String complexity) {
        this.text = text;
        this.length = length;
        this.unsortedSuffixes = unsortedSuffixes;
        this.suffixArray = suffixArray;
        this.constructionTimeMs = constructionTimeMs;
        this.complexity = complexity;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public int getLength() { return length; }
    public void setLength(int length) { this.length = length; }

    public List<Map<String, Object>> getUnsortedSuffixes() { return unsortedSuffixes; }
    public void setUnsortedSuffixes(List<Map<String, Object>> unsortedSuffixes) { this.unsortedSuffixes = unsortedSuffixes; }

    public List<SuffixArrayRow> getSuffixArray() { return suffixArray; }
    public void setSuffixArray(List<SuffixArrayRow> suffixArray) { this.suffixArray = suffixArray; }

    public double getConstructionTimeMs() { return constructionTimeMs; }
    public void setConstructionTimeMs(double constructionTimeMs) { this.constructionTimeMs = constructionTimeMs; }

    public String getComplexity() { return complexity; }
    public void setComplexity(String complexity) { this.complexity = complexity; }
}
