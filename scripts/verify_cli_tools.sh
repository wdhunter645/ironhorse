#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Verifying CLI Tools Installation..."
echo "======================================"

# Check GitHub CLI
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI: $(gh --version | head -1)"
else
    echo "❌ GitHub CLI: Not found"
    exit 1
fi

# Check Vercel CLI
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI: $(vercel --version)"
else
    echo "❌ Vercel CLI: Not found"
    exit 1
fi

# Check Supabase CLI
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI: $(supabase --version)"
else
    echo "❌ Supabase CLI: Not found"
    exit 1
fi

# Check PostgreSQL client
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL Client: $(psql --version)"
else
    echo "❌ PostgreSQL Client: Not found"
    exit 1
fi

echo ""
echo "🎉 All CLI tools are properly installed and available!"
echo "You can now run the setup scripts without CLI tool failures."