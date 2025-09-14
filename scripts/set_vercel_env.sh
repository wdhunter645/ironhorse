#!/usr/bin/env bash
set -euo pipefail
add(){ k=$1; v="${!k:-}"; [ -z "$v" ] || for e in production preview development; do echo "$v" | vercel env add "$k" $e >/dev/null; done; }; for k in NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_B2_ENDPOINT NEXT_PUBLIC_B2_BUCKET; do add $k; done; for k in SUPABASE_SERVICE_ROLE_KEY B2_KEY_ID B2_APP_KEY; do add $k; done; echo done
