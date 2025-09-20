#!/usr/bin/env bash
# 
# Supabase Cloud Project Setup (No CLI Required)
#
# This script provides instructions for manually creating a Supabase Cloud project.
# The project uses Supabase Cloud exclusively with GitHub repository secrets.

set -euo pipefail

echo "=== Supabase Cloud Project Setup Instructions ==="
echo ""
echo "This project uses Supabase Cloud exclusively. No CLI installation required."
echo ""
echo "To set up your Supabase Cloud project:"
echo ""
echo "1. Go to https://app.supabase.com"
echo "2. Create a new project with these details:"
echo "   - Project Name: ${SUPABASE_PROJECT_NAME:-ironhorse}"
echo "   - Organization: Your organization"
echo "   - Region: ${SUPABASE_DB_REGION:-us-east-1}"
echo "   - Database Password: Create a secure password"
echo ""
echo "3. After project creation, get your credentials from Settings > API:"
echo "   - Project URL (NEXT_PUBLIC_SUPABASE_URL)"
echo "   - Anon Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)"
echo "   - Service Role Key (SUPABASE_SERVICE_ROLE_KEY)"
echo ""
echo "4. Set these as GitHub repository secrets using:"
echo "   bash scripts/set_repo_secrets.sh"
echo ""
echo "5. Apply database schema using the Supabase SQL Editor:"
echo "   - Copy content from sql/supabase_cloud_migration.sql"
echo "   - Paste and run in your Supabase dashboard SQL Editor"
echo ""
echo "For detailed setup instructions, see DATABASE_SETUP.md"
