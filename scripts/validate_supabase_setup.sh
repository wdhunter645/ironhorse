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

# Check for environment configuration
echo ""
echo "🔍 Environment Configuration Check:"

# Check if GitHub CLI is available for secrets
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI available for repository secrets"
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI authenticated"
        echo "ℹ️  You can set repository secrets with: bash scripts/set_repo_secrets.sh"
    else
        echo "⚠️  GitHub CLI not authenticated - run: gh auth login"
    fi
else
    echo "⚠️  GitHub CLI not found - install for repository secrets management"
fi

# Check for local development environment (optional)
if [ -f ".env.local" ]; then
    echo "✅ Local environment file (.env.local) exists"
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local && grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ Local Supabase configuration found"
    else
        echo "⚠️  Incomplete Supabase configuration in .env.local"
    fi
else
    echo "ℹ️  No .env.local found (using GitHub secrets for production)"
fi

echo ""
echo "🎉 Supabase Cloud setup validation complete!"
echo ""
echo "Recommended next steps:"
echo "1. Set GitHub repository secrets: bash scripts/set_repo_secrets.sh"
echo "2. Apply database schema using Supabase dashboard SQL Editor (see DATABASE_SETUP.md)"
echo "3. Deploy to production: vercel --prod"
echo ""
echo "For local development (optional):"
echo "1. Copy env.sample to .env.local and fill in credentials"
echo "2. Start app: npm run dev"
echo ""
echo "📋 This project uses Supabase Cloud exclusively via GitHub repository secrets"