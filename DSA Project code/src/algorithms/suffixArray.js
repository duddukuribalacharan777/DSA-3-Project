/**
 * ============================================================================
 * Suffix Array (SA) Construction Algorithm
 * Course: Data Structures and Algorithms - 3 (25CS2103E)
 * Team: Team 16 • Section 10
 * 
 * ============================================================================
 * WHAT IS A SUFFIX ARRAY?
 * A Suffix Array (SA) is an array of integers giving the starting positions of
 * ALL suffixes of a text string T of length n, sorted in alphabetical order.
 * 
 * INTUITIVE EXAMPLE ("banana", length n = 6):
 * ----------------------------------------------------------------------------
 * Original Suffixes in text order:
 *   i = 0: "banana"
 *   i = 1: "anana"
 *   i = 2: "nana"
 *   i = 3: "ana"
 *   i = 4: "na"
 *   i = 5: "a"
 * 
 * After Sorting Alphabetically:
 *   Rank 0: suffix starts at index 5 -> "a"
 *   Rank 1: suffix starts at index 3 -> "ana"
 *   Rank 2: suffix starts at index 1 -> "anana"
 *   Rank 3: suffix starts at index 0 -> "banana"
 *   Rank 4: suffix starts at index 4 -> "na"
 *   Rank 5: suffix starts at index 2 -> "nana"
 * 
 * The Suffix Array is simply the array of starting positions:
 *   SA = [5, 3, 1, 0, 4, 2]
 * 
 * WHY IS THIS POWERFUL FOR SEARCH ENGINES?
 * 1. Compact Memory:
 *    Storing SA requires only 4n bytes (an integer array). Suffix Trees require
 *    20n to 40n bytes of pointer overhead. Suffix Arrays save ~75-80% memory!
 * 2. Instant Substring Search:
 *    Every substring in the text is a prefix of some suffix. Because suffixes
 *    are alphabetically sorted, we can search for ANY query using Binary Search!
 * ============================================================================
 */

/**
 * Constructs the Suffix Array for a given input string.
 * 
 * @param {string} text - The input source string to index (e.g. "banana").
 * @returns {object} Result object containing:
 *   - text: The original source string
 *   - length: Length n of the string
 *   - unsortedSuffixes: Suffixes in original appearance order
 *   - suffixArray: Suffixes sorted alphabetically with rank and text position
 *   - constructionTimeMs: Execution time in milliseconds
 *   - complexity: 'O(n log² n)'
 */
export function buildSuffixArray(text) {
  // Guard against missing, empty, or non-string input
  if (!text || typeof text !== 'string') {
    return {
      text: '',
      length: 0,
      unsortedSuffixes: [],
      suffixArray: [],
      constructionTimeMs: 0,
      complexity: 'O(n log² n)'
    };
  }

  const startTime = performance.now();
  const textLength = text.length;

  // ==========================================================================
  // STEP 1: Generate all n suffixes with their original 0-indexed starting positions
  // ==========================================================================
  const unsortedSuffixes = [];
  for (let textIndex = 0; textIndex < textLength; textIndex++) {
    unsortedSuffixes.push({
      position: textIndex,                    // Original starting index in text
      suffix: text.substring(textIndex),      // Substring from textIndex to end
      length: textLength - textIndex          // Length of this suffix
    });
  }

  // ==========================================================================
  // STEP 2: Sort all suffixes in alphabetical (lexicographical) order
  // ==========================================================================
  // Comparing two strings character-by-character establishes dictionary order.
  const sortedSuffixes = [...unsortedSuffixes].sort((suffixA, suffixB) => {
    if (suffixA.suffix < suffixB.suffix) return -1;
    if (suffixA.suffix > suffixB.suffix) return 1;
    return 0;
  });

  // ==========================================================================
  // STEP 3: Assign alphabetical ranks (0 to n - 1) and build the Suffix Array SA[]
  // ==========================================================================
  // SA[rank] stores the original text position of the suffix at that rank.
  const suffixArray = sortedSuffixes.map((item, sortedRank) => ({
    rank: sortedRank,                         // Alphabetical rank (0 = smallest)
    position: item.position,                  // SA[rank]: starting index in original text
    suffix: item.suffix,                      // The suffix string
    length: item.length                       // Suffix character length
  }));

  const endTime = performance.now();

  return {
    text,
    length: textLength,
    unsortedSuffixes,
    suffixArray,
    constructionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    complexity: 'O(n log² n)'
  };
}
