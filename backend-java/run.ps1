# PowerShell Runner for Java Backend
# DSA-3 Course 25CS2103E - Team 16 - Section 10

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host " DSA-3 Academic Project: Full-Text Search Engine on Suffix Array" -ForegroundColor Cyan
Write-Host " Course: 25CS2103E | Team 16 | Section 10" -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$binDir = Join-Path $scriptDir "bin"

if (-not (Test-Path $binDir)) {
    New-Item -ItemType Directory -Path $binDir | Out-Null
}

Write-Host "[*] Compiling Java backend sources..." -ForegroundColor Yellow
$javaFiles = Get-ChildItem -Path (Join-Path $scriptDir "src\main\java") -Filter "*.java" -Recurse | ForEach-Object { $_.FullName }

& javac -encoding UTF-8 -d $binDir $javaFiles

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Java compilation failed." -ForegroundColor Red
    exit 1
}

Write-Host "[*] Compilation successful!" -ForegroundColor Green
Write-Host "[*] Starting Java REST Server on http://localhost:8080/ ..." -ForegroundColor Green
Write-Host ""

& java -cp $binDir com.dsa3.server.HttpServerApp 8080
