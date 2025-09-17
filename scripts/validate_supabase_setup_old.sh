#!/bin/bash
# Quick setup validation script for ironhorse project

echo "🔍 Validating ironhorse Supabase setup..."
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Check package.json has supabase dependency
if grep -q '"supabase"' package.json; then
    echo "✅ Supabase CLI dependency found in package.json"
else
    echo "❌ Supabase CLI dependency missing from package.json"
    exit 1
fi

# Check supabase directory exists
if [ -d "supabase" ]; then
    echo "✅ Supabase configuration directory exists"
else
    echo "❌ Supabase configuration directory missing"
    exit 1
fi

# Check config.toml exists
if [ -f "supabase/config.toml" ]; then
    echo "✅ Supabase config.toml found"
else
    echo "❌ Supabase config.toml missing"
    exit 1
fi

# Check migrations directory
if [ -d "supabase/migrations" ]; then
    migration_count=$(ls supabase/migrations/*.sql 2>/dev/null | wc -l)
    echo "✅ Migrations directory found ($migration_count migration files)"
else
    echo "❌ Migrations directory missing"
    exit 1
fi

# Check seed file
if [ -f "supabase/seed.sql" ]; then
    echo "✅ Seed file found"
else
    echo "❌ Seed file missing"
    exit 1
fi

# Check if CLI is working
if npx supabase --version > /dev/null 2>&1; then
    CLI_VERSION=$(npx supabase --version)
    echo "✅ Supabase CLI working (version: $CLI_VERSION)"
else
    echo "❌ Supabase CLI not working"
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
else
    echo "⚠️  Environment file (.env.local) missing - copy from env.sample"
fi

echo ""
echo "🎉 Supabase setup validation complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env.local file with actual values"
echo "2. Start local development: npm run supabase:start"
echo "3. Reset database: npm run supabase:reset"
echo "4. Start app: npm run dev"