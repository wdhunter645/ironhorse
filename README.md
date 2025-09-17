# IronHorse - Lou Gehrig Fan Club

A Next.js application for the Lou Gehrig Fan Club with Supabase backend.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn
- Docker (for local Supabase development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ironhorse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.sample .env.local
# Edit .env.local with your actual values
```

### Supabase Setup

This project uses Supabase for the backend. The Supabase CLI is already configured as a dev dependency.

#### Quick Validation

To validate your Supabase setup:
```bash
make validate-supabase
# OR
./scripts/validate_supabase_setup.sh
```

#### Local Development

1. **Start the local Supabase stack:**
```bash
npx supabase start
```

This will:
- Pull and start Docker containers for Postgres, PostgREST, GoTrue, and other services
- Apply all migrations from `supabase/migrations/`
- Seed the database with data from `supabase/seed.sql`
- Start the Supabase Studio interface

2. **Check the status:**
```bash
npx supabase status
```

3. **Reset database (if needed):**
```bash
npx supabase db reset
```

The local Supabase stack will be available at:
- **API URL:** http://127.0.0.1:54321
- **Studio URL:** http://127.0.0.1:54323 (Database management interface)
- **Database URL:** postgresql://postgres:postgres@127.0.0.1:54322/postgres
- **Inbucket URL:** http://127.0.0.1:54324 (Email testing)

#### Managing Migrations

The project includes the following database schema:

- **`quotes`** - Lou Gehrig quotes and sayings
  - `id` (UUID, primary key)
  - `text` (text, not null)
  - `author` (text, default 'Lou Gehrig')
  - `created_at` (timestamptz)

- **`media_assets`** - Images and media files with metadata
  - `id` (UUID, primary key)
  - `filename` (text)
  - `url` (text)
  - `width`, `height` (integer)
  - `orientation` (text)
  - `tags` (text array)
  - `status` (text, default 'approved')
  - `created_at` (timestamptz)

To create new migrations:
```bash
npx supabase migration new <migration_name>
```

To apply pending migrations:
```bash
npx supabase db reset
```

#### Environment Configuration

For local development, your `.env.local` should use the local stack:
```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

#### Troubleshooting

**Docker Issues:**
- If containers fail to start, try: `npx supabase stop && npx supabase start`
- On rate limit errors, wait a few minutes and retry
- Ensure Docker is running and has sufficient resources

**Port Conflicts:**
- Default ports: 54321 (API), 54322 (DB), 54323 (Studio), 54324 (Inbucket)
- If ports are in use, modify `supabase/config.toml`

**Database Connection:**
- Verify tables exist: `npx supabase status` should show "Started"
- Check logs: `docker logs supabase_db_ironhorse`

#### Production Setup

For production deployment, follow the setup instructions in `SETUP_INSTRUCTIONS.md`.

### Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Schema

The application includes the following tables:
- `quotes` - Lou Gehrig quotes and sayings
- `media_assets` - Images and media files with metadata

### Available Scripts

**Development:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Supabase:**
- `npm run supabase:start` - Start local Supabase stack
- `npm run supabase:stop` - Stop local Supabase stack
- `npm run supabase:status` - Check Supabase service status
- `npm run supabase:reset` - Reset database with migrations and seed data

### Project Structure

```
ironhorse/
├── app/                    # Next.js 13+ app directory
├── public/                 # Static files
├── scripts/               # Setup and deployment scripts
├── sql/                   # Database schemas and policies
├── supabase/              # Supabase configuration
│   ├── config.toml        # Local development config
│   └── .gitignore         # Supabase-specific gitignore
├── .env.local             # Environment variables (local)
├── env.sample             # Environment variables template
└── package.json           # Dependencies and scripts
```

### Environment Variables

Required environment variables (see `env.sample`):

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (server-side only)
- `NEXT_PUBLIC_B2_ENDPOINT` - Backblaze B2 endpoint
- `NEXT_PUBLIC_B2_BUCKET` - Backblaze B2 bucket name
- `B2_KEY_ID` - Backblaze B2 key ID
- `B2_APP_KEY` - Backblaze B2 application key

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.