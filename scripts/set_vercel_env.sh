#!/usr/bin/env bash
set -euo pipefail

# Updated to consolidate all deployments to production environment only
# This ensures both dev and prod websites run in the production environment

# Function to check and confirm environment variables before adding to Vercel
check_env_var() {
    local k=$1
    local v="${!k:-}"
    if [ -z "$v" ]; then
        echo "❌ Missing environment variable: $k"
        return 1
    else
        echo "✅ Found environment variable: $k"
        return 0
    fi
}

# Function to add environment variable to production environment only
add() {
    local k=$1
    local v="${!k:-}"
    if [ -z "$v" ]; then
        echo "⚠️  Skipping $k (not set)"
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

# Check all required environment variables first
echo "🔍 Checking required environment variables..."
MISSING_VARS=0

# Define all required variables
PUBLIC_VARS="NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_B2_ENDPOINT NEXT_PUBLIC_B2_BUCKET"
PRIVATE_VARS="SUPABASE_SERVICE_ROLE_KEY B2_KEY_ID B2_APP_KEY"

# Check public environment variables
for k in $PUBLIC_VARS; do
    if ! check_env_var $k; then
        MISSING_VARS=1
    fi
done

# Check private environment variables  
for k in $PRIVATE_VARS; do
    if ! check_env_var $k; then
        MISSING_VARS=1
    fi
done

if [ $MISSING_VARS -eq 1 ]; then
    echo ""
    echo "❌ Some environment variables are missing. Please set them before running this script."
    echo "   You can set them in your shell environment or in a .env file"
    echo "   Required variables: $PUBLIC_VARS $PRIVATE_VARS"
    echo ""
    read -p "Do you want to continue anyway and skip missing variables? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Exiting. Please set the missing environment variables and try again."
        exit 1
    fi
    echo "⚠️  Continuing with partial environment setup..."
else
    echo "✅ All environment variables are present!"
fi

echo ""
echo "🚀 Setting environment variables in Vercel production environment..."

# Set public environment variables for production
for k in $PUBLIC_VARS; do
    add $k
done

# Set private environment variables for production  
for k in $PRIVATE_VARS; do
    add $k
done

echo ""
echo "✅ Environment setup completed!"
echo "   Check Vercel dashboard to verify all variables were set correctly."
