@echo off
echo 🚀 Starting PiwPiw Professional Analytics with Real Discord Bot Integration
echo.

echo 📊 Starting Discord Bot Integration Server...
start "Discord Bot Integration" cmd /k "node real-bot-integration.js"

echo ⏳ Waiting for bot integration server to start...
timeout /t 3 /nobreak >nul

echo 🌐 Starting Dashboard...
start "PiwPiw Dashboard" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting...
echo.
echo 📡 Discord Bot Integration: http://localhost:3002
echo 🎯 Dashboard: http://localhost:5173
echo.
echo 💡 Make sure to set your BOT_TOKEN environment variable for real bot data!
echo 📖 Check REAL_BOT_SETUP.md for setup instructions
echo.
pause