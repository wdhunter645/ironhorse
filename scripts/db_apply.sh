#!/usr/bin/env bash
set -euo pipefail

# Apply database schema and policies to Supabase Cloud
# Note: This script expects DATABASE_URL to point to your Supabase Cloud database

: "${DATABASE_URL:?DATABASE_URL environment variable is required (should be your Supabase Cloud database URL)}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Applying database schema to Supabase Cloud..."

# Apply the consolidated migration file
if [ -f "$ROOT_DIR/sql/supabase_cloud_migration.sql" ]; then
    echo "Applying schema and RLS policies..."
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/sql/supabase_cloud_migration.sql"
else
    echo "Fallback: Applying individual SQL files..."
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/sql/supabase_bootstrap.sql"
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/sql/supabase_policies.sql"
fi

# Optionally apply seed data
if [ -f "$ROOT_DIR/sql/supabase_cloud_seed.sql" ]; then
    echo "Applying seed data..."
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/sql/supabase_cloud_seed.sql"
fi

echo "Database schema applied successfully to Supabase Cloud!"
