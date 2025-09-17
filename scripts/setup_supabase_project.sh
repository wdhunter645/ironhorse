#!/usr/bin/env bash
set -euo pipefail

# Supabase Cloud Project Setup Instructions
# This project uses Supabase Cloud only - no local CLI required

echo "=== Supabase Cloud Project Setup ==="
echo "This project uses Supabase Cloud exclusively."
echo "Follow these steps to set up your project:"
echo ""

echo "1. Create Supabase Cloud Project:"
echo "   • Go to https://app.supabase.com"
echo "   • Click 'New Project'"
echo "   • Choose organization and region (recommend us-east-1)"
echo "   • Set a strong database password"
echo "   • Create the project"
echo ""

echo "2. Get Your Project Credentials:"
echo "   • Go to Project Settings > API"
echo "   • Copy the Project URL and anon key"
echo "   • Copy the service_role key (for server-side operations)"
echo ""

echo "3. Set Up Repository Secrets (Recommended for Production):"
echo "   • Run: bash scripts/set_repo_secrets.sh"
echo "   • This configures GitHub secrets for automatic deployment"
echo ""

echo "4. Apply Database Schema:"
echo "   • Go to your Supabase Dashboard > SQL Editor"
echo "   • Copy and paste contents from sql/supabase_cloud_migration.sql"
echo "   • Run the SQL to create tables and policies"
echo "   • Optionally apply sql/supabase_cloud_seed.sql for sample data"
echo ""

echo "5. Local Development (Optional):"
echo "   • Copy env.sample to .env.local"
echo "   • Fill in your Supabase Cloud credentials"
echo "   • Run: npm run dev"
echo ""

echo "✅ No Supabase CLI installation or local instance required!"
echo "Everything runs on Supabase Cloud."
