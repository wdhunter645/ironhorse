# Database Schema Setup Guide

## Quick Setup Method

The fastest way to set up the database schema is through the Supabase Dashboard:

### 1. Access Your Supabase Project
- Go to [app.supabase.com](https://app.supabase.com)
- Open your project: [lolfycmpjhbdyeyrwnbv.supabase.co](https://lolfycmpjhbdyeyrwnbv.supabase.co)

### 2. Create Database Tables
- Navigate to **SQL Editor** in the left sidebar
- Copy and paste the schema SQL from `sql/supabase_cloud_migration.sql`:

```sql
-- Create tables for Lou Gehrig Fan Club

-- Quotes table for storing Lou Gehrig quotes and sayings
create table if not exists quotes (
    id uuid primary key default gen_random_uuid(),
    text text not null,
    author text default 'Lou Gehrig',
    created_at timestamptz default now()
);

-- Media assets table for storing images and other media
create table if not exists media_assets (
    id uuid primary key default gen_random_uuid(),
    filename text,
    url text,
    width int,
    height int,
    orientation text,
    tags text[] default '{}',
    status text default 'approved',
    created_at timestamptz default now()
);

-- Enable Row Level Security and create policies

-- Enable RLS on all tables
alter table quotes enable row level security;
alter table media_assets enable row level security;

-- Create policies for public read access
create policy "Public read quotes" on quotes for select using (true);
create policy "Public read media" on media_assets for select using (true);
```

- Click **Run** to execute the SQL

### 3. Add Sample Data
Copy and paste the seed data from `sql/supabase_cloud_seed.sql`:

```sql
-- Seed data for local development

-- Insert some sample quotes
INSERT INTO quotes (text, author) VALUES 
('Today I consider myself the luckiest man on the face of the earth.', 'Lou Gehrig'),
('The ballplayer who loses his head, who can''t keep his cool, is worse than no ballplayer at all.', 'Lou Gehrig'),
('I''m not a headline guy. I know that as long as I was following Babe to the plate I could have stood on my head and no one would have known the difference.', 'Lou Gehrig')
ON CONFLICT DO NOTHING;

-- Insert some sample media assets
INSERT INTO media_assets (filename, url, width, height, orientation, tags, status) VALUES 
('gehrig_portrait.jpg', '/images/gehrig_portrait.jpg', 800, 600, 'landscape', '{"portrait", "historical"}', 'approved'),
('gehrig_batting.jpg', '/images/gehrig_batting.jpg', 600, 800, 'portrait', '{"action", "batting"}', 'approved'),
('farewell_speech.jpg', '/images/farewell_speech.jpg', 1000, 750, 'landscape', '{"farewell", "speech", "historical"}', 'approved')
ON CONFLICT DO NOTHING;
```

- Click **Run** to execute the seed data

### 4. Verify Setup
- Go to **Table Editor** in the Supabase dashboard
- You should see both `quotes` and `media_assets` tables
- Each table should have sample data

## Automated Deployment Methods

### Method 1: Using Makefile (Recommended)

```bash
# Deploy schema and validate
make db-setup

# Or run steps individually:
make db-deploy    # Deploy schema to Supabase Cloud
make db-validate  # Validate tables exist and are accessible
```

### Method 2: Using npm scripts

```bash
# Deploy and validate
npm run db:setup

# Or individual steps:
npm run db:deploy   # Deploy schema
npm run db:validate # Validate deployment
```

### Method 3: Manual scripts

```bash
# Deploy database schema
bash scripts/deploy_database.sh

# Validate deployment
node scripts/validate_database.js
```

## Production Deployment with CI/CD

The repository includes GitHub Actions workflow that automatically:
1. Applies database schema to Supabase Cloud
2. Validates table creation and accessibility
3. Runs comprehensive health checks

All configuration uses repository secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional but recommended)

### Setting Repository Secrets

```bash
# Set all repository secrets from .env.local
bash scripts/set_repo_secrets_improved.sh
```

## Alternative: Command Line Setup

If you have the service role key, you can use the automated script:

```bash
# Add service role key to .env.local
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Run setup script
node scripts/setup_db_manual.js
```

## Verification

After setting up the database:

### Method 1: Web Interface
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the test page:
   ```
   http://localhost:3000/test-supabase
   ```

3. You should see the quotes and media assets displayed instead of connection errors.

### Method 2: API Health Check
Visit the health endpoint to verify database status:
```
http://localhost:3000/api/health/database
```

Expected response for healthy database:
```json
{
  "timestamp": "2025-01-17T13:45:00.000Z",
  "status": "healthy",
  "tables": {
    "quotes": { "accessible": true, "count": 3, "error": null },
    "media_assets": { "accessible": true, "count": 3, "error": null }
  },
  "overall": { 
    "healthy": true, 
    "message": "All database tables are accessible and properly configured" 
  }
}
```

### Method 3: Validation Script
```bash
node scripts/validate_database.js
```

Expected output:
```
🎉 All database validation tests passed!

✅ Database Schema Status:
   - quotes table: Available and accessible
   - media_assets table: Available and accessible
   - Row Level Security: Enabled
   - Public read policies: Active
```

## Troubleshooting

### Common Issues

- **"Table doesn't exist" errors**: The schema hasn't been applied yet
  - Solution: Run `make db-deploy` or apply schema manually via Supabase dashboard

- **"Permission denied" errors**: Check your RLS policies
  - Solution: Verify public read policies are enabled

- **"Connection failed" errors**: Verify your environment variables
  - Solution: Check `.env.local` file and Supabase project configuration

- **"Service key not available"**: Some features require service role key
  - Solution: Add `SUPABASE_SERVICE_ROLE_KEY` to environment variables

### Getting Help

1. Check the health endpoint: `/api/health/database`
2. Run validation: `node scripts/validate_database.js`
3. Verify environment: `npm run bootstrap`
4. Check Supabase dashboard for errors

## Schema Files

- `sql/supabase_cloud_migration.sql` - Complete schema with RLS policies
- `sql/supabase_cloud_seed.sql` - Sample data for testing
- `scripts/setup_db_manual.js` - Automated setup script (requires service role key)
- `scripts/deploy_database.sh` - Comprehensive deployment script
- `scripts/validate_database.js` - Database validation and health check

## Database Schema Details

### Tables Created

#### `quotes` Table
- `id` (UUID, Primary Key) - Auto-generated unique identifier
- `text` (TEXT, NOT NULL) - The quote text
- `author` (TEXT) - Quote author (default: 'Lou Gehrig')
- `created_at` (TIMESTAMPTZ) - Creation timestamp

#### `media_assets` Table
- `id` (UUID, Primary Key) - Auto-generated unique identifier
- `filename` (TEXT) - Original filename
- `url` (TEXT) - URL/path to the media file
- `width` (INTEGER) - Image width in pixels
- `height` (INTEGER) - Image height in pixels
- `orientation` (TEXT) - 'portrait', 'landscape', or 'square'
- `tags` (TEXT[]) - Array of tags for categorization
- `status` (TEXT) - Approval status (default: 'approved')
- `created_at` (TIMESTAMPTZ) - Creation timestamp

### Security Features

- **Row Level Security (RLS)** enabled on both tables
- **Public read policies** allow authenticated and anonymous access
- **Write policies** can be added as needed for user-generated content

This schema is designed for Supabase Cloud and follows best practices for security and scalability.