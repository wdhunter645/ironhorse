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

#### Local Development

1. Start the local Supabase stack:
```bash
npx supabase start
```

2. Apply database migrations:
```bash
npx supabase db reset
```

3. Check the status:
```bash
npx supabase status
```

The local Supabase stack will be available at:
- API URL: http://127.0.0.1:54321
- Studio URL: http://127.0.0.1:54323
- Database URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

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