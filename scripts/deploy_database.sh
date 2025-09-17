#!/usr/bin/env bash
set -euo pipefail

# Deploy database schema to Supabase Cloud
# This script provides multiple deployment methods for maximum flexibility

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIGRATION_FILE="$ROOT_DIR/sql/supabase_cloud_migration.sql"
SEED_FILE="$ROOT_DIR/sql/supabase_cloud_seed.sql"

echo "=== Supabase Cloud Database Deployment ==="
echo ""

# Check if migration file exists
if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Migration file not found: $MIGRATION_FILE"
    exit 1
fi

# Load environment variables if .env.local exists
if [ -f "$ROOT_DIR/.env.local" ]; then
    echo "📋 Loading environment variables from .env.local..."
    set -a  # automatically export all variables
    source "$ROOT_DIR/.env.local"
    set +a
fi

# Method 1: Use DATABASE_URL with psql (preferred for CI/CD)
if [ -n "${DATABASE_URL:-}" ]; then
    echo "🚀 Method 1: Deploying using DATABASE_URL with psql..."
    
    if command -v psql >/dev/null 2>&1; then
        echo "   Applying schema..."
        psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$MIGRATION_FILE"
        
        if [ -f "$SEED_FILE" ]; then
            echo "   Applying seed data..."
            psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$SEED_FILE"
        fi
        
        echo "✅ Database deployment completed successfully!"
        exit 0
    else
        echo "⚠️  psql not available, trying alternative methods..."
    fi
fi

# Method 2: Use Supabase CLI (if available)
if command -v supabase >/dev/null 2>&1; then
    echo "🚀 Method 2: Deploying using Supabase CLI..."
    
    # Check if we're in a Supabase project
    if [ -f "$ROOT_DIR/supabase/config.toml" ]; then
        echo "   Linking to Supabase project..."
        supabase link --project-ref "${SUPABASE_PROJECT_REF:-lolfycmpjhbdyeyrwnbv}"
        
        echo "   Applying migration..."
        supabase db push
        
        echo "✅ Database deployment completed using Supabase CLI!"
        exit 0
    else
        echo "⚠️  Not a Supabase CLI project, trying alternative methods..."
    fi
fi

# Method 3: Use service role key with REST API (fallback)
if [ -n "${SUPABASE_SERVICE_ROLE_KEY:-}" ] && [ -n "${NEXT_PUBLIC_SUPABASE_URL:-}" ]; then
    echo "🚀 Method 3: Deploying using REST API with service role key..."
    
    # Use the validation script to apply schema
    node "$ROOT_DIR/scripts/setup_db_manual.js"
    
    echo "✅ Database deployment guidance provided!"
    exit 0
fi

# Method 4: Manual deployment instructions
echo "🚀 Method 4: Manual deployment required"
echo ""
echo "No automated deployment method available. Please follow these steps:"
echo ""
echo "1. Go to your Supabase dashboard:"
echo "   https://app.supabase.com"
echo ""
echo "2. Open your project:"
echo "   https://${SUPABASE_PROJECT_REF:-<your-project-ref>}.supabase.co"
echo ""
echo "3. Navigate to SQL Editor and execute the following files:"
echo "   - $MIGRATION_FILE"
echo "   - $SEED_FILE (optional)"
echo ""
echo "4. Or use the automated setup script:"
echo "   node scripts/setup_db_manual.js"
echo ""
echo "5. Validate deployment:"
echo "   node scripts/validate_database.js"
echo ""

exit 1