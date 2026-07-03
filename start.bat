@echo off
set PORT=8080
echo Nightfall Academy Ultra 5 baslatiliyor...
echo Tarayici adresi: http://localhost:%PORT%
start "" http://localhost:%PORT%/index.html
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server %PORT%
) else (
  python -m http.server %PORT%
)
