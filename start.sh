#!/usr/bin/env bash
# Start Lovalova locally: free the dev ports, run the checks, then keep the dev server running.
#
#   ./start.sh              free ports → typecheck, lint, unit tests → start server → e2e tests → keep serving
#   ./start.sh --skip-e2e   same, without the browser tests
#   ./start.sh --no-tests   just free the ports and start the server
#
# Stop the server with Ctrl+C.
set -euo pipefail

cd "$(dirname "$0")"

PORT=3000
URL="http://localhost:$PORT"
PORTS_TO_FREE=(3000 3001) # Next moves to 3001 when 3000 is taken, so clear both
RUN_TESTS=1
RUN_E2E=1

for arg in "$@"; do
  case "$arg" in
    --no-tests) RUN_TESTS=0; RUN_E2E=0 ;;
    --skip-e2e) RUN_E2E=0 ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) echo "Unknown option: $arg (try --help)"; exit 2 ;;
  esac
done

step() { printf '\n\033[1;35m▸ %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✗ %s\033[0m\n' "$*"; exit 1; }

free_port() {
  local port=$1 pids
  pids=$(lsof -ti "tcp:$port" -sTCP:LISTEN 2>/dev/null || true)
  [ -z "$pids" ] && return 0
  echo "  port $port in use by PID(s) $(echo $pids) — stopping"
  kill $pids 2>/dev/null || true
  for _ in {1..20}; do
    sleep 0.25
    lsof -ti "tcp:$port" -sTCP:LISTEN >/dev/null 2>&1 || return 0
  done
  kill -9 $(lsof -ti "tcp:$port" -sTCP:LISTEN 2>/dev/null) 2>/dev/null || true
}

# Stop only the server this script started (and its child processes), never another copy's.
kill_tree() {
  local pid=$1 child
  for child in $(pgrep -P "$pid" 2>/dev/null); do kill_tree "$child"; done
  kill "$pid" 2>/dev/null || true
}
SERVER_PID=""
stop_server() {
  [ -n "$SERVER_PID" ] || return 0
  kill_tree "$SERVER_PID"
  wait "$SERVER_PID" 2>/dev/null || true
  SERVER_PID=""
}
trap stop_server EXIT
trap 'exit 130' INT TERM

# ── 1. Free ports ────────────────────────────────────────────────
step "Freeing ports ${PORTS_TO_FREE[*]}"
for p in "${PORTS_TO_FREE[@]}"; do free_port "$p"; done
rm -f .next/dev/lock 2>/dev/null || true # stale lock from a killed `next dev`
echo "  done"

[ -d node_modules ] || { step "Installing dependencies"; npm install; }

# ── 2. Fast checks (no server needed) ────────────────────────────
if [ "$RUN_TESTS" = 1 ]; then
  step "Type check";  npm run --silent typecheck || fail "Type check failed"
  step "Lint";        npm run --silent lint      || fail "Lint failed"
  step "Unit tests";  npm test                   || fail "Unit tests failed"
fi

# ── 3. Start the dev server ──────────────────────────────────────
step "Starting dev server on $URL"
npx next dev -p "$PORT" &
SERVER_PID=$!

for i in $(seq 1 120); do
  curl -sf -o /dev/null "$URL" && break
  kill -0 "$SERVER_PID" 2>/dev/null || fail "Dev server exited during startup"
  [ "$i" = 120 ] && fail "Dev server did not respond within 120s"
  sleep 1
done
echo "  server is up"

# ── 4. Browser tests against the running server ──────────────────
if [ "$RUN_E2E" = 1 ]; then
  if [ ! -d "$HOME/Library/Caches/ms-playwright" ] && [ ! -d "$HOME/.cache/ms-playwright" ]; then
    step "Installing Playwright Chromium"; npx playwright install chromium
  fi
  step "End-to-end tests (desktop + phone)"
  npx playwright test --reporter=line || fail "End-to-end tests failed — server stopped"
fi

# ── 5. Keep serving ──────────────────────────────────────────────
printf '\n\033[1;32m✓ All set — Lovalova is running at %s  (Ctrl+C to stop)\033[0m\n' "$URL"
wait "$SERVER_PID"
