# IronHorse - Lou Gehrig Fan Club

A Next.js application for the Lou Gehrig Fan Club with Supabase backend, featuring a comprehensive collectibles showcase.

## 🏆 Features

- **Lou Gehrig Collectibles Website**: Complete showcase of baseball cards, autographs, equipment, photographs, programs, and most valuable items
- **Interactive Collection Pages**: Detailed cards with pricing, rarity, and historical significance
- **Investment Guides**: Market trends, collecting tips, and authentication information
- **Responsive Design**: Optimized for all devices with beautiful Tailwind CSS styling

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
4. **Store credentials as GitHub repository secrets** (recommended for all deployments).
5. **Optionally for local development**: Copy credentials to `.env.local` (see `env.sample` for the template).

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
   
   **Option 1: Using Migration Display Tool (Recommended):**
   ```bash
   npm run db:migrations
   # Copy the displayed SQL and run it in Supabase SQL Editor
   ```
   
   **Option 2: Manual Setup:**
   Follow the instructions in `DATABASE_SETUP.md` to create the required tables in your Supabase project.

4. **Configure environment variables:**
   
   **For Production (Recommended):**
   Store credentials as GitHub repository secrets:
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

The database schema is managed through migration files in `supabase/migrations/`. Two main approaches:

**Option 1: Migration Display Tool (Recommended)**
```bash
npm run db:migrations    # Display migration SQL for manual application
npm run db:validate      # Validate schema after application
```

**Option 2: Direct SQL Files (Legacy)**
- The database schema is available in `sql/supabase_cloud_migration.sql`
- Apply it directly to your Supabase Cloud project using the Supabase SQL editor
- See `DATABASE_SETUP.md` for step-by-step instructions
- Sample data is available in `sql/supabase_cloud_seed.sql`

**Migration Files:**
- `supabase/migrations/20250101000000_initial_schema.sql` - Core database tables and policies
- `supabase/migrations/20250101000001_seed_data.sql` - Sample data for testing

### Available Scripts

**Development:**
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

**Database Management:**
- `npm run db:migrations` — Display migration SQL for manual application
- `npm run db:validate` — Validate database schema and connectivity
- `npm run db:setup` — Deploy and validate database (legacy)
- `npm run db:deploy` — Deploy database schema (legacy)

### Environment Variables

**GitHub Repository Secrets (Recommended):**
All production deployments should use GitHub repository secrets. See `scripts/set_repo_secrets.sh` for automated setup.

**Local Development (.env.local):**
For local development only, see `env.sample` for required variables template.

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