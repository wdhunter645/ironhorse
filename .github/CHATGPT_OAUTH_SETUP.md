# ChatGPT OAuth Integration Setup

This repository has been configured to work with ChatGPT through OAuth integration.

## Post-Merge Reinstallation Instructions

**Important**: After merging configuration changes to the ChatGPT Codex Connector setup, you must reinstall the app for changes to take effect.

### Steps to Reinstall After Merge:

1. **Access GitHub Developer Settings**:
   - Go to [GitHub Settings > Developer settings > GitHub Apps](https://github.com/settings/apps)
   - Find "ChatGPT Codex Connector" in your apps list

2. **Update App Configuration**:
   - Click on the app name to open its settings
   - Review and update the configuration to match the merged changes:
     - Verify callback URLs include all endpoints from `.github/github-app-manifest.json`
     - Confirm public visibility is set to "Yes"
     - Ensure all required permissions are granted, especially `metadata: read`

3. **Reinstall to Repositories**:
   - Click "Install App" in the left sidebar of the app settings
   - Select your organization/account
   - Choose the repositories that need access (including this one)
   - Complete the installation

4. **Verify Integration**:
   - Check that ChatGPT appears in GitHub Settings > Applications > Authorized OAuth Apps
   - Test the integration by creating an issue or using ChatGPT features

### Why Reinstallation is Required:

- GitHub Apps cache configuration settings
- Permission changes require explicit re-authorization
- New callback URLs need to be registered with GitHub's OAuth system
- Public visibility changes affect app discoverability

## Configuration Files Added

The following files enable ChatGPT to appear on the OAuth Apps tab:

- `.github/oauth-app.json` - OAuth application configuration
- `.github/github-app-manifest.json` - GitHub App manifest
- `.github/app.yml` - Application settings
- `.github/chatgpt-app.yml` - ChatGPT-specific configuration
- `.github/workflows/chatgpt-oauth.yml` - OAuth setup workflow

## GitHub App Installation Steps

### Manual Reinstallation Instructions

If you need to reinstall the ChatGPT Codex Connector app after configuration changes:

1. **Remove existing installation** (if necessary):
   - Go to GitHub Settings > Applications > Installed GitHub Apps
   - Find "ChatGPT Codex Connector" and click "Configure"
   - Scroll down and click "Uninstall" if you need to completely remove it

2. **Install GitHub App from Developer Settings**:
   - Go to GitHub Settings > Developer settings > GitHub Apps
   - If the app doesn't exist, click "New GitHub App"
   - If it exists, click on "ChatGPT Codex Connector" to edit it

3. **Create/Update from Manifest**:
   - Use the manifest in `.github/github-app-manifest.json`
   - Copy the entire JSON content
   - In the GitHub App settings, update the configuration to match the manifest
   - Ensure these key settings are correct:
     - **Public**: ✅ Yes (allows ChatGPT to discover and use the app)
     - **Callback URLs**: Must include all URLs from the manifest
     - **Permissions**: Must include `metadata: read` and other specified permissions
     - **Request OAuth on install**: ✅ Yes

4. **Install the App to your repositories**:
   - After creating/updating the app, click "Install App" in the left sidebar
   - Choose the organization or user account
   - Select "All repositories" or choose specific repositories including this one
   - Click "Install"

5. **Note App Details**: Save the App ID and generate a private key for later use if needed

### Verification Steps

After installation, verify the setup is working:

1. **Check OAuth Apps Tab**: 
   - Go to GitHub Settings > Applications > Authorized OAuth Apps
   - Look for "ChatGPT" or "ChatGPT Codex Connector" in the list
   - If it's not there, the installation may not have completed properly

2. **Test Repository Access**:
   - The app should appear in your repository's Settings > Integrations
   - Verify it has the correct permissions listed

3. **Test ChatGPT Integration**:
   - Create an issue using the "Design Spec (Chat)" template (if available)
   - ChatGPT should be able to interact with the repository through OAuth

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