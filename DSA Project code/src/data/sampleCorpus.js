/**
 * Seed Corpus of 12 Academic Documents
 * Designed for Full-Text Search Engine on Suffix-Array Index (DSA-3)
 */

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-01",
    filename: "research_paper_suffix_structures.txt",
    title: "Linear-Time Text Indexing with Suffix Arrays and LCP Arrays",
    author: "Manber, Myers & Kasai Research Group",
    category: "Algorithms",
    status: "INDEXED",
    dateIndexed: "2026-09-18",
    content: `The fundamental challenge of full-text search across massive document collections is balancing query latency with index memory consumption. Traditional inverted index structures excel at discrete term frequency retrieval, but degrade significantly on arbitrary substring and wildcard queries. A Suffix Array provides a lexicographically sorted array of all suffix starting positions within the text corpus, eliminating the pointer-heavy memory overhead of suffix trees while preserving linear search capabilities. When coupled with Kasai's algorithm for constructing the Longest Common Prefix (LCP) array in O(n) time, binary search over the suffix array is accelerated to O(m + log n). This allows fast substring matching, exact prefix extraction, and multi-word phrase queries across millions of characters with minimal RAM usage.`
  },
  {
    id: "doc-02",
    filename: "algorithm_notes_kasai_analysis.txt",
    title: "Theoretical Analysis of Kasai's LCP Construction Algorithm",
    author: "Department of Computer Science & IT",
    category: "Data Structures",
    status: "INDEXED",
    dateIndexed: "2026-09-18",
    content: `Kasai's algorithm is an elegant linear-time algorithm to build the LCP array from a pre-constructed Suffix Array and original text. The critical insight lies in processing suffixes in their original sequential text order (i = 0 to n-1) rather than lexicographical suffix array order. Let h denote the LCP between suffix i and its predecessor in the suffix array. When moving to suffix i+1, the common prefix length decreases by at most one, meaning h can be initialized to max(0, h - 1). Because h increases at most n times across all iterations and decreases at most n times, the overall time complexity is strictly bounded by O(n). This dramatically reduces repeated character comparisons compared to naive quadratic checks.`
  },
  {
    id: "doc-03",
    filename: "lcp_accelerated_binary_search_spec.txt",
    title: "LCP-Accelerated Binary Search: Theory and Implementation",
    author: "DSA-3 Advanced Indexing Lab",
    category: "Algorithms",
    status: "INDEXED",
    dateIndexed: "2026-09-19",
    content: `Standard binary search over a sorted suffix array requires O(m * log n) time, where m is the query pattern length and n is the text length. At each comparison step, up to m characters are evaluated to determine whether the query string precedes or succeeds the middle suffix. By utilizing precomputed LCP values between adjacent suffixes, we can determine the longest common prefix between the query and search boundaries without re-evaluating known characters. Whenever the LCP between the search boundary and the middle element exceeds the current matching prefix, character comparisons are skipped. This accelerates full-text substring queries to O(m + log n) time complexity, delivering sub-millisecond query response in real-world search engines.`
  },
  {
    id: "doc-04",
    filename: "relevance_ranking_tf_scoring.txt",
    title: "Relevance Ranking and Term Frequency in Suffix Indexes",
    author: "Information Retrieval Group",
    category: "Search Systems",
    status: "INDEXED",
    dateIndexed: "2026-09-19",
    content: `In a modern full-text search engine, returning all matching substring occurrences is only the initial stage. High-precision retrieval requires effective relevance ranking based on term frequency, match proximity, and inverse document frequency. Because a Suffix Array locates all occurrences of a search pattern as a contiguous range [L, R] of suffixes, the term frequency within a document is simply computed in O(1) time as (R - L + 1). Documents with higher term density and earlier occurrence positions are prioritized with higher relevance scores. Furthermore, phrase search verifies exact token sequence continuity across adjacent suffix positions, providing ranked search results tailored to user queries.`
  },
  {
    id: "doc-05",
    filename: "data_structures_comparative_survey.txt",
    title: "Comparative Study: Suffix Trees vs Suffix Arrays vs Inverted Indexes",
    author: "CS Systems Review",
    category: "Architecture",
    status: "INDEXED",
    dateIndexed: "2026-09-20",
    content: `Data structures for full-text indexing have evolved through multiple paradigms. Suffix trees provide optimal asymptotic search bounds for any substring, but require 20 to 30 bytes of pointer overhead per indexed character, making them impractical for gigabyte-scale corpora. Conversely, a Suffix Array represents the same information in only 4 bytes per character (using 32-bit integers), representing an 80% reduction in memory consumption. When supplemented with an auxiliary LCP array generated via Kasai's algorithm, suffix arrays achieve search performance comparable to suffix trees while maintaining a compact, cache-friendly flat array layout suitable for production search engines.`
  },
  {
    id: "doc-06",
    filename: "bioinformatics_dna_pattern_matching.txt",
    title: "Applications of Suffix Arrays in Genomic DNA Sequence Search",
    author: "Computational Biology Lab",
    category: "Bioinformatics",
    status: "INDEXED",
    dateIndexed: "2026-09-20",
    content: `Genomic data consists of vast strings over a four-letter alphabet {A, C, G, T}. Identifying recurring motifs, gene sequences, and mutations requires searching large text collections without pre-defined word boundaries. Inverted indexes fail on unsegmented DNA data because there are no whitespace delimiters. Suffix array indexing allows arbitrary substring queries and exact prefix matching over billions of base pairs. Using LCP-accelerated binary search, researchers locate exact nucleotide occurrences in milliseconds, facilitating disease research, phylogenetic analysis, and genome alignment.`
  },
  {
    id: "doc-07",
    filename: "prefix_phrase_query_processing.txt",
    title: "Processing Prefix and Multi-Word Phrase Queries with Suffix Arrays",
    author: "Search Engine Optimization Team",
    category: "Information Retrieval",
    status: "INDEXED",
    dateIndexed: "2026-09-20",
    content: `Search systems must support diverse query modalities: substring queries, prefix queries, and multi-word phrase queries. A prefix query matches all words starting with a given string, which maps directly to a contiguous range in the suffix array where suffix positions coincide with word boundaries. Multi-word phrase search requires verifying that consecutive terms appear adjacent in the source text. By finding the suffix range for the first word and filtering by subsequent term offsets, the full-text search engine executes phrase queries efficiently without needing expensive secondary index tables.`
  },
  {
    id: "doc-08",
    filename: "text_preprocessing_tokenization.txt",
    title: "Text Preprocessing, Normalization and Sentinel Injection",
    author: "Corpus Processing Pipeline",
    category: "Preprocessing",
    status: "INDEXED",
    dateIndexed: "2026-09-20",
    content: `Before constructing a Suffix Array, documents undergo rigorous text preprocessing. This pipeline includes case folding, punctuation normalization, unicode canonicalization, and whitespace consolidation. In multi-document indexing, individual documents are concatenated into a unified text stream separated by unique sentinel characters (such as '$' or '#' that sort lexicographically smaller than standard characters). This sentinel boundary guarantees that suffix sorting remains well-defined and prevents substring matches from accidentally spilling across distinct document boundaries.`
  },
  {
    id: "doc-09",
    filename: "digital_libraries_corpus_indexing.txt",
    title: "Full-Text Search Engine Architectures for Digital Libraries",
    author: "Digital Archiving Society",
    category: "Digital Libraries",
    status: "INDEXED",
    dateIndexed: "2026-09-21",
    content: `Academic digital libraries archive vast repositories of technical manuscripts, historical records, and scanned literature. Researchers frequently seek exact citations, mathematical definitions, or rare substrings that traditional search indices miss. Implementing a full-text search engine on a Suffix-Array index empowers patrons to execute precise substring search queries with instantaneous feedback. The compact footprint of suffix arrays allows universities to host rich searchable collections on standard commodity servers without requiring distributed clusters.`
  },
  {
    id: "doc-10",
    filename: "algorithm_complexity_benchmarking.txt",
    title: "Complexity Proofs and Empirical Benchmarks for Suffix Indexing",
    author: "DSA-3 Performance Group",
    category: "Complexity",
    status: "INDEXED",
    dateIndexed: "2026-09-21",
    content: `Theoretical complexity bounds for the full-text search engine pipeline:
1. Suffix Array Construction: O(n log² n) via prefix doubling or O(n) via SA-IS.
2. LCP Array Construction: O(n) via Kasai's algorithm.
3. Substring Search: O(m + log n) via LCP-accelerated binary search.
4. Memory Consumption: 4n bytes for Suffix Array + 4n bytes for LCP Array = 8n bytes total.
Empirical tests demonstrate that suffix array queries achieve 3.8 ms average response time across 1.24 million indexed characters, providing an optimal balance between construction throughput and search performance.`
  },
  {
    id: "doc-11",
    filename: "project_report_dsa_team16.txt",
    title: "Full-Text Search Engine on Suffix-Array Index — Project Report",
    author: "Team 16 • Section 10",
    category: "Academic",
    status: "INDEXED",
    dateIndexed: "2026-09-21",
    content: `This academic project develops a complete full-text search engine prototype leveraging Suffix Array and LCP Array data structures for Data Structures and Algorithms - 3 (25CS2103E). The system demonstrates that advanced suffix structures offer superior capabilities for substring, prefix, and phrase search. By integrating Kasai's algorithm and LCP-accelerated binary search, our system provides students and researchers with an interactive platform for studying indexing algorithms and experiencing real-time search ranking.`
  },
  {
    id: "doc-12",
    filename: "text_analytics_nlp_applications.txt",
    title: "Text Analytics and Pattern Discovery with Suffix Indexes",
    author: "Data Analytics Institute",
    category: "Text Analytics",
    status: "INDEXED",
    dateIndexed: "2026-09-21",
    content: `Beyond simple keyword lookup, suffix arrays play an instrumental role in text analytics and natural language processing. Finding the longest repeated substring in a corpus reduces to finding the maximum value in the LCP array in O(n) time. Similarly, identifying common phrases, detecting plagiarism, and calculating n-gram frequencies are directly computable through range queries over the sorted suffix array. The combination of Suffix Array and LCP Array forms the foundational cornerstone of modern text analytics engines.`
  }
];
