# GitHub Advanced Security Configuration

This document outlines the GitHub Advanced Security features configured for this repository.

## 🔒 Security Features Enabled

### 1. CodeQL Analysis (.github/workflows/codeql.yml)

**Purpose**: Automated static analysis for security vulnerabilities and code quality issues.

**Configuration**:
- Runs on: Push to main/develop, PRs to main, and weekly schedule (Sundays 2 AM UTC)
- Language: JavaScript/TypeScript
- Query suites: `security-extended` and `security-and-quality`
- Build mode: `none` (for interpreted languages)

**What it scans for**:
- SQL injection vulnerabilities
- Cross-site scripting (XSS)
- Command injection
- Path traversal vulnerabilities
- Unsafe deserialization
- And 100+ other security patterns

### 2. Secret Scanning

**Purpose**: Automatically detect exposed credentials and secrets in your code.

**Coverage**:
- AWS keys and secrets
- Azure service principals
- Google Cloud service account keys
- Database connection strings
- OAuth tokens
- Private keys and certificates
- Supabase keys
- Vercel tokens
- And 200+ other secret patterns

**Configuration**: Enabled by default, no additional configuration required.

### 3. Dependabot (.github/dependabot.yml)

**Purpose**: Automated dependency vulnerability scanning and updates.

**Configuration**:
- NPM package updates: Weekly on Mondays at 6 AM UTC
- GitHub Actions updates: Weekly on Mondays at 6 AM UTC
- Groups minor and patch updates together
- Maximum 5 open PRs for NPM, 3 for GitHub Actions
- Automatically assigns reviewers and labels

**What it does**:
- Scans for vulnerable dependencies
- Creates PRs for security updates
- Provides changelog and compatibility information
- Prioritizes security patches

### 4. Comprehensive Security Workflow (.github/workflows/security-comprehensive.yml)

**Purpose**: Daily comprehensive security scanning with additional checks.

**Features**:
- Runs daily at 3 AM UTC
- Enhanced CodeQL scanning with all query suites
- NPM audit for dependency vulnerabilities
- Additional secret pattern detection
- Manual trigger capability

## 🚀 Security Workflow Integration

### Build Pipeline Security (.github/workflows/deploy.yml)

The main deployment workflow includes:
1. **Security checks job** that runs first
2. **NPM audit** for dependency vulnerabilities  
3. **CodeQL analysis** integrated into build process
4. **Build and test job** only runs after security passes

This ensures no code gets deployed without passing security checks.

## 📊 Monitoring and Alerts

### Security Tab Dashboard

Visit the repository's Security tab to view:
- [Code scanning alerts](../../security/code-scanning)
- [Secret scanning alerts](../../security/secret-scanning)  
- [Dependabot alerts](../../security/dependabot)
- [Security advisories](../../security/advisories)

### Automated Notifications

GitHub will automatically:
- Create issues for high-severity vulnerabilities
- Send email notifications for new security alerts
- Comment on PRs with security findings
- Block pushes containing detected secrets

## 🛠️ Developer Workflow

### Before Committing

1. **Run local security checks**:
   ```bash
   npm audit
   npm run lint
   ```

2. **Avoid committing secrets**:
   - Use environment variables
   - Store secrets in GitHub repository secrets
   - Never hardcode API keys or passwords

### Handling Security Alerts

1. **CodeQL alerts**: Review in Security tab, fix issues in code
2. **Secret scanning**: Revoke exposed secrets, update in secure storage
3. **Dependabot**: Review and merge security update PRs promptly

### Contributing Security Improvements

1. Improve CodeQL queries by adding custom rules
2. Report false positives to help improve detection
3. Suggest additional secret patterns for scanning
4. Enhance security documentation

## 🔍 Custom Configuration

### Adding Custom Secret Patterns

Repository administrators can add custom secret patterns:
1. Go to Settings → Security & analysis
2. Configure secret scanning
3. Add custom patterns for organization-specific secrets

### CodeQL Query Customization

Customize CodeQL analysis by:
1. Creating `.github/codeql/codeql-config.yml`
2. Adding custom queries in `.github/codeql/queries/`
3. Excluding files with `paths-ignore` in workflow

## ⚡ Quick Reference

| Feature | Frequency | Trigger | Purpose |
|---------|-----------|---------|---------|
| CodeQL | Push/PR + Weekly | Automatic | Vulnerability scanning |
| Secret Scanning | Real-time | Automatic | Credential detection |
| Dependabot | Weekly | Automatic | Dependency updates |
| Comprehensive Scan | Daily | Scheduled | Enhanced security check |

## 📞 Support

For questions about security configuration:
- Check [GitHub Security Documentation](https://docs.github.com/en/code-security)
- Review [SECURITY.md](../SECURITY.md) for vulnerability reporting
- Contact repository maintainers for access issues