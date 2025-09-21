#!/usr/bin/env bash
set -euo pipefail
REPO="${GITHUB_REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"; for k in SUPABASE_SERVICE_ROLE_KEY B2_KEY_ID B2_APP_KEY SENTRY_DSN SENTRY_ORG SENTRY_PROJECT SENTRY_AUTH_TOKEN; do v="${!k:-}"; [ -n "$v" ] && echo -n "$v" | gh secret set "$k" -R "$REPO" -b- || echo "skip $k"; done; echo done
