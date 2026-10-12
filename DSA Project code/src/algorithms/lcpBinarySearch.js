/**
 * ============================================================================
 * LCP-Accelerated Binary Search Algorithm
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ============================================================================
 * HOW DOES SEARCHING WORK ON A SUFFIX ARRAY?
 * - All suffixes in the Suffix Array (SA) are sorted in alphabetical order.
 * - Any occurrence of a pattern 'P' (length m) in the original text MUST appear
 *   as a prefix of one or more suffixes!
 * - Because the suffixes are sorted, all suffixes starting with 'P' will form a
 *   CONTIGUOUS RANGE [L, R] in the Suffix Array.
 * - Finding this range is done via Binary Search in TWO PHASES:
 *     Phase 1: Binary search to find Lower Bound (L) = first suffix starting with P.
 *     Phase 2: Binary search to find Upper Bound (R) = last suffix starting with P.
 * - Total matches = (R - L + 1). Their exact locations in the text are SA[L...R]!
 * 
 * WHY ACCELERATE WITH THE LCP ARRAY?
 * - Standard Binary Search:
 *     At each step, comparing pattern P with suffix SA[mid] takes up to m character
 *     comparisons from scratch. With log(n) steps, total time is O(m * log n).
 * 
 * - LCP-Accelerated Binary Search:
 *     The LCP array tells us how many characters SA[mid] shares with adjacent suffixes.
 *     If we know that 'k' characters are already guaranteed to match, we can
 *     SKIP directly to character index 'k' without comparing the first 'k' characters!
 *     This avoids redundant comparisons and reduces search time toward O(m + log n).
 * ============================================================================
 */

/**
 * Executes an LCP-accelerated binary search over the Suffix Array to locate
 * the matching suffix range [L, R] for a given query pattern.
 * 
 * @param {string} text - Source text string.
 * @param {Array} suffixArray - Suffix Array objects with position and suffix text.
 * @param {Array} lcpArray - Numerical LCP array between consecutive suffixes.
 * @param {string} query - Target search pattern string.
 * @returns {object} Search result with range [L, R], match count, steps, and telemetry.
 */
export function simulateLcpBinarySearch(text, suffixArray, lcpArray, query) {
  // Guard against missing or empty input
  if (!text || !suffixArray || suffixArray.length === 0 || !query) {
    return {
      found: false,
      matchRange: [-1, -1],
      totalMatches: 0,
      steps: [],
      comparisonsSaved: 0,
      comparisonsMade: 0,
      searchTimeMs: 0
    };
  }

  const startTime = performance.now();
  const totalSuffixes = suffixArray.length;
  const patternLength = query.length;
  const steps = [];
  let comparisonsMade = 0;
  let comparisonsSaved = 0;

  /**
   * Compares the query pattern with a suffix starting from a specified offset.
   * Characters before 'skipOffset' are guaranteed to match by LCP and are skipped.
   * 
   * @param {string} pattern - The query string to search for.
   * @param {string} suffixText - Suffix string from the sorted Suffix Array.
   * @param {number} skipOffset - Number of characters to skip using precomputed LCP.
   * @returns {object} diff (-1 if pattern < suffix, 0 if match, 1 if pattern > suffix) and matchedLength.
   */
  function comparePatternWithSuffix(pattern, suffixText, skipOffset = 0) {
    let charIndex = skipOffset;

    // Compare characters one by one starting from the skipped offset
    while (charIndex < pattern.length && charIndex < suffixText.length) {
      comparisonsMade++;
      if (pattern[charIndex] !== suffixText[charIndex]) {
        return {
          diff: pattern[charIndex] < suffixText[charIndex] ? -1 : 1,
          matchedLength: charIndex
        };
      }
      charIndex++;
    }

    // If all characters of the pattern matched, this suffix starts with the pattern!
    if (charIndex === pattern.length) {
      return { diff: 0, matchedLength: charIndex };
    }

    // The suffix is shorter than the pattern
    return { diff: 1, matchedLength: charIndex };
  }

  // ==========================================================================
  // PHASE 1: Find Lower Bound (L)
  // First rank in SA where the suffix is >= query pattern
  // ==========================================================================
  let low = 0;
  let high = totalSuffixes - 1;
  let firstMatchIdx = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midSuffix = suffixArray[mid].suffix;

    // LCP Acceleration: Look up precomputed LCP to determine safe character skip
    const adjacentLcp = lcpArray && lcpArray[mid] ? lcpArray[mid] : 0;
    const skipOffset = Math.min(adjacentLcp, Math.max(0, patternLength - 1));
    comparisonsSaved += skipOffset;

    const cmp = comparePatternWithSuffix(query, midSuffix, skipOffset);

    steps.push({
      step: steps.length + 1,
      phase: 'Phase 1: Finding Lower Bound (L)',
      low,
      mid,
      high,
      suffixRank: mid,
      suffixPos: suffixArray[mid].position,
      suffixPreview: midSuffix.substring(0, Math.min(midSuffix.length, 24)),
      skippedOffset: skipOffset,
      matchedLength: cmp.matchedLength,
      result: cmp.diff <= 0 ? 'Pattern <= Suffix (Search Left Branch)' : 'Pattern > Suffix (Search Right Branch)'
    });

    if (cmp.diff <= 0) {
      if (cmp.diff === 0) firstMatchIdx = mid; // Candidate match found; continue left for earliest
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  // If no match was found during Phase 1, the pattern does not exist in the text
  if (firstMatchIdx === -1) {
    const endTime = performance.now();
    return {
      found: false,
      matchRange: [-1, -1],
      totalMatches: 0,
      steps,
      comparisonsSaved,
      comparisonsMade,
      searchTimeMs: parseFloat((endTime - startTime).toFixed(3))
    };
  }

  // ==========================================================================
  // PHASE 2: Find Upper Bound (R)
  // Last rank in SA where the suffix starts with the query pattern
  // ==========================================================================
  low = firstMatchIdx;
  high = totalSuffixes - 1;
  let lastMatchIdx = firstMatchIdx;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midSuffix = suffixArray[mid].suffix;

    // LCP Acceleration for upper bound search
    const adjacentLcp = lcpArray && lcpArray[mid] ? lcpArray[mid] : 0;
    const skipOffset = Math.min(adjacentLcp, Math.max(0, patternLength - 1));
    comparisonsSaved += skipOffset;

    const cmp = comparePatternWithSuffix(query, midSuffix, skipOffset);

    steps.push({
      step: steps.length + 1,
      phase: 'Phase 2: Finding Upper Bound (R)',
      low,
      mid,
      high,
      suffixRank: mid,
      suffixPos: suffixArray[mid].position,
      suffixPreview: midSuffix.substring(0, Math.min(midSuffix.length, 24)),
      skippedOffset: skipOffset,
      matchedLength: cmp.matchedLength,
      result: cmp.diff === 0 ? 'Pattern Matches Suffix (Search Right for Upper Bound)' : 'Pattern Mismatch (Search Left)'
    });

    if (cmp.diff === 0) {
      lastMatchIdx = mid; // Valid match; continue right to find the latest
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const endTime = performance.now();
  const totalMatches = lastMatchIdx - firstMatchIdx + 1;

  // Collect starting text positions of all matches from SA[L...R]
  const matchedPositions = [];
  for (let rank = firstMatchIdx; rank <= lastMatchIdx; rank++) {
    matchedPositions.push(suffixArray[rank].position);
  }

  return {
    found: true,
    matchRange: [firstMatchIdx, lastMatchIdx],
    matchedPositions,
    totalMatches,
    steps,
    comparisonsSaved,
    comparisonsMade,
    searchTimeMs: parseFloat((endTime - startTime).toFixed(3))
  };
}
