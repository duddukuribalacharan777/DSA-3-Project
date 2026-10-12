# Java REST Backend: Full-Text Search Engine on Suffix-Array Index

**Course:** Data Structures & Algorithms - 3 (`25CS2103E`)  
**Academic Year:** 2026–2027  
**Team:** Team 16 • Section 10  
**Target Runtime:** Java 21+ (Java 25 LTS tested)

---

## 1. Overview

This backend implements a full-text search engine based on advanced suffix structures:
- **Suffix Array (SA)**: Lexicographically sorted suffixes, storing starting indices with $O(n \log^2 n)$ construction.
- **Kasai's Algorithm**: Linear-time $O(n)$ construction of the Longest Common Prefix (LCP) array.
- **LCP-Accelerated Binary Search**: Pattern lookup skipping redundant character evaluations, reducing search complexity from $O(m \log n)$ to $O(m + \log n)$.
- **Relevance Ranking Engine**: Term frequency (TF) scoring normalized against document length, title boosts, and position weighting.
- **Zero External Dependencies**: Uses built-in standard Java SE (`com.sun.net.httpserver.HttpServer` with Virtual Threads on port 8080) for instant compilation and execution without Maven or Gradle requirements.

---

## 2. Quick Start

### Windows Command Prompt (cmd)
```cmd
cd backend-java
run.bat
```

### Windows PowerShell
```powershell
cd backend-java
.\run.ps1
```

### Manual Compilation
```cmd
mkdir bin
javac -encoding UTF-8 -d bin src/main/java/com/dsa3/model/*.java src/main/java/com/dsa3/data/*.java src/main/java/com/dsa3/algorithm/*.java src/main/java/com/dsa3/service/*.java src/main/java/com/dsa3/server/*.java
java -cp bin com.dsa3.server.HttpServerApp 8080
```

---

## 3. REST API Endpoints (`http://localhost:8080`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status, document count, and runtime info |
| `GET` | `/api/stats` | Asymptotic complexity metrics and memory footprint |
| `GET` | `/api/documents` | Retrieve all indexed documents |
| `GET` | `/api/documents/{id}` | Retrieve specific document |
| `POST` | `/api/documents` | Add a new document and index it |
| `DELETE` | `/api/documents/{id}` | Remove document from index |
| `POST` | `/api/documents/reset` | Reset corpus to 12 academic seed documents |
| `POST` | `/api/documents/reindex` | Reconstruct suffix array & LCP structures |
| `POST` | `/api/search` | Search corpus (`SUBSTRING`, `PREFIX`, or `PHRASE`) |
| `POST` | `/api/index/suffix-array` | Generate Suffix Array for string payload |
| `POST` | `/api/index/kasai-lcp` | Compute Kasai's LCP Array with step-by-step trace |
| `POST` | `/api/index/simulate-search` | Step-by-step LCP binary search simulation |
