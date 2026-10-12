/**
 * ============================================================================
 * Rabin-Karp Algorithm with Rolling Hash - CO2 Implementation
 * Course Outcome 2: Apply linear-time string algorithms (KMP, Z-function,
 * Rabin-Karp with rolling hash) to solve large-scale pattern-matching problems.
 * 
 * Asymptotic Complexity:
 * - Average / Expected Time: O(n + m)
 * - Worst Case (all hash collisions): O(n * m)
 * - Auxiliary Space Complexity: O(1) constant extra space
 * - Hash Invariant: H(i+1) = (d * (H(i) - text[i]*h) + text[i+m]) mod q
 * ============================================================================
 */

/**
 * Searches for all occurrences of pattern P in text T using Rabin-Karp.
 * 
 * @param {string} text - Source text (length n).
 * @param {string} pattern - Search pattern (length m).
 * @param {number} primeMod - Prime number for modular arithmetic (default 101).
 * @param {number} alphabetBase - Alphabet cardinality (default 256 for extended ASCII).
 * @returns {object} Match positions, collision counts, comparisons, and telemetry.
 */
export function rabinKarpSearch(text, pattern, primeMod = 1000000007, alphabetBase = 256) {
  if (!text || !pattern || pattern.length === 0 || text.length === 0 || pattern.length > text.length) {
    return {
      occurrences: [],
      spuriousHits: 0,
      comparisonsMade: 0,
      executionTimeMs: 0,
      algorithm: 'Rabin-Karp (Rolling Hash)',
      complexity: 'O(n + m) avg, O(n * m) worst'
    };
  }

  const startTime = performance.now();
  const n = text.length;
  const m = pattern.length;
  const d = alphabetBase;
  const q = primeMod;

  let patternHash = 0; // Hash value for pattern
  let windowHash = 0;  // Hash value for current text window of length m
  let h = 1;           // h = (d^(m - 1)) % q
  let comparisonsMade = 0;
  let spuriousHits = 0;
  const occurrences = [];

  // Precompute h = (d^(m - 1)) % q
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  // Calculate initial hash of pattern and first window of text
  for (let i = 0; i < m; i++) {
    patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
    windowHash = (d * windowHash + text.charCodeAt(i)) % q;
  }

  // Slide pattern over text one by one
  for (let i = 0; i <= n - m; i++) {
    // If hash matches, verify characters to eliminate spurious collision
    if (patternHash === windowHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        comparisonsMade++;
        if (text[i + j] !== pattern[j]) {
          match = false;
          spuriousHits++;
          break;
        }
      }
      if (match) {
        occurrences.push(i);
      }
    }

    // Compute rolling hash for next window: remove leading character, add trailing
    if (i < n - m) {
      windowHash = (d * (windowHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      // Handle negative modulo in JavaScript
      if (windowHash < 0) {
        windowHash = (windowHash + q) % q;
      }
    }
  }

  const endTime = performance.now();

  return {
    occurrences,
    totalMatches: occurrences.length,
    spuriousHits,
    comparisonsMade,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    algorithm: 'Rabin-Karp (Rolling Hash)',
    complexity: 'O(n + m) avg, O(n * m) worst'
  };
}
