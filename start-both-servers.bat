@echo off
echo Starting PiwPiw Dashboard Servers...
echo.
echo Starting Backend Server (Port 3001)...
start "PiwPiw Backend" cmd /k "node piwpiw-backend.js"
timeout /t 3 /nobreak > nul
echo.
echo Starting Real Bot Integration Server (Port 3002)...
start "PiwPiw Real Bot Integration" cmd /k "node real-bot-integration.js"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server (Port 5173)...
start "PiwPiw Frontend" cmd /k "npm run dev"
echo.
echo All servers are starting!
echo Backend: http://localhost:3001
echo Real Bot Integration: http://localhost:3002
echo Frontend: http://localhost:5173
echo.
pause
