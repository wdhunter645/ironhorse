#!/usr/bin/env bash
set -euo pipefail
: "${NEXT_PUBLIC_B2_ENDPOINT:?}"; : "${NEXT_PUBLIC_B2_BUCKET:?}"; curl -s -I "$NEXT_PUBLIC_B2_ENDPOINT" || true; echo Try: curl -I "$NEXT_PUBLIC_B2_ENDPOINT/<object>"
