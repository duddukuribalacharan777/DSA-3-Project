/**
 * ============================================================================
 * Kasai's Algorithm for Longest Common Prefix (LCP) Array Construction
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ============================================================================
 * WHAT IS THE LCP ARRAY?
 * - The Suffix Array (SA) lists all suffixes of a text in alphabetical order.
 * - The LCP Array stores the length of the Longest Common Prefix between each
 *   suffix and the one immediately before it in the sorted Suffix Array:
 * 
 *     LCP[k] = length of common prefix between suffix SA[k - 1] and suffix SA[k]
 *     LCP[0] = 0 (by convention, the first sorted suffix has no predecessor)
 * 
 * WHY NOT USE THE NAIVE COMPARISON METHOD?
 * - Comparing adjacent suffixes from scratch takes O(n) per pair.
 * - For n suffixes, naive construction takes O(n²) time — too slow for large texts.
 * 
 * HOW DOES KASAI'S ALGORITHM ACHIEVE STRICTLY O(n) TIME?
 * 1. Kasai processes suffixes in their ORIGINAL TEXT APPEARANCE order:
 *      i = 0 ("banana"), i = 1 ("anana"), i = 2 ("nana"), ...
 * 2. Kasai's Invariant Theorem:
 *      If suffix i has an LCP of 'h' with its sorted predecessor,
 *      then suffix (i + 1) must share AT LEAST (h - 1) characters with its
 *      new sorted predecessor!
 *      Invariant formula: h_{i+1} >= h_i - 1
 * 3. Why? Moving from suffix i to suffix (i + 1) only removes the first character.
 *    The remaining (h - 1) matching characters are still identical!
 * 4. Therefore, we can SKIP re-evaluating the first (h - 1) characters and start
 *    comparing from offset h.
 * 5. Because h decreases by at most 1 in each step (at most n times total) and
 *    h can never exceed n, the while-loop character comparison runs AT MOST 2n
 *    times across the entire algorithm.
 *    -> Strictly O(n) linear time complexity!
 * ============================================================================
 */

/**
 * Builds the LCP Array using Kasai's linear-time O(n) algorithm.
 * 
 * @param {string} text - The input source string (e.g., "banana").
 * @param {object} suffixArrayObj - Object containing the precomputed Suffix Array.
 * @returns {object} Formatted LCP array, raw numerical array, execution trace, and runtime.
 */
