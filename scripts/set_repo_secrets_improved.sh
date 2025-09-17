#!/usr/bin/env bash
set -euo pipefail

# Script to set GitHub repository secrets for Lou Gehrig Fan Club
# 
# This script reads environment variables from .env.local and sets them 
# as GitHub repository secrets for use in CI/CD and production deployment.

echo "=== Setting GitHub Repository Secrets ==="
echo

# Load environment variables from .env.local
if [ -f ".env.local" ]; then
    echo "Loading environment variables from .env.local..."
    export $(grep -v '^#' .env.local | xargs)
else
    echo "❌ .env.local file not found"
    echo "Please create .env.local with your Supabase and B2 credentials"
    exit 1
fi

# Get repository name
REPO="${GITHUB_REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")}"

if [ -z "$REPO" ]; then
    echo "❌ Could not determine repository name"
    echo "Please set GITHUB_REPO environment variable or run from a git repository"
    exit 1
fi

echo "Repository: $REPO"
echo

# Define secrets to set (all variables that should be repository secrets)
declare -A SECRETS=(
    ["NEXT_PUBLIC_SUPABASE_URL"]="$NEXT_PUBLIC_SUPABASE_URL"
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]="$NEXT_PUBLIC_SUPABASE_ANON_KEY"
    ["SUPABASE_SERVICE_ROLE_KEY"]="$SUPABASE_SERVICE_ROLE_KEY"
    ["NEXT_PUBLIC_B2_ENDPOINT"]="$NEXT_PUBLIC_B2_ENDPOINT"
    ["NEXT_PUBLIC_B2_BUCKET"]="$NEXT_PUBLIC_B2_BUCKET"
    ["B2_KEY_ID"]="$B2_KEY_ID"
    ["B2_APP_KEY"]="$B2_APP_KEY"
)

# Set each secret
for secret_name in "${!SECRETS[@]}"; do
    secret_value="${SECRETS[$secret_name]}"
    
    if [ -n "$secret_value" ]; then
        echo "Setting secret: $secret_name"
        echo -n "$secret_value" | gh secret set "$secret_name" -R "$REPO" -b-
        echo "✅ $secret_name set successfully"
    else
        echo "⚠️  Skipping $secret_name (empty value)"
    fi
done

echo
echo "=== Repository Secrets Summary ==="
echo "The following secrets have been configured:"
echo

# List all set secrets
gh secret list -R "$REPO" | grep -E "(SUPABASE|B2)" || echo "No matching secrets found"

echo
echo "✅ Repository secrets setup complete!"
echo
echo "Next steps:"
echo "1. Verify secrets in GitHub repository settings"
echo "2. Deploy to production: vercel --prod"
echo "3. CI/CD workflows will now use these secrets automatically"