# ChatGPT OAuth Integration Setup

This repository has been configured to work with ChatGPT through OAuth integration.

## Configuration Files Added

The following files enable ChatGPT to appear on the OAuth Apps tab:

- `.github/oauth-app.json` - OAuth application configuration
- `.github/github-app-manifest.json` - GitHub App manifest
- `.github/app.yml` - Application settings
- `.github/chatgpt-app.yml` - ChatGPT-specific configuration
- `.github/workflows/chatgpt-oauth.yml` - OAuth setup workflow

## How to Complete Setup

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

If ChatGPT doesn't appear on the OAuth Apps tab:

1. **Refresh the page** - Sometimes it takes a moment for new apps to appear
2. **Check repository permissions** - Ensure you have admin access to this repository
3. **Verify installation** - Confirm ChatGPT Codex Connector is installed at the organization level
4. **Run the setup workflow** - Trigger the ChatGPT OAuth workflow manually

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