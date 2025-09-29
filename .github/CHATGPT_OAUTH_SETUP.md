# ChatGPT OAuth Integration Setup

This repository has been configured to work with ChatGPT through OAuth integration.

## Configuration Files Added

The following files enable ChatGPT to appear on the OAuth Apps tab:

- `.github/oauth-app.json` - OAuth application configuration
- `.github/github-app-manifest.json` - GitHub App manifest
- `.github/app.yml` - Application settings
- `.github/chatgpt-app.yml` - ChatGPT-specific configuration
- `.github/workflows/chatgpt-oauth.yml` - OAuth setup workflow

## GitHub App Installation Steps

1. **Install GitHub App**: Go to GitHub Settings > Developer settings > GitHub Apps
2. **Create from Manifest**: Use the manifest in `.github/github-app-manifest.json`
3. **Install the App**: Install the app to your organization or specific repositories
4. **Note App Details**: Save the App ID and generate a private key for later use

## Environment Variables Setup

### Required Variables
All environment variables must be set both locally and in Vercel:

#### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (private)

#### Backblaze B2 Configuration
- `NEXT_PUBLIC_B2_ENDPOINT` - B2 endpoint URL (public)
- `NEXT_PUBLIC_B2_BUCKET` - B2 bucket name (public)
- `B2_KEY_ID` - B2 key ID (private)
- `B2_APP_KEY` - B2 application key (private)

### Setting Variables Locally
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in all the values in `.env.local`
3. Verify with: `bash scripts/check_env.sh`

### Setting Variables in Vercel
1. **Manual Setup**: Go to Vercel dashboard > Your Project > Settings > Environment Variables
2. **Automated Setup**: Use the provided script:
   ```bash
   # First ensure all variables are set locally
   bash scripts/check_env.sh
   
   # Then push to Vercel (requires Vercel CLI authentication)
   bash scripts/set_vercel_env.sh
   ```

## Vercel CLI Authentication

Before using the automated script, authenticate with Vercel:
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Login to Vercel
vercel login

# Link your project (run this in your project directory)
vercel link
```

## How to Complete OAuth Setup

1. **Check OAuth Apps Tab**: Go to your GitHub Settings > Developer settings > OAuth Apps
2. **Authorize ChatGPT**: Look for "ChatGPT" or "ChatGPT Codex Connector" in the list
3. **Grant Repository Access**: Ensure the app has access to this repository
4. **Test Integration**: Create an issue using the "Design Spec (Chat)" template

## OAuth Scopes Configured

The ChatGPT integration has been configured with these scopes:
- `repo` - Full repository access
- `read:user` - Read user profile information
- `user:email` - Access user email addresses  
- `read:org` - Read organization membership
- `write:discussion` - Create and modify discussions
- `workflow` - Access to GitHub Actions workflows

## Troubleshooting

### Environment Variables
If you get missing variable errors:
1. **Check locally**: Run `bash scripts/check_env.sh`
2. **Check Vercel**: Go to Vercel dashboard > Settings > Environment Variables
3. **Re-run setup**: Use `bash scripts/set_vercel_env.sh` after fixing missing variables

### ChatGPT OAuth Issues
If ChatGPT doesn't appear on the OAuth Apps tab:

1. **Refresh the page** - Sometimes it takes a moment for new apps to appear
2. **Check repository permissions** - Ensure you have admin access to this repository
3. **Verify installation** - Confirm ChatGPT Codex Connector is installed at the organization level
4. **Run the setup workflow** - Trigger the ChatGPT OAuth workflow manually

### Vercel Deployment Issues
If deployment fails:
1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Ensure database is set up** in Supabase
4. **Check Supabase connection** with provided credentials

## Usage

Once setup is complete, you can:
- Create issues using the "Design Spec (Chat)" template
- ChatGPT will automatically process patch blocks in issues
- Use the `auto-apply` label to trigger automatic PR creation
- ChatGPT will have proper OAuth access to interact with the repository

## Security Notes

- The OAuth integration only grants necessary permissions
- All callbacks go to official ChatGPT domains
- The integration is configured as non-public for security
- Repository access is controlled through GitHub's permission system
- Environment variables containing secrets should never be committed to the repository