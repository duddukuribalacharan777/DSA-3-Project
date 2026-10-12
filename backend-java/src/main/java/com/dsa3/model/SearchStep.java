package com.dsa3.model;

public class SearchStep {
    private int step;
    private String phase;
    private int low;
    private int mid;
    private int high;
    private int suffixRank;
    private int suffixPos;
    private String suffixPreview;
    private int skippedOffset;
    private int matchedLength;
    private String result;

    public SearchStep() {}

    public SearchStep(int step, String phase, int low, int mid, int high, int suffixRank,
                      int suffixPos, String suffixPreview, int skippedOffset, int matchedLength, String result) {
        this.step = step;
        this.phase = phase;
        this.low = low;
        this.mid = mid;
        this.high = high;
        this.suffixRank = suffixRank;
        this.suffixPos = suffixPos;
        this.suffixPreview = suffixPreview;
        this.skippedOffset = skippedOffset;
        this.matchedLength = matchedLength;
        this.result = result;
    }

    public int getStep() { return step; }
    public void setStep(int step) { this.step = step; }

    public String getPhase() { return phase; }
    public void setPhase(String phase) { this.phase = phase; }

    public int getLow() { return low; }
    public void setLow(int low) { this.low = low; }

    public int getMid() { return mid; }
    public void setMid(int mid) { this.mid = mid; }

    public int getHigh() { return high; }
    public void setHigh(int high) { this.high = high; }

    public int getSuffixRank() { return suffixRank; }
    public void setSuffixRank(int suffixRank) { this.suffixRank = suffixRank; }

    public int getSuffixPos() { return suffixPos; }
    public void setSuffixPos(int suffixPos) { this.suffixPos = suffixPos; }

    public String getSuffixPreview() { return suffixPreview; }
    public void setSuffixPreview(String suffixPreview) { this.suffixPreview = suffixPreview; }

    public int getSkippedOffset() { return skippedOffset; }
    public void setSkippedOffset(int skippedOffset) { this.skippedOffset = skippedOffset; }

    public int getMatchedLength() { return matchedLength; }
    public void setMatchedLength(int matchedLength) { this.matchedLength = matchedLength; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
}
