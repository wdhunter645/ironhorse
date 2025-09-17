# Setup Instructions for ironhorse Phase-1

## Prerequisites

Before running the setup scripts, ensure you have:

1. **Node.js**: Version 18 or higher
2. **Docker**: For local Supabase development stack
3. **Supabase Account**: Create account at https://supabase.com
4. **Vercel Account**: Create account at https://vercel.com
5. **B2 Storage Account**: Create account at Backblaze B2
6. **GitHub CLI**: Install and authenticate `gh` CLI tool
7. **Vercel CLI**: Install and authenticate `vercel` CLI tool

**Note**: Supabase CLI is now included as a dev dependency in the project and doesn't need separate installation.

### Installing CLI Tools

If you're missing any CLI tools, run the installation script:

```bash
bash scripts/install_missing_tools.sh
```

To verify all CLI tools are properly installed:

```bash
bash scripts/verify_cli_tools.sh
# OR
make verify-cli
```

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables Setup

Copy the environment template and fill in the required values:

```bash
cp env.sample .env.local
# Edit .env.local with your actual values
```

### 3. Start Local Supabase Stack

```bash
npm run supabase:start
# OR
npx supabase start
```

This will start the local Supabase services:
- API: http://127.0.0.1:54321
- Studio: http://127.0.0.1:54323
- Database: postgresql://postgres:postgres@127.0.0.1:54322/postgres

### 4. Apply Database Schema

```bash
npm run supabase:reset
# OR
npx supabase db reset
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Check Local Status

```bash
npm run supabase:status
# OR
npx supabase status
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