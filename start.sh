#!/usr/bin/env sh
PORT="${PORT:-8080}"
echo "Nightfall Academy Ultra 5: http://localhost:$PORT/index.html"
python3 -m http.server "$PORT"
