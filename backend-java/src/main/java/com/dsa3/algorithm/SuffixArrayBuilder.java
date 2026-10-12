package com.dsa3.algorithm;

import com.dsa3.model.SuffixArrayResult;
import com.dsa3.model.SuffixArrayRow;

import java.util.*;

/**
 * Suffix Array Construction Algorithm
 * 
 * Generates the sorted array of all suffix starting positions for an input text.
 * Asymptotic Complexity: O(n log^2 n) via standard suffix doubling / sorting comparison.
 */
public class SuffixArrayBuilder {

    public static SuffixArrayResult build(String text) {
        if (text == null || text.isEmpty()) {
            return new SuffixArrayResult("", 0, Collections.emptyList(), Collections.emptyList(), 0.0, "O(n log² n)");
        }

        long startTime = System.nanoTime();
        int n = text.length();

        // 1. Generate unsorted suffixes with their 0-indexed positions
        List<Map<String, Object>> unsortedSuffixes = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("position", i);
            map.put("suffix", text.substring(i));
            map.put("length", n - i);
            unsortedSuffixes.add(map);
        }

        // 2. Sort suffixes lexicographically
        List<SuffixItem> items = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            items.add(new SuffixItem(i, text.substring(i), n - i));
        }

        items.sort(Comparator.comparing(a -> a.suffix));

        // 3. Extract the Suffix Array SA[]
        List<SuffixArrayRow> suffixArray = new ArrayList<>(n);
        for (int rank = 0; rank < n; rank++) {
            SuffixItem item = items.get(rank);
            suffixArray.add(new SuffixArrayRow(rank, item.position, item.suffix, item.length));
        }

        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;

        return new SuffixArrayResult(
            text,
            n,
            unsortedSuffixes,
            suffixArray,
            Math.round(timeMs * 1000.0) / 1000.0,
            "O(n log² n)"
        );
    }

    private static class SuffixItem {
        final int position;
        final String suffix;
        final int length;

        SuffixItem(int position, String suffix, int length) {
            this.position = position;
            this.suffix = suffix;
            this.length = length;
        }
    }
}
