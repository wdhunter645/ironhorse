#!/usr/bin/env bash
set -euo pipefail

# Updated to copy GitHub repository secrets to Vercel environment variables
# This ensures both dev and prod websites run in the production environment
# and use the same secrets stored in GitHub repository

# Check for required CLI tools
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed or not in PATH"
    echo "   Install from: https://cli.github.com/"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed or not in PATH"
    echo "   Install with: npm install -g vercel"
    exit 1
fi

# Function to check and get repository secret
check_repo_secret() {
    local k=$1
    local v
    v=$(gh secret get "$k" 2>/dev/null || echo "")
    if [ -z "$v" ]; then
        echo "❌ Missing repository secret: $k"
        return 1
    else
        echo "✅ Found repository secret: $k"
        return 0
    fi
}

# Function to add repository secret to Vercel production environment
add() {
    local k=$1
    local v
    v=$(gh secret get "$k" 2>/dev/null || echo "")
    if [ -z "$v" ]; then
        echo "⚠️  Skipping $k (repository secret not found)"
        return 0
    fi
    echo "🔧 Setting $k in Vercel production environment..."
    if echo "$v" | vercel env add "$k" production >/dev/null 2>&1; then
        echo "✅ Successfully set $k"
    else
        echo "❌ Failed to set $k"
        return 1
    fi
}

# Check all required repository secrets first
echo "🔍 Checking repository secrets..."
MISSING_SECRETS=0

# Define all required variables
PUBLIC_VARS="NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_B2_ENDPOINT NEXT_PUBLIC_B2_BUCKET"
PRIVATE_VARS="SUPABASE_SERVICE_ROLE_KEY B2_KEY_ID B2_APP_KEY"

# Check public repository secrets
for k in $PUBLIC_VARS; do
    if ! check_repo_secret "$k"; then
        MISSING_SECRETS=1
    fi
done

# Check private repository secrets  
for k in $PRIVATE_VARS; do
    if ! check_repo_secret "$k"; then
        MISSING_SECRETS=1
    fi
done

if [ $MISSING_SECRETS -eq 1 ]; then
    echo ""
    echo "❌ Some repository secrets are missing. Please set them before running this script."
    echo "   You can set them using: gh secret set VARIABLE_NAME"
    echo "   Required secrets: $PUBLIC_VARS $PRIVATE_VARS"
    echo ""
    read -p "Do you want to continue anyway and skip missing secrets? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting. Please set the missing repository secrets and try again."
        exit 1
    fi
    echo "⚠️  Continuing with partial environment setup..."
else
    echo "✅ All repository secrets are present!"
fi

echo ""
echo "🚀 Copying repository secrets to Vercel production environment..."

# Set public secrets as Vercel environment variables for production
for k in $PUBLIC_VARS; do
    add "$k"
done

# Set private secrets as Vercel environment variables for production  
for k in $PRIVATE_VARS; do
    add "$k"
done

echo ""
echo "✅ Environment setup completed!"
echo "   Check Vercel dashboard to verify all variables were set correctly."
