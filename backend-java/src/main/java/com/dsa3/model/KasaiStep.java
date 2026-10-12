package com.dsa3.model;

public class KasaiStep {
    private int stepNumber;
    private int i;
    private String suffixI;
    private int currentRank;
    private Integer j;
    private String suffixJ;
    private int reusedH;
    private int newMatches;
    private int calculatedLcp;
    private int decrementedH;
    private String explanation;

    public KasaiStep() {}

    public KasaiStep(int stepNumber, int i, String suffixI, int currentRank, Integer j, String suffixJ,
                     int reusedH, int newMatches, int calculatedLcp, int decrementedH, String explanation) {
        this.stepNumber = stepNumber;
        this.i = i;
        this.suffixI = suffixI;
        this.currentRank = currentRank;
        this.j = j;
        this.suffixJ = suffixJ;
        this.reusedH = reusedH;
        this.newMatches = newMatches;
        this.calculatedLcp = calculatedLcp;
        this.decrementedH = decrementedH;
        this.explanation = explanation;
    }

    public int getStepNumber() { return stepNumber; }
    public void setStepNumber(int stepNumber) { this.stepNumber = stepNumber; }

    public int getI() { return i; }
    public void setI(int i) { this.i = i; }

    public String getSuffixI() { return suffixI; }
    public void setSuffixI(String suffixI) { this.suffixI = suffixI; }

    public int getCurrentRank() { return currentRank; }
    public void setCurrentRank(int currentRank) { this.currentRank = currentRank; }

    public Integer getJ() { return j; }
    public void setJ(Integer j) { this.j = j; }

    public String getSuffixJ() { return suffixJ; }
    public void setSuffixJ(String suffixJ) { this.suffixJ = suffixJ; }

    public int getReusedH() { return reusedH; }
    public void setReusedH(int reusedH) { this.reusedH = reusedH; }

    public int getNewMatches() { return newMatches; }
    public void setNewMatches(int newMatches) { this.newMatches = newMatches; }

    public int getCalculatedLcp() { return calculatedLcp; }
    public void setCalculatedLcp(int calculatedLcp) { this.calculatedLcp = calculatedLcp; }

    public int getDecrementedH() { return decrementedH; }
    public void setDecrementedH(int decrementedH) { this.decrementedH = decrementedH; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
