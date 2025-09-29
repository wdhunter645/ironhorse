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

### Verifying Installation

To verify that the ChatGPT OAuth integration is properly configured, follow these steps:

#### 1. Run the Test Script

The repository includes a test script to validate the OAuth configuration:

```bash
# From the repository root directory
node .github/test-oauth-config.js
```

**Expected Output (Success):**
```
🔍 Testing ChatGPT OAuth configuration...

✅ Checking required configuration files...
✅ .github/oauth-app.json
✅ .github/github-app-manifest.json
✅ .github/app.yml
✅ .github/chatgpt-app.yml
✅ .github/workflows/chatgpt-oauth.yml
✅ .github/CHATGPT_OAUTH_SETUP.md

✅ Validating JSON configuration...
✅ OAuth app has required fields
✅ GitHub App manifest has required fields
✅ OAuth scopes configured: repo, read:user, user:email, read:org, write:discussion, workflow

✅ Checking callback URLs...
✅ OAuth callback: https://chatgpt.com/auth/callback
✅ App redirect: https://chatgpt.com/auth/callback
✅ Callbacks point to ChatGPT domain

==================================================
🎉 SUCCESS: ChatGPT OAuth configuration is complete!
📱 ChatGPT should now appear on the OAuth Apps tab
```

If you see any ❌ symbols, the configuration is incomplete or has issues.

#### 2. Check OAuth Apps Tab

1. Navigate to **GitHub Settings** → **Developer settings** → **OAuth Apps**
2. Look for "ChatGPT" or "ChatGPT Codex Connector" in the authorized applications list
3. If present, click on it to verify repository access permissions

#### 3. Check Workflow Logs

To review the ChatGPT OAuth workflow execution:

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Look for workflows named "ChatGPT OAuth Integration"
4. Click on a workflow run to view detailed logs
5. Check the "Setup ChatGPT OAuth Integration" step for any errors

**Workflow Log Location:**
```
Repository → Actions → ChatGPT OAuth Integration → [Workflow Run] → Setup ChatGPT OAuth Integration
```

### Common Issues and Solutions

#### Issue: Test Script Fails with Missing Files
**Symptoms:** ❌ symbols appear for configuration files in test output

**Solution:**
1. Ensure all required configuration files exist:
   - `.github/oauth-app.json`
   - `.github/github-app-manifest.json`
   - `.github/app.yml`
   - `.github/chatgpt-app.yml`
   - `.github/workflows/chatgpt-oauth.yml`
2. If files are missing, re-run the OAuth setup process

#### Issue: ChatGPT Doesn't Appear on OAuth Apps Tab
**Symptoms:** No ChatGPT entry in GitHub OAuth Apps settings

**Troubleshooting Steps:**
1. **Refresh the page** - Sometimes it takes a moment for new apps to appear
2. **Check repository permissions** - Ensure you have admin access to this repository
3. **Verify installation** - Confirm ChatGPT Codex Connector is installed at the organization level
4. **Run the setup workflow** - Trigger the ChatGPT OAuth workflow manually:
   - Go to **Actions** tab → **ChatGPT OAuth Integration** → **Run workflow**
5. **Check workflow logs** for any errors (see section above)

#### Issue: JSON Configuration Validation Fails
**Symptoms:** ❌ JSON validation errors in test script output

**Solution:**
1. Validate JSON files manually:
   ```bash
   # Check OAuth app configuration
   cat .github/oauth-app.json | python -m json.tool
   
   # Check GitHub App manifest
   cat .github/github-app-manifest.json | python -m json.tool
   ```
2. Ensure required fields are present and properly formatted
3. Verify callback URLs point to `chatgpt.com` domain

#### Issue: Callback URL Mismatch
**Symptoms:** ❌ Callbacks point to ChatGPT domain check fails

**Solution:**
1. Verify both files contain the correct callback URL:
   - Expected: `https://chatgpt.com/auth/callback`
2. Update the callback URLs if they differ from the expected format
3. Re-run the test script to confirm the fix

#### Issue: Workflow Execution Errors
**Symptoms:** Workflow fails or shows errors in Actions tab

**Solution:**
1. Check workflow permissions in repository settings
2. Ensure the workflow file is properly formatted YAML
3. Review workflow logs for specific error messages
4. Verify repository has necessary permissions for the workflow to execute

### Getting Help

If you continue to experience issues:

1. **Re-run the test script** to get current status
2. **Check workflow logs** in the Actions tab for detailed error information
3. **Verify repository permissions** - you need admin access for OAuth app management
4. **Review configuration files** to ensure they match the expected format shown in test output

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