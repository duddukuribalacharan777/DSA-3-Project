/**
 * ============================================================================
 * Knuth-Morris-Pratt (KMP) Algorithm - CO2 Implementation
 * Course Outcome 2: Apply linear-time string algorithms (KMP, Z-function,
 * Rabin-Karp with rolling hash) to solve large-scale pattern-matching problems.
 * 
 * Asymptotic Complexity:
 * - Preprocessing Time (LPS / Pi Array): O(m)
 * - Matching Time: O(n)
 * - Total Time Complexity: O(n + m) Strictly Linear
 * - Auxiliary Space Complexity: O(m) for the LPS array
 * ============================================================================
 */

/**
 * Computes the Longest Proper Prefix which is also Suffix (LPS / Pi) array.
 * LPS[i] stores the length of the longest proper prefix of pattern[0...i]
 * that is also a suffix of pattern[0...i].
 * 
 * @param {string} pattern - The search pattern string of length m.
 * @returns {Array<number>} LPS array of length m.
 */
export function computeLPSArray(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0; // Length of the previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        // Fallback to previous known prefix boundary without resetting to 0
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

/**
 * Executes KMP pattern search over text T for pattern P.
 * 
 * @param {string} text - The source document / corpus text of length n.
 * @param {string} pattern - Search pattern of length m.
 * @returns {object} Search metrics, match positions, comparisons, and LPS table.
 */
export function kmpSearch(text, pattern) {
  if (!text || !pattern || pattern.length === 0 || text.length === 0) {
    return {
      occurrences: [],
      comparisonsMade: 0,
      executionTimeMs: 0,
      lps: [],
      algorithm: 'Knuth-Morris-Pratt (KMP)',
      complexity: 'O(n + m)'
    };
  }

  const startTime = performance.now();
  const n = text.length;
  const m = pattern.length;
  const lps = computeLPSArray(pattern);
  const occurrences = [];
  let comparisonsMade = 0;

  let i = 0; // Index for text
  let j = 0; // Index for pattern

  while (i < n) {
    comparisonsMade++;
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === m) {
      // Complete match found at text index (i - j)
      occurrences.push(i - j);
      j = lps[j - 1]; // Shift pattern using LPS
    } else if (i < n && pattern[j] !== text[i]) {
      // Mismatch after j matches
      if (j !== 0) {
        j = lps[j - 1]; // Skip redundant comparisons
      } else {
        i++;
      }
    }
  }

  const endTime = performance.now();

  return {
    occurrences,
    totalMatches: occurrences.length,
    comparisonsMade,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    lps,
    algorithm: 'Knuth-Morris-Pratt (KMP)',
    complexity: 'O(n + m)'
  };
}
