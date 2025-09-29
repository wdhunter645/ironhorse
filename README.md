# Ironhorse

A Next.js application with ChatGPT OAuth integration for seamless code collaboration.

## ChatGPT Integration 🤖

This repository is configured with ChatGPT OAuth integration. **ChatGPT should now appear on your OAuth Apps tab** for easy authorization and setup.

### Quick Setup

1. **Go to GitHub Settings** → Developer settings → OAuth Apps
2. **Find "ChatGPT"** in the list of authorized applications
3. **Authorize** the application for this repository
4. **Start collaborating** by creating issues with the "Design Spec (Chat)" template

### How It Works

- ChatGPT integrates via OAuth with proper repository permissions
- Use the issue template to submit design specifications
- ChatGPT processes patch blocks and creates pull requests
- Automated workflows handle the integration seamlessly

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Configuration Files

The ChatGPT OAuth integration includes:
- `.github/oauth-app.json` - OAuth application settings
- `.github/github-app-manifest.json` - GitHub App configuration
- `.github/workflows/chatgpt-oauth.yml` - Integration workflow
- `.github/CHATGPT_OAUTH_SETUP.md` - Detailed setup documentation

## Testing OAuth Setup

```bash
# Test the OAuth configuration
node .github/test-oauth-config.js
```

## Environment Variables

Set these in your Vercel environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- `B2_KEY_ID`, `B2_APP_KEY`, `B2_BUCKET`, `B2_ENDPOINT`

## License

MIT License