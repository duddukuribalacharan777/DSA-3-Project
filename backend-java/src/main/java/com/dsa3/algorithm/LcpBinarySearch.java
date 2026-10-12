package com.dsa3.algorithm;

import com.dsa3.model.BinarySearchSimulationResult;
import com.dsa3.model.SearchStep;
import com.dsa3.model.SuffixArrayRow;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * LCP-Accelerated Binary Search
 * 
 * Performs binary search on the Suffix Array to locate the range of suffixes [L, R]
 * matching a query pattern. Uses LCP bounds to skip redundant character comparisons,
 * reducing complexity from O(m log n) to O(m + log n).
 */
public class LcpBinarySearch {

    public static BinarySearchSimulationResult simulate(String text, List<SuffixArrayRow> suffixArray, List<Integer> lcpArray, String query) {
        if (text == null || suffixArray == null || suffixArray.isEmpty() || query == null || query.isEmpty()) {
            return new BinarySearchSimulationResult(false, Arrays.asList(-1, -1), 0, new ArrayList<>(), 0, 0, 0.0);
        }

        long startTime = System.nanoTime();
        int n = suffixArray.size();
        int m = query.length();
        List<SearchStep> steps = new ArrayList<>();
        int[] counters = new int[]{0, 0}; // [comparisonsMade, comparisonsSaved]

        // Find lower bound
        int low = 0;
        int high = n - 1;
        int firstIdx = -1;

        while (low <= high) {
            int mid = (low + high) / 2;
            String midSuffix = suffixArray.get(mid).getSuffix();

            int adjacentLcp = (lcpArray != null && mid < lcpArray.size() && lcpArray.get(mid) != null) ? lcpArray.get(mid) : 0;
            int skipOffset = Math.min(adjacentLcp, m - 1 > 0 ? m - 1 : 0);
            counters[1] += skipOffset;

            CmpResult cmp = comparePatternWithSuffix(query, midSuffix, skipOffset, counters);

            steps.add(new SearchStep(
                steps.size() + 1,
                "Locating Lower Bound",
                low,
                mid,
                high,
                mid,
                suffixArray.get(mid).getPosition(),
                midSuffix.substring(0, Math.min(midSuffix.length(), 24)),
                skipOffset,
                cmp.matchedLength,
                cmp.diff <= 0 ? "Pattern <= Suffix (search left)" : "Pattern > Suffix (search right)"
            ));

            if (cmp.diff <= 0) {
                if (cmp.diff == 0) firstIdx = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        if (firstIdx == -1) {
            long endTime = System.nanoTime();
            return new BinarySearchSimulationResult(
                false,
                Arrays.asList(-1, -1),
                0,
                steps,
                counters[1],
                counters[0],
                Math.round(((endTime - startTime) / 1_000_000.0) * 1000.0) / 1000.0
            );
        }

        // Find upper bound
        low = firstIdx;
        high = n - 1;
        int lastIdx = firstIdx;

        while (low <= high) {
            int mid = (low + high) / 2;
            String midSuffix = suffixArray.get(mid).getSuffix();

            if (midSuffix.startsWith(query)) {
                lastIdx = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        long endTime = System.nanoTime();
        int matchedCount = lastIdx - firstIdx + 1;

        return new BinarySearchSimulationResult(
            true,
            Arrays.asList(firstIdx, lastIdx),
            matchedCount,
            steps,
            counters[1],
            counters[0],
            Math.round(((endTime - startTime) / 1_000_000.0) * 1000.0) / 1000.0
        );
    }

    private static CmpResult comparePatternWithSuffix(String patt, String suff, int startOffset, int[] counters) {
        int k = startOffset;
        while (k < patt.length() && k < suff.length()) {
            counters[0]++;
            if (patt.charAt(k) != suff.charAt(k)) {
                return new CmpResult(patt.charAt(k) < suff.charAt(k) ? -1 : 1, k);
            }
            k++;
        }

        if (k == patt.length()) {
            return new CmpResult(0, k);
        }
        return new CmpResult(1, k);
    }

    private static class CmpResult {
        final int diff;
        final int matchedLength;

        CmpResult(int diff, int matchedLength) {
            this.diff = diff;
            this.matchedLength = matchedLength;
        }
    }
}
