# Setup Instructions for ironhorse Phase-1

## Prerequisites

Before running the setup scripts, ensure you have:

1. **Node.js**: Version 18 or higher
2. **Supabase Account**: Create account at https://supabase.com (Cloud only)
3. **Vercel Account**: Create account at https://vercel.com
4. **B2 Storage Account**: Create account at Backblaze B2
5. **GitHub CLI**: Install and authenticate `gh` CLI tool
6. **Vercel CLI**: Install and authenticate `vercel` CLI tool

**Note**: This project uses **Supabase Cloud only**—no local Supabase CLI or Docker required.

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

## Supabase Cloud Setup

### 1. Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com) and create a new project
2. Copy your project credentials from the dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
   - `SUPABASE_SERVICE_ROLE_KEY`

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

**Production Setup (Recommended):**
Set GitHub repository secrets for all deployments:

```bash
bash scripts/set_repo_secrets.sh
```

**Local Development Setup (Optional):**
For local development only, copy the template and fill in credentials:

```bash
cp env.sample .env.local
# Edit .env.local with your Supabase Cloud and B2 credentials
```

### 4. Apply Database Schema

Apply the SQL migration files in `sql/` directly to your Supabase Cloud project using the Supabase SQL editor in your dashboard. See `DATABASE_SETUP.md` for detailed instructions.

### 5. Deploy or Start Development

**Production Deployment:**
```bash
vercel --prod
```

**Local Development (Optional):**
```bash
npm run dev
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