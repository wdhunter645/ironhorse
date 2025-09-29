#!/usr/bin/env bash
set -euo pipefail

# Ironhorse Environment Variable Checker
# Validates all required Vercel environment variables for the Lou Gehrig Fan Club application

echo "🔍 Checking Ironhorse environment variables..."
echo "============================================="

OK=1

# Function to check environment variable with descriptive error message
check_env_var() {
    local var_name="$1"
    local description="$2"
    local category="$3"
    
    if [ -z "${!var_name:-}" ]; then
        echo "❌ $var_name"
        echo "   Purpose: $description"
        echo "   Category: $category"
        echo ""
        OK=0
    else
        echo "✅ $var_name"
    fi
}

echo ""
echo "📊 Supabase Configuration:"
echo "-------------------------"
check_env_var "NEXT_PUBLIC_SUPABASE_URL" "Public Supabase project URL for client-side connections" "Supabase (Public)"
check_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "Public anonymous key for client authentication" "Supabase (Public)"
check_env_var "SUPABASE_SERVICE_ROLE_KEY" "Server-side service role key for admin operations" "Supabase (Private)"

echo ""
echo "☁️  Backblaze B2 Storage Configuration:"
echo "--------------------------------------"
check_env_var "B2_KEY_ID" "B2 application key ID for S3-compatible API access" "B2 Storage (Private)"
check_env_var "B2_APP_KEY" "B2 application key secret for authentication" "B2 Storage (Private)"
check_env_var "B2_BUCKET" "B2 bucket name for file storage (private config)" "B2 Storage (Private)"
check_env_var "B2_ENDPOINT" "B2 S3-compatible API endpoint URL" "B2 Storage (Private)"
check_env_var "NEXT_PUBLIC_B2_BUCKET" "Public B2 bucket name for client-side references" "B2 Storage (Public)"
check_env_var "NEXT_PUBLIC_B2_ENDPOINT" "Public B2 endpoint for client-side uploads" "B2 Storage (Public)"
check_env_var "PUBLIC_B2_BASE_URL" "Base URL for serving uploaded files publicly" "B2 Storage (Public)"

echo ""
echo "⚙️  Application Configuration:"
echo "-----------------------------"
check_env_var "ADMIN_EMAILS" "Comma-separated list of admin email addresses" "Admin Access"
check_env_var "NEXT_PUBLIC_SITE_URL" "Production site URL for sitemap and external links" "Site Configuration"

echo ""
if [ $OK -eq 1 ]; then
    echo "🎉 All environment variables are properly configured!"
    echo ""
    echo "✅ Your Ironhorse application is ready for deployment."
else
    echo "❌ Missing environment variables detected!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Set missing variables in your Vercel project dashboard"
    echo "2. For local development, add them to .env.local"
    echo "3. Use 'bash scripts/set_vercel_env.sh' to sync from local environment"
    echo "4. Refer to README.md for detailed configuration instructions"
    echo ""
    echo "🔗 Helpful Resources:"
    echo "• Supabase Dashboard: https://supabase.com/dashboard"
    echo "• Backblaze B2 Console: https://secure.backblaze.com/b2_buckets.htm"
    echo "• Vercel Environment Variables: https://vercel.com/docs/concepts/environment-variables"
    echo ""
    exit 1
fi

echo "Environment check completed successfully! 🚀"
