/**
 * ============================================================================
 * Z-Algorithm (Z-Function) - CO2 Implementation
 * Course Outcome 2: Apply linear-time string algorithms (KMP, Z-function,
 * Rabin-Karp with rolling hash) to solve large-scale pattern-matching problems.
 * 
 * Asymptotic Complexity:
 * - Time Complexity: Strictly Linear O(n + m)
 * - Auxiliary Space Complexity: O(n + m) for Z-array
 * - Invariant: Maintains [L, R] segment (Z-box) representing the rightmost
 *   substring that matches a prefix of the concatenated string.
 * ============================================================================
 */

/**
 * Computes the Z-array for string S.
 * Z[i] is the length of the longest substring starting from S[i]
 * that is also a prefix of S.
 * 
 * @param {string} s - Input string.
 * @returns {Array<number>} Z-array.
 */
export function computeZArray(s) {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0;
  let r = 0; // [l, r] defines the active Z-box boundary

  for (let i = 1; i < n; i++) {
    if (i <= r) {
      // Inside active Z-box: copy previously computed value bounded by box limit
      z[i] = Math.min(r - i + 1, z[i - l]);
    }

    // Attempt to extend past current boundary
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }

    // If extended past r, update new Z-box boundary
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }

  return z;
}

/**
 * Searches for all occurrences of pattern P in text T using the Z-algorithm.
 * Constructs concatenated string S = pattern + '$' + text, computes Z-array,
 * and matches where Z[i] === pattern.length.
 * 
 * @param {string} text - Source text.
 * @param {string} pattern - Search pattern.
 * @returns {object} Match positions, comparison telemetry, and Z-array sample.
 */
export function zSearch(text, pattern) {
  if (!text || !pattern || pattern.length === 0 || text.length === 0) {
    return {
      occurrences: [],
      comparisonsMade: 0,
      executionTimeMs: 0,
      zSample: [],
      algorithm: 'Z-Function (Z-Algorithm)',
      complexity: 'O(n + m)'
    };
  }

  const startTime = performance.now();
  const m = pattern.length;
  const separator = '$';
  const concat = pattern + separator + text;
  const concatLength = concat.length;
  const z = computeZArray(concat);
  const occurrences = [];

  for (let i = m + 1; i < concatLength; i++) {
    if (z[i] === m) {
      // Offset into the original text is i - (m + 1)
      occurrences.push(i - (m + 1));
    }
  }

  const endTime = performance.now();

  return {
    occurrences,
    totalMatches: occurrences.length,
    comparisonsMade: concatLength,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    zSample: z.slice(0, Math.min(30, z.length)),
    algorithm: 'Z-Function (Z-Algorithm)',
    complexity: 'O(n + m)'
  };
}
