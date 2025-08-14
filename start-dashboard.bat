@echo off
echo ===============================================
echo 🚀 Starting PiwPiw Professional Dashboard
echo ===============================================
echo.

echo 1️⃣ Starting Backend Server (Port 3001)...
start "PiwPiw Backend API" cmd /k "node piwpiw-backend.js"

echo ⏳ Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo 2️⃣ Starting Frontend Server (Port 5173)...
start "PiwPiw Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo 📡 Backend API: http://localhost:3001
echo 🎮 Dashboard: http://localhost:5173
echo.
echo ⚡ Ready to test Discord login!
echo.
pause
