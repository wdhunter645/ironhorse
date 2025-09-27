# Deployment Documentation

## Production Environment Configuration

This project has been configured to run all website instances (both development and production) in the **production environment** only.

### Key Configuration Changes

1. **Environment Variables**: All Vercel environment variables are now set only for the production environment
2. **Unified Deployment**: Both dev and prod functionality is deployed to the production environment
3. **Single Source of Truth**: All deployments use the same production configuration

### Deployment Process

1. **GitHub Actions**: Automatic deployment on push to `main` branch
   - Builds the application
   - Deploys to Vercel production environment
   - Performs health checks

2. **Manual Deployment**: 
   ```bash
   vercel --prod
   ```

### Environment Variable Management

Use the provided script to set all environment variables for production:

```bash
# Set environment variables for production environment only
make vercel-env
```

Or directly:
```bash
bash scripts/set_vercel_env.sh
```

### Repository Secrets

Set GitHub repository secrets for CI/CD:

```bash
bash scripts/set_repo_secrets_improved.sh
```

### Automated Dependency Management

This repository is configured with **GitHub Dependabot** for automated dependency updates and security alerts:

- **Daily dependency checks** for npm packages and GitHub Actions
- **Automatic security updates** for vulnerabilities
- **Grouped pull requests** for related dependencies
- **Configuration**: See [docs/DEPENDABOT.md](docs/DEPENDABOT.md) for details
- **Validation**: Run `make validate-dependabot` to check configuration

Dependabot will automatically create pull requests for:
- Security vulnerabilities (immediate)
- Outdated dependencies (daily at 6:00 AM EST)
- GitHub Actions updates (daily at 6:00 AM EST)

### Benefits of Production-Only Deployment

- **Simplified Configuration**: Single environment to manage
- **Consistent Behavior**: Same environment for all functionality
- **Reduced Complexity**: No environment-specific issues
- **Streamlined Deployment**: Unified deployment process

### Migration Notes

- Previous preview and development environments are no longer used
- All environment variables now target production environment only
- No downtime required for existing users