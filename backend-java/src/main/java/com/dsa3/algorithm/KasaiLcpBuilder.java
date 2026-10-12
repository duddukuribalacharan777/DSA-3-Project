package com.dsa3.algorithm;

import com.dsa3.model.KasaiStep;
import com.dsa3.model.LcpArrayResult;
import com.dsa3.model.SuffixArrayResult;
import com.dsa3.model.SuffixArrayRow;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Kasai's Algorithm for Longest Common Prefix (LCP) Array Construction
 * 
 * Computes the LCP array in O(n) linear time by traversing suffixes in text order (0 to n-1)
 * and utilizing the property: if LCP(suffix i, suffix j) = h, then LCP for suffix (i+1)
 * is at least (h - 1).
 */
public class KasaiLcpBuilder {

    public static LcpArrayResult build(String text, SuffixArrayResult saObj) {
        if (text == null || text.isEmpty() || saObj == null || saObj.getSuffixArray() == null || saObj.getSuffixArray().isEmpty()) {
            return new LcpArrayResult(Collections.emptyList(), Collections.emptyList(), Collections.emptyList(), Collections.emptyList(), 0, 0.0, "O(n)");
        }

        long startTime = System.nanoTime();
        int n = text.length();
        List<SuffixArrayRow> saRows = saObj.getSuffixArray();
        int[] sa = new int[n];
        for (int r = 0; r < n; r++) {
            sa[r] = saRows.get(r).getPosition();
        }

        // 1. Build rank array: rank[i] is index of suffix starting at i in SA
        int[] rank = new int[n];
        for (int r = 0; r < n; r++) {
            rank[sa[r]] = r;
        }

        // 2. Initialize LCP array
        int[] lcp = new int[n];
        int h = 0;

        List<KasaiStep> steps = new ArrayList<>();

        // 3. Process suffixes in original string order: i = 0 to n-1
        for (int i = 0; i < n; i++) {
            int currentRank = rank[i];

            if (currentRank > 0) {
                int j = sa[currentRank - 1];
                int startH = h;
                int matches = 0;

                while (i + h < n && j + h < n && text.charAt(i + h) == text.charAt(j + h)) {
                    h++;
                    matches++;
                }

                lcp[currentRank] = h;

                String suffI = text.substring(i);
                String suffJ = text.substring(j);
                int decremented = Math.max(0, h - 1);
                String explanation = String.format(
                    "Processed suffix at pos %d (\"%s\"). Compared with adjacent sorted suffix at pos %d (\"%s\"). Reused h=%d, found %d new match(es) -> LCP[rank %d] = %d. Next h = max(0, %d-1) = %d.",
                    i, suffI, j, suffJ, startH, matches, currentRank, h, h, decremented
                );

                steps.add(new KasaiStep(
                    steps.size() + 1,
                    i,
                    suffI,
                    currentRank,
                    j,
                    suffJ,
                    startH,
                    matches,
                    h,
                    decremented,
                    explanation
                ));

                if (h > 0) {
                    h--;
                }
            } else {
                lcp[0] = 0;
                String suffI = text.substring(i);
                steps.add(new KasaiStep(
                    steps.size() + 1,
                    i,
                    suffI,
                    0,
                    null,
                    null,
                    0,
                    0,
                    0,
                    0,
                    String.format("Suffix at pos %d (\"%s\") is at Rank 0 (lexicographically smallest). LCP is undefined / 0.", i, suffI)
                ));
            }
        }

        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;

        List<Integer> rawLcp = new ArrayList<>(n);
        List<Integer> rankList = new ArrayList<>(n);
        List<SuffixArrayRow> lcpResults = new ArrayList<>(n);

        for (int k = 0; k < n; k++) {
            rawLcp.add(lcp[k]);
            rankList.add(rank[k]);
            SuffixArrayRow old = saRows.get(k);
            Object displayVal = (k == 0) ? "—" : lcp[k];
            lcpResults.add(new SuffixArrayRow(old.getRank(), old.getPosition(), old.getSuffix(), old.getLength(), displayVal));
        }

        return new LcpArrayResult(
            rawLcp,
            lcpResults,
            rankList,
            steps,
            steps.size(),
            Math.round(timeMs * 1000.0) / 1000.0,
            "O(n)"
        );
    }
}
