# Secret Scanning Configuration
# GitHub Advanced Security will automatically scan for common secrets
# This file can be used to add custom patterns or configure secret scanning behavior

# Secret scanning is automatically enabled for:
# - API keys (AWS, Google, Azure, etc.)
# - Database connection strings
# - Private keys and certificates
# - OAuth tokens
# - Webhook secrets
# - And many more common secret patterns

# Additional patterns can be added by GitHub administrators in the repository settings
# For this Next.js project, we're particularly interested in:
# - Supabase keys (SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY)
# - Vercel tokens (VERCEL_TOKEN)
# - B2 storage keys (B2_APP_KEY, B2_KEY_ID)
# - Database URLs and connection strings

# These are already covered by GitHub's default secret scanning patterns
# No custom configuration is required for this repository

# To add custom patterns, repository administrators can:
# 1. Go to repository Settings > Security & analysis
# 2. Configure secret scanning
# 3. Add custom patterns as needed

# Note: This file serves as documentation only
# Actual secret scanning configuration is done through the GitHub interface