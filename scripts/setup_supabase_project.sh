#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_ACCESS_TOKEN:?}"; : "${SUPABASE_ORG_SLUG:?}"; : "${SUPABASE_DB_PASSWORD:?}"; PROJECT_NAME="${SUPABASE_PROJECT_NAME:-ironhorse}"; REGION="${SUPABASE_DB_REGION:-us-east-1}"; PLAN="${SUPABASE_PLAN:-free}"; supabase login --token "$SUPABASE_ACCESS_TOKEN"; supabase projects create "$PROJECT_NAME" --org "$SUPABASE_ORG_SLUG" --region "$REGION" --db-password "$SUPABASE_DB_PASSWORD" --plan "$PLAN"; supabase projects list; echo 'Use: supabase projects get --ref <REF>'
