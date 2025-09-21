#!/usr/bin/env bash
set -euo pipefail

# Updated to consolidate all deployments to production environment only
# This ensures both dev and prod websites run in the production environment

# Function to add environment variable to production environment only
add() {
    local k=$1
    local v="${!k:-}"
    [ -z "$v" ] || echo "$v" | vercel env add "$k" production >/dev/null
}

# Set public environment variables for production
for k in NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_B2_ENDPOINT NEXT_PUBLIC_B2_BUCKET NEXT_PUBLIC_SENTRY_DSN; do
    add $k
done

# Set private environment variables for production  
for k in SUPABASE_SERVICE_ROLE_KEY B2_KEY_ID B2_APP_KEY SENTRY_DSN SENTRY_ORG SENTRY_PROJECT SENTRY_AUTH_TOKEN; do
    add $k
done

echo "done"
