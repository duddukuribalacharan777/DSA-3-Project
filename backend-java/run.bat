@echo off
setlocal enabledelayedexpansion

echo ====================================================================
echo  DSA-3 Academic Project: Full-Text Search Engine on Suffix Array
echo  Course: 25CS2103E ^| Team 16 ^| Section 10
echo ====================================================================

where javac >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] javac compiler not found in PATH. Please install Java JDK 21+.
    pause
    exit /b 1
)

if not exist "%~dp0bin" mkdir "%~dp0bin"

echo [*] Compiling Java backend sources...
javac -encoding UTF-8 -d "%~dp0bin" "%~dp0src\main\java\com\dsa3\model\*.java" "%~dp0src\main\java\com\dsa3\data\*.java" "%~dp0src\main\java\com\dsa3\algorithm\*.java" "%~dp0src\main\java\com\dsa3\service\*.java" "%~dp0src\main\java\com\dsa3\server\*.java"

if %errorlevel% neq 0 (
    echo [ERROR] Compilation failed.
    pause
    exit /b 1
)

echo [*] Compilation successful!
echo [*] Launching Java REST Server on http://localhost:8080/ ...
echo.

java -cp "%~dp0bin" com.dsa3.server.HttpServerApp 8080
