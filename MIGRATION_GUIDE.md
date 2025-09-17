# Supabase Migration Guide

## Overview

This project uses a migration-based approach for database schema management. Migrations are timestamped SQL files that can be applied in sequence to set up and maintain the database schema.

## Migration Files

Located in `supabase/migrations/`:

- `20250101000000_initial_schema.sql` - Creates tables, indexes, RLS policies, and triggers
- `20250101000001_seed_data.sql` - Inserts sample data for testing

## Quick Start

### 1. Display Migration SQL

```bash
npm run db:migrations
```

This shows you the exact SQL that needs to be applied to your Supabase database.

### 2. Apply Migrations Manually

1. Copy the SQL output from step 1
2. Go to [app.supabase.com](https://app.supabase.com)
3. Open your project dashboard
4. Navigate to **SQL Editor**
5. Paste and run each migration in order (initial_schema.sql first, then seed_data.sql)

### 3. Verify Setup

```bash
npm run db:validate
```

## Alternative Methods

### Using Makefile

```bash
make db-migrations   # Display migration SQL
make db-validate     # Validate schema
```

### Using Legacy Scripts

The project also includes legacy SQL files in the `sql/` directory:

```bash
npm run db:deploy    # Deploy using legacy method
npm run db:validate  # Validate schema
```

## Schema Details

### Tables

**quotes**
- `id` (UUID, Primary Key)
- `text` (TEXT, NOT NULL) - The quote text
- `author` (TEXT) - Quote author (default: 'Lou Gehrig')
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

**media_assets**
- `id` (UUID, Primary Key)
- `filename` (TEXT) - Original filename
- `url` (TEXT) - URL/path to the media file
- `width` (INTEGER) - Image width in pixels
- `height` (INTEGER) - Image height in pixels
- `orientation` (TEXT) - 'portrait', 'landscape', or 'square'
- `tags` (TEXT[]) - Array of tags for categorization
- `status` (TEXT) - Approval status (default: 'approved')
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

### Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read policies** for anonymous and authenticated access
- **Automatic timestamps** with triggers for updated_at fields
- **Indexes** for optimal query performance
- **Extensible schema** ready for future enhancements

## Environment Variables

Required for database operations:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Optional but recommended
```

## Troubleshooting

**Connection errors during validation:**
- Verify your Supabase URL and keys are correct
- Ensure your Supabase project is active
- Check internet connectivity

**Migration SQL not displaying:**
- Ensure the `supabase/migrations/` directory exists
- Check that migration files have proper .sql extensions

**Tables not found after applying migrations:**
- Verify all migrations were applied successfully
- Check for SQL syntax errors in the Supabase SQL Editor
- Run `npm run db:validate` to confirm table creation