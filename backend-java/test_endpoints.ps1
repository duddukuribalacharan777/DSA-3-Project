# Test all Java backend endpoints
$baseUrl = "http://localhost:8080"

Write-Host "--- 1. Testing GET /api/health ---" -ForegroundColor Cyan
$health = Invoke-RestMethod -Uri "$baseUrl/api/health" -Method GET
Write-Host "Status: $($health.status) | Engine: $($health.engine) | Runtime: $($health.runtime) | Docs: $($health.documentsCount)" -ForegroundColor Green

Write-Host "--- 2. Testing GET /api/stats ---" -ForegroundColor Cyan
$stats = Invoke-RestMethod -Uri "$baseUrl/api/stats" -Method GET
Write-Host "Total Chars: $($stats.totalIndexedChars) | Footprint: $($stats.totalIndexFootprintBytes) bytes" -ForegroundColor Green

Write-Host "--- 3. Testing GET /api/documents ---" -ForegroundColor Cyan
$docs = Invoke-RestMethod -Uri "$baseUrl/api/documents" -Method GET
Write-Host "Loaded documents: $($docs.Length)" -ForegroundColor Green
Write-Host "First Doc Title: $($docs[0].title)" -ForegroundColor Yellow

Write-Host "--- 4. Testing POST /api/search ---" -ForegroundColor Cyan
$searchPayload = @{
    query = "suffix array"
    queryType = "SUBSTRING"
    caseSensitive = $false
    maxResults = 5
} | ConvertTo-Json

$searchResp = Invoke-RestMethod -Uri "$baseUrl/api/search" -Method POST -Body $searchPayload -ContentType "application/json"
Write-Host "Search Matches: $($searchResp.totalMatches) | Docs Matched: $($searchResp.totalDocsMatched) | Time: $($searchResp.queryTimeMs)ms" -ForegroundColor Green
Write-Host "Top Result Title: $($searchResp.results[0].documentTitle) (Score: $($searchResp.results[0].score))" -ForegroundColor Yellow

Write-Host "--- 5. Testing POST /api/index/suffix-array ---" -ForegroundColor Cyan
$saPayload = @{ text = "banana" } | ConvertTo-Json
$saResp = Invoke-RestMethod -Uri "$baseUrl/api/index/suffix-array" -Method POST -Body $saPayload -ContentType "application/json"
Write-Host "Suffix Array Length: $($saResp.length) | Construction Time: $($saResp.constructionTimeMs)ms" -ForegroundColor Green
foreach ($row in $saResp.suffixArray) {
    Write-Host "  Rank $($row.rank): Pos $($row.position) -> $($row.suffix)" -ForegroundColor Gray
}

Write-Host "--- 6. Testing POST /api/index/kasai-lcp ---" -ForegroundColor Cyan
$lcpResp = Invoke-RestMethod -Uri "$baseUrl/api/index/kasai-lcp" -Method POST -Body $saPayload -ContentType "application/json"
Write-Host "Kasai Steps: $($lcpResp.totalSteps) | Time: $($lcpResp.constructionTimeMs)ms" -ForegroundColor Green

Write-Host "--- 7. Testing POST /api/index/simulate-search ---" -ForegroundColor Cyan
$simPayload = @{ text = "banana"; query = "an" } | ConvertTo-Json
$simResp = Invoke-RestMethod -Uri "$baseUrl/api/index/simulate-search" -Method POST -Body $simPayload -ContentType "application/json"
Write-Host "Sim Match Range: [$($simResp.matchRange -join ', ')] | Matches: $($simResp.totalMatches) | Saved: $($simResp.comparisonsSaved)" -ForegroundColor Green

Write-Host "`nALL ENDPOINTS TESTED SUCCESSFULLY!" -ForegroundColor Green
