# Complete Setup Guide - Lou Gehrig Fan Club

This guide provides step-by-step instructions for setting up the Lou Gehrig Fan Club application with Supabase Cloud.

## ✨ Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd ironhorse
npm install

# 2. Validate current setup
npm run bootstrap

# 3. Follow the guided setup instructions
```

## 🗄️ Database Setup (Required)

The application requires database tables to be created in your Supabase Cloud instance.

### Method 1: Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Open your project: `lolfycmpjhbdyeyrwnbv.supabase.co`

2. **Create Tables**
   - Navigate to **SQL Editor**
   - Copy the SQL from `sql/supabase_cloud_migration.sql`
   - Click **Run**

3. **Add Sample Data**
   - Copy the SQL from `sql/supabase_cloud_seed.sql`  
   - Click **Run**

4. **Verify Setup**
   - Go to **Table Editor**
   - Confirm `quotes` and `media_assets` tables exist with data

### Method 2: Command Line (Requires Service Role Key)

```bash
# Set your service role key in .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your_service_key" >> .env.local

# Run automated setup
node scripts/setup_db_manual.js
```

## 🔐 Environment Configuration

### Local Development

```bash
# Copy template and fill in credentials
cp env.sample .env.local

# Edit .env.local with your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=https://lolfycmpjhbdyeyrwnbv.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Production (GitHub Secrets)

```bash
# Set all environment variables as GitHub repository secrets
./scripts/set_repo_secrets_improved.sh

# Or manually via GitHub web interface:
# Settings > Secrets and variables > Actions > New repository secret
```

**Required secrets:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_B2_ENDPOINT`
- `NEXT_PUBLIC_B2_BUCKET`
- `B2_KEY_ID`
- `B2_APP_KEY`
- `VERCEL_TOKEN` (for deployment)

## 🚀 Running the Application

```bash
# Development server
npm run dev

# Production build
npm run build
npm run start

# Validate setup
npm run bootstrap
```

## 🧪 Testing & Validation

### Local Testing

```bash
# 1. Start development server
npm run dev

# 2. Test pages in your browser
# Visit your development server URL (typically shown in terminal)
# Navigate to /test-supabase endpoint

# 3. Test API
# Use your development server URL for the API test
curl your-dev-server-url/api/quotes/weekly
```

### Production Validation

```bash
# Run complete validation suite
./scripts/validate_production.sh
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms

The application works with any platform that supports:
- Node.js 18+
- Environment variables
- Static file serving

## 🔧 Troubleshooting

### Common Issues

**"Connection Error" on test page**
- ✅ Expected behavior if database schema isn't applied yet
- 🔧 Follow database setup instructions above

**"Permission denied" errors**
- ✅ Check your service role key is correct
- 🔧 Verify RLS policies are applied

**Build fails with fetch errors**
- ✅ Expected during build time - application handles this gracefully
- 🔧 The build will succeed and use fallback data

**Environment variables not loading**
- ✅ Verify `.env.local` exists and has correct format
- 🔧 No spaces around `=` signs
- 🔧 No quotes around values

### Validation Commands

```bash
# Check environment variables
npm run bootstrap

# Test production build
npm run build

# Validate all systems
./scripts/validate_production.sh
```

## 📁 Project Structure

```
ironhorse/
├── app/                    # Next.js app router pages
├── lib/                    # Shared utilities (Supabase client)
├── sql/                    # Database schema and seed files
├── scripts/                # Setup and validation scripts
├── .github/workflows/      # CI/CD configuration
├── .env.local             # Local environment variables
├── env.sample             # Environment template
├── DATABASE_SETUP.md      # Database setup guide
└── README.md              # General documentation
```

## 🆘 Getting Help

1. **Check Documentation**
   - `README.md` - General overview
   - `DATABASE_SETUP.md` - Database setup
   - `SETUP_INSTRUCTIONS.md` - Detailed setup

2. **Run Diagnostics**
   ```bash
   npm run bootstrap
   ```

3. **Validate Build**
   ```bash
   ./scripts/validate_production.sh
   ```

4. **Check Logs**
   - Development: Check console output
   - Production: Check Vercel/platform logs

## ✅ Success Checklist

- [ ] Repository cloned and dependencies installed
- [ ] Database schema applied in Supabase Cloud
- [ ] Environment variables configured
- [ ] `npm run bootstrap` shows all green checkmarks
- [ ] Application builds successfully
- [ ] Test page shows quotes and media assets
- [ ] API endpoints return data from Supabase
- [ ] GitHub repository secrets set for production
- [ ] Deployed to production platform

---

🎯 **Goal**: A fully functional Lou Gehrig Fan Club application running on Supabase Cloud with proper CI/CD setup.