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

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the test page:
   ```
   http://localhost:3000/test-supabase
   ```

3. You should see the quotes and media assets displayed instead of connection errors.

## Troubleshooting

- **"Table doesn't exist" errors**: The schema hasn't been applied yet
- **"Permission denied" errors**: Check your RLS policies
- **"Connection failed" errors**: Verify your environment variables

## Schema Files

- `sql/supabase_cloud_migration.sql` - Complete schema with RLS policies
- `sql/supabase_cloud_seed.sql` - Sample data for testing
- `scripts/setup_db_manual.js` - Automated setup script (requires service role key)