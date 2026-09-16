#!/usr/bin/env bash
set -euo pipefail

case "${1:-}" in
  probe)
    # Public core is required. No token, private-repository exception or skip.
    # Any HTTP/transport failure stops the job before the mandatory live fetch.
    status=$(curl --silent --show-error --output /dev/null --write-out '%{http_code}' \
      --connect-timeout 15 --max-time 60 \
      https://api.github.com/repos/gatekeeper-os/gatekeeper-os)
    case "$status" in
      200) echo 'Public core repository readable' ;;
      *) echo "Core readability probe failed: HTTP $status" >&2; exit 1 ;;
    esac
    ;;
  fetch)
    # Credential-free fetch. Any fetch or parity failure is fatal.
    export GIT_TERMINAL_PROMPT=0 GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
    git -c credential.helper= clone --depth 1 --filter=blob:none --sparse --branch main \
      https://github.com/gatekeeper-os/gatekeeper-os.git .core-skill
    git -C .core-skill sparse-checkout set .agents/skills/write-gatekeeper
    git -C .core-skill rev-parse HEAD
    python3 .github/check-core-skill.py
    echo 'Live core-main skill parity verified' >> "$GITHUB_STEP_SUMMARY"
    ;;
  *) echo 'Usage: live-core-sync.sh probe|fetch' >&2; exit 2 ;;
esac
