@echo off
echo Starting QuickCommerce Frontend...

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

echo Starting React development server...
call npm start

pause
