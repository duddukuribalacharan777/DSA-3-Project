package com.dsa3.model;

public class SuffixArrayRow {
    private int rank;
    private int position;
    private String suffix;
    private int length;
    private Object lcp; // Integer or "—"

    public SuffixArrayRow() {}

    public SuffixArrayRow(int rank, int position, String suffix, int length) {
        this.rank = rank;
        this.position = position;
        this.suffix = suffix;
        this.length = length;
        this.lcp = "—";
    }

    public SuffixArrayRow(int rank, int position, String suffix, int length, Object lcp) {
        this.rank = rank;
        this.position = position;
        this.suffix = suffix;
        this.length = length;
        this.lcp = lcp;
    }

    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }

    public String getSuffix() { return suffix; }
    public void setSuffix(String suffix) { this.suffix = suffix; }

    public int getLength() { return length; }
    public void setLength(int length) { this.length = length; }

    public Object getLcp() { return lcp; }
    public void setLcp(Object lcp) { this.lcp = lcp; }
}
