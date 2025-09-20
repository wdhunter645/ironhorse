#!/usr/bin/env bash
set -euo pipefail
: "${BASE_URL:?}"; for p in / /sitemap /privacy /terms /api/quotes/weekly; do c=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$p"); echo "$c $BASE_URL$p"; [ "$c" -lt 400 ] || exit 1; done; echo OK
