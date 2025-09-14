#!/usr/bin/env bash
set -euo pipefail
: "${DATABASE_URL:?}"; ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/sql/supabase_bootstrap.sql"; psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/sql/supabase_policies.sql"; echo Done
