#!/usr/bin/env bash
set -euo pipefail
OK=1; need(){ n=$1; [ -z "${!n:-}" ] && { echo "❌ $n"; OK=0; } || echo "✅ $n"; }; need NEXT_PUBLIC_SUPABASE_URL; need NEXT_PUBLIC_SUPABASE_ANON_KEY; need SUPABASE_SERVICE_ROLE_KEY; need NEXT_PUBLIC_B2_ENDPOINT; need NEXT_PUBLIC_B2_BUCKET; need B2_KEY_ID; need B2_APP_KEY; [ $OK -eq 1 ] || exit 1; echo OK
