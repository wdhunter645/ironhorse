# IronHorse - Lou Gehrig Fan Club

A Next.js application for the Lou Gehrig Fan Club with Supabase backend.

## Quick Start (Supabase Cloud Only)

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- A Supabase Cloud account and project

### Supabase Cloud Setup

This project uses **Supabase Cloud**—no local Supabase CLI or Docker required.

1. **Create a Supabase project** at [app.supabase.com](https://app.supabase.com).
2. **Apply the database schema** using the Supabase SQL Editor (see `DATABASE_SETUP.md` for detailed instructions).
3. **Copy your project credentials** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) from your Supabase dashboard.
4. **For production deployment**: Add all required environment variables to your repository secrets for CI/CD.
5. **For local development**: Copy credentials to `.env.local` (see `env.sample` for the template).

### Installing & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ironhorse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database schema:**
   Follow the instructions in `DATABASE_SETUP.md` to create the required tables in your Supabase project.

4. **Configure environment variables:**
   
   **For Production (Recommended):**
   ```bash
   bash scripts/set_repo_secrets.sh
   ```
   
   **For Local Development (Optional):**
   ```bash
   cp env.sample .env.local
   # Fill in your Supabase Cloud credentials
   ```

5. **Run the app:**
   ```bash
   npm run dev
   ```
   - Open your development server URL in your browser
   - Test connectivity at `/test-supabase` endpoint

### Database Schema & Migrations

- The database schema is defined in `sql/supabase_cloud_migration.sql`
- Apply it directly to your Supabase Cloud project using the Supabase SQL editor
- See `DATABASE_SETUP.md` for step-by-step instructions
- Sample data is available in `sql/supabase_cloud_seed.sql`

### Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

### Environment Variables

See `env.sample` for all required variables.

### Production Deployment (GitHub Secrets)

For production deployment, environment variables should be stored as GitHub repository secrets, not in `.env.local`:

1. **Set up GitHub repository secrets** (required for CI/CD):
   ```bash
   # Required Supabase credentials
   gh secret set NEXT_PUBLIC_SUPABASE_URL -b "https://your-project.supabase.co"
   gh secret set NEXT_PUBLIC_SUPABASE_ANON_KEY -b "your-anon-key"
   gh secret set SUPABASE_SERVICE_ROLE_KEY -b "your-service-role-key"
   
   # Required B2 Storage credentials
   gh secret set NEXT_PUBLIC_B2_ENDPOINT -b "s3.us-east-005.backblazeb2.com"
   gh secret set NEXT_PUBLIC_B2_BUCKET -b "your-bucket-id"
   gh secret set B2_KEY_ID -b "your-key-id"
   gh secret set B2_APP_KEY -b "your-app-key"
   ```

2. **Deploy to Vercel** (or your preferred platform):
   ```bash
   vercel --prod
   ```

The application will automatically use GitHub secrets for environment variables in production deployments.

### Bootstrap Scripts

For automated setup, use the provided scripts in `scripts/`:

- `scripts/setup_db_manual.js` - Validate and guide database setup
- `scripts/check_env.sh` - Verify environment variables
- `scripts/set_repo_secrets.sh` - Set GitHub repository secrets
- `scripts/health_smoke.sh` - Test deployed application

Run setup verification:
```bash
make env-check
make validate-supabase
```

---

**Note:**  
Local Supabase/Docker/CLI setup is NOT supported or required. All development and deployment targets Supabase Cloud using your repository secrets.