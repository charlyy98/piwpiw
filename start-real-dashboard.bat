@echo off
echo ===============================================
echo 🤖 Starting PiwPiw REAL Data Dashboard
echo ===============================================
echo.

echo 🔧 This will start 3 servers for REAL bot data:
echo    1. Real Bot Integration (Port 3002)
echo    2. Main Backend API (Port 3001) 
echo    3. Frontend Dashboard (Port 5173)
echo.

echo ⚠️  IMPORTANT: Set your bot token first!
echo    set BOT_TOKEN=your_bot_token_here
echo.
pause

echo 1️⃣ Starting Real Bot Integration Server...
start "PiwPiw Real Bot Integration" cmd /k "node real-bot-integration.js"

echo ⏳ Waiting 5 seconds for bot to connect...
timeout /t 5 /nobreak > nul

echo 2️⃣ Starting Main Backend Server...  
start "PiwPiw Backend API" cmd /k "node piwpiw-backend.js"

echo ⏳ Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo 3️⃣ Starting Frontend Dashboard...
start "PiwPiw Frontend" cmd /k "npm run dev"

echo.
echo ✅ All servers are starting with REAL bot data!
echo.
echo 🌐 URLs:
echo    🤖 Bot Integration: http://localhost:3002
echo    📡 Backend API: http://localhost:3001  
echo    🎮 Dashboard: http://localhost:5173
echo.
echo 🎯 Look for "✅ Using REAL data" messages in consoles!
echo.
pause