export function buildKasaiLcp(text, suffixArrayObj) {
  // Guard against missing, empty, or invalid input
  if (!text || typeof text !== 'string' || !suffixArrayObj || !suffixArrayObj.suffixArray) {
    return {
      lcpArray: [],
      lcpResults: [],
      rawLcp: [],
      steps: [],
      totalSteps: 0,
      constructionTimeMs: 0,
      complexity: 'O(n)'
    };
  }

  const startTime = performance.now();
  const textLength = text.length;

  // Extract starting indices array SA[] (where each suffix begins in the original text)
  const saPositions = suffixArrayObj.suffixArray.map(item => item.position);

  // ==========================================================================
  // STEP 1: Invert the Suffix Array to construct the Rank Array
  // ==========================================================================
  // Problem: Given an original text index i, which rank does suffix text[i...] hold in SA?
  // Solution: rankArray[i] stores the sorted position (0 to n - 1) of suffix text[i...].
  // Example for "banana":
  //   Suffix at pos 5 ("a") is sorted at Rank 0 -> rankArray[5] = 0
  //   Suffix at pos 3 ("ana") is sorted at Rank 1 -> rankArray[3] = 1
  // This allows O(1) instant lookup of any suffix's sorted position.
  const rankArray = new Array(textLength).fill(0);
  for (let sortedRank = 0; sortedRank < textLength; sortedRank++) {
    const originalTextPos = saPositions[sortedRank];
    rankArray[originalTextPos] = sortedRank;
  }

  // ==========================================================================
  // STEP 2: Initialize LCP array and common prefix accumulator (h)
  // ==========================================================================
  const rawLcp = new Array(textLength).fill(0);
  let commonPrefixLen = 0; // Length of reusable matched prefix (historically 'h')
  const steps = [];        // Educational execution trace for step-by-step UI walkthrough

  // ==========================================================================
  // STEP 3: Process suffixes in sequential text appearance order (i = 0 to n - 1)
  // ==========================================================================
  for (let currentSuffixPos = 0; currentSuffixPos < textLength; currentSuffixPos++) {
    // Look up where our current suffix sits in the sorted Suffix Array
    const currentRank = rankArray[currentSuffixPos];

    // Case A: The suffix is at Rank 0 (alphabetically smallest, e.g., "a" in "banana")
    // Rank 0 has NO predecessor in sorted order, so its LCP is defined as 0.
    if (currentRank === 0) {
      rawLcp[0] = 0;
      steps.push({
        stepNumber: steps.length + 1,
        i: currentSuffixPos,
        suffixI: text.substring(currentSuffixPos),
        currentRank: 0,
        j: null,
        suffixJ: null,
        reusedH: 0,
        newMatches: 0,
        calculatedLcp: 0,
        decrementedH: 0,
        explanation: `Suffix at pos ${currentSuffixPos} ("${text.substring(currentSuffixPos)}") is at Rank 0 (alphabetically smallest). It has no predecessor in sorted order, so LCP is 0.`
      });
      continue;
    }

    // Case B: Suffix has a predecessor in sorted order (Rank > 0)
    // Find where the immediately preceding suffix starts in the text
    const predecessorSuffixPos = saPositions[currentRank - 1];

    // Record how many characters we can safely reuse from Kasai's invariant
    const reusedCharacters = commonPrefixLen;
    let newMatches = 0;

    // STEP 4: Character comparison — start comparing from offset commonPrefixLen
    // Skip checking the first 'commonPrefixLen' characters because they are
    // GUARANTEED to match by Kasai's Theorem!
    while (
      currentSuffixPos + commonPrefixLen < textLength &&
      predecessorSuffixPos + commonPrefixLen < textLength &&
      text[currentSuffixPos + commonPrefixLen] === text[predecessorSuffixPos + commonPrefixLen]
    ) {
      commonPrefixLen++;
      newMatches++;
    }

    // Store the calculated LCP value for this sorted rank
    rawLcp[currentRank] = commonPrefixLen;

    // Record step trace details for UI visualization
    steps.push({
      stepNumber: steps.length + 1,
      i: currentSuffixPos,
      suffixI: text.substring(currentSuffixPos),
      currentRank,
      j: predecessorSuffixPos,
      suffixJ: text.substring(predecessorSuffixPos),
      reusedH: reusedCharacters,
      newMatches,
      calculatedLcp: commonPrefixLen,
      decrementedH: Math.max(0, commonPrefixLen - 1),
      explanation: `Suffix at pos ${currentSuffixPos} ("${text.substring(currentSuffixPos)}") is compared with sorted predecessor at pos ${predecessorSuffixPos} ("${text.substring(predecessorSuffixPos)}"). Reused ${reusedCharacters} characters from Kasai invariant, found ${newMatches} new matching character(s) -> LCP[Rank ${currentRank}] = ${commonPrefixLen}. Starting value for next suffix = max(0, ${commonPrefixLen} - 1) = ${Math.max(0, commonPrefixLen - 1)}.`
    });

    // STEP 5: Kasai Invariant Decrement
    // For the next suffix in text order (currentSuffixPos + 1), the first character
    // is dropped, so the guaranteed common prefix length decreases by at most 1.
    if (commonPrefixLen > 0) {
      commonPrefixLen--;
    }
  }

  const endTime = performance.now();

  // ==========================================================================
  // STEP 6: Format results for table display and frontend components
  // ==========================================================================
  const lcpResults = suffixArrayObj.suffixArray.map((item, idx) => ({
    rank: idx,
    position: item.position,
    suffix: item.suffix,
    lcp: idx === 0 ? 0 : rawLcp[idx],
    displayLcp: idx === 0 ? '—' : rawLcp[idx]
  }));

  return {
    lcpArray: lcpResults,
    lcpResults: lcpResults,
    rawLcp,
    steps,
    totalSteps: steps.length,
    constructionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    complexity: 'O(n)'
  };
}
