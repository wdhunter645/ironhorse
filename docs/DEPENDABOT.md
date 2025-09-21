# Dependabot Configuration

This repository is configured with [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) to automatically manage dependency updates and security alerts.

## Configuration Overview

The Dependabot configuration (`.github/dependabot.yml`) is set up to:

### 📦 Node.js Dependencies (npm)
- **Daily checks** at 6:00 AM EST for package.json dependencies
- **Automatic security updates** for vulnerabilities
- **Grouped updates** for related dependencies:
  - Production dependencies (Next.js, React)
  - Development dependencies (TypeScript, ESLint, Tailwind CSS)
- **Maximum 10 open pull requests** to avoid spam
- **Automatic assignment** to repository owner for review

### 🔧 GitHub Actions Dependencies
- **Daily checks** at 6:00 AM EST for workflow actions
- **Automatic security updates** for action vulnerabilities
- **Maximum 5 open pull requests** for action updates
- **Automatic assignment** to repository owner for review

## What to Expect

### Automated Pull Requests
Dependabot will automatically create pull requests for:
- Security vulnerabilities (high priority)
- Outdated dependencies (daily schedule)
- GitHub Actions updates (daily schedule)

### Pull Request Features
- **Clear commit messages** with prefixes (`npm:`, `npm-dev:`, `actions:`)
- **Detailed descriptions** with release notes and changelogs
- **Automatic conflict resolution** when possible
- **CI/CD integration** - all checks must pass before merging

### Security Alerts
- **Immediate notifications** for security vulnerabilities
- **Automatic pull requests** for security fixes
- **Priority handling** for critical security issues

## Managing Dependabot

### Approving Updates
1. Review the pull request description and changes
2. Check that CI/CD tests pass
3. Merge the pull request to apply updates

### Postponing Updates
- Add `@dependabot ignore this minor version` comment to ignore minor updates
- Add `@dependabot ignore this major version` comment to ignore major updates
- Add `@dependabot ignore this dependency` comment to ignore specific dependencies

### Emergency Pause
- Add `@dependabot pause` comment to temporarily stop all updates
- Add `@dependabot unpause` comment to resume updates

## Configuration Details

- **Schedule**: Daily at 6:00 AM Eastern Time
- **Target Branch**: `main`
- **Reviewer**: `wdhunter645`
- **Open PR Limit**: 10 for npm, 5 for GitHub Actions
- **Dependency Types**: All types allowed for updates

## Benefits

✅ **Automated Security**: Immediate patches for vulnerabilities  
✅ **Stay Current**: Regular updates to latest stable versions  
✅ **Reduced Maintenance**: Automated dependency management  
✅ **Improved Stability**: Grouped updates reduce integration issues  
✅ **CI/CD Integration**: All updates validated by existing workflows  

For more information, see the [GitHub Dependabot documentation](https://docs.github.com/en/code-security/dependabot).