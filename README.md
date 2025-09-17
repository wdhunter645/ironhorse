# IronHorse - Lou Gehrig Fan Club

A Next.js application for the Lou Gehrig Fan Club with Supabase backend.

## Quick Start (Supabase Cloud Only)

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Supabase Cloud Setup

This project uses **Supabase Cloud**—no local Supabase CLI or Docker required.

1. **Create a Supabase project** at [app.supabase.com](https://app.supabase.com).
2. **Copy your project credentials** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) from your Supabase dashboard.
3. **Add all required environment variables** (including Backblaze B2 credentials) to your repository secrets for CI/CD and to your `.env.local` for local development.  
   - See `env.sample` for the full list.

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

3. **Configure environment variables:**
   ```bash
   cp env.sample .env.local
   # Fill in your Supabase Cloud and B2 credentials
   ```

4. **Run the app:**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Schema & Migrations

- Apply the SQL migration files in `sql/` directly to your Supabase Cloud project using the Supabase SQL editor, or via the CLI pointed at your cloud project (not locally).

### Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

### Environment Variables

See `env.sample` for all required variables.

---

**Note:**  
Local Supabase/Docker/CLI setup is NOT supported or required. All development and deployment targets Supabase Cloud using your repository secrets.