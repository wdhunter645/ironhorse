# Setup Instructions for ironhorse Phase-1

## Prerequisites

Before running the setup scripts, ensure you have:

1. **Supabase Account**: Create account at https://supabase.com
2. **Vercel Account**: Create account at https://vercel.com
3. **B2 Storage Account**: Create account at Backblaze B2
4. **GitHub CLI**: Install and authenticate `gh` CLI tool
5. **Vercel CLI**: Install and authenticate `vercel` CLI tool
6. **Supabase CLI**: Install and authenticate `supabase` CLI tool

## Environment Variables Setup

Copy `.env.local` and fill in the required values:

```bash
cp .env.local .env.local.tmp
# Edit .env.local.tmp with your actual values
```

## Setup Script Execution Order

Follow the order specified in `scripts/README_PREREQS.md`:

1. **Setup Supabase Project**
   ```bash
   bash scripts/setup_supabase_project.sh
   ```

2. **Check Environment Variables**
   ```bash
   bash scripts/check_env.sh
   ```

3. **Set Repository Secrets** 
   ```bash
   bash scripts/set_repo_secrets.sh
   ```

4. **Set Vercel Environment Variables**
   ```bash
   bash scripts/set_vercel_env.sh
   ```

5. **Apply Database Schema**
   ```bash
   bash scripts/db_apply.sh
   ```

6. **Verify B2 Storage**
   ```bash
   bash scripts/verify_b2.sh
   ```

7. **Health Check (after deployment)**
   ```bash
   bash scripts/health_smoke.sh
   ```

## Deployment

Deploy to Vercel:
```bash
vercel --prod
```

## Security Notes

- Only `NEXT_PUBLIC_*` variables are exposed to the client
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only
- All sensitive keys are stored as GitHub secrets and Vercel environment variables