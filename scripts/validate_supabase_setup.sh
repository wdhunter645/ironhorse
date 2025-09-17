#!/bin/bash
# Quick setup validation script for ironhorse project (Supabase Cloud only)

echo "🔍 Validating ironhorse Supabase Cloud setup..."
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Check package.json has supabase dependency
if grep -q '"@supabase/supabase-js"' package.json; then
    echo "✅ Supabase JS client found in package.json"
else
    echo "❌ Supabase JS client missing from package.json"
    exit 1
fi

# Check SQL directory exists with Cloud migration files
if [ -d "sql" ]; then
    echo "✅ SQL directory exists"
    if [ -f "sql/supabase_cloud_migration.sql" ]; then
        echo "✅ Cloud migration file found"
    elif [ -f "sql/supabase_bootstrap.sql" ]; then
        echo "✅ Bootstrap SQL file found"
    else
        echo "⚠️  No SQL migration files found in sql/ directory"
    fi
else
    echo "❌ SQL directory missing"
    exit 1
fi

# Check environment file
if [ -f ".env.local" ]; then
    echo "✅ Environment file (.env.local) exists"
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ Supabase URL configuration found"
    else
        echo "⚠️  Supabase URL not configured in .env.local"
    fi
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ Supabase anon key configuration found"
    else
        echo "⚠️  Supabase anon key not configured in .env.local"
    fi
else
    echo "⚠️  Environment file (.env.local) missing - copy from env.sample"
fi

echo ""
echo "🎉 Supabase Cloud setup validation complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env.local file with Supabase Cloud credentials"
echo "2. Apply database schema: bash scripts/db_apply.sh (with DATABASE_URL set)"
echo "3. Start app: npm run dev"
echo ""
echo "Note: This project uses Supabase Cloud only - no local CLI required"