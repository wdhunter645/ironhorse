# Sentry Error Monitoring Integration

This document describes the Sentry error monitoring integration for real-time error tracking and alerting.

## Overview

Sentry has been integrated into the ironhorse application to provide:

- **Real-time error monitoring** for both client-side and server-side errors
- **Performance monitoring** with transaction tracing
- **Session replay** for debugging user interactions
- **Custom error reporting** with contextual information
- **Automatic alerting** when errors occur

## Configuration

### Environment Variables

The following environment variables need to be configured for different environments:

#### Required Variables
- `NEXT_PUBLIC_SENTRY_DSN` - Public DSN for client-side error reporting
- `SENTRY_DSN` - Server-side DSN (can be same as public DSN)
- `SENTRY_ORG` - Your Sentry organization slug
- `SENTRY_PROJECT` - Your Sentry project slug
- `SENTRY_AUTH_TOKEN` - Authentication token for build-time source map uploads

#### Environment Setup

1. **Development (.env.local)**
   ```
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   SENTRY_DSN=https://your-dsn@sentry.io/project-id
   SENTRY_ORG=your-org-slug
   SENTRY_PROJECT=your-project-slug
   SENTRY_AUTH_TOKEN=your-auth-token
   ```

2. **Production (GitHub Secrets & Vercel)**
   - Set repository secrets using: `bash scripts/set_repo_secrets.sh`
   - Deploy environment variables: `bash scripts/set_vercel_env.sh`

### Sentry Project Setup

1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new project for your application
3. Copy the DSN from your project settings
4. Generate an auth token for source map uploads
5. Configure the environment variables as described above

## Files Structure

### Configuration Files
- `instrumentation.ts` - Main instrumentation file for server/edge runtime
- `instrumentation-client.ts` - Client-side configuration with session replay
- `sentry.server.config.ts` - Server-side Sentry configuration
- `sentry.edge.config.ts` - Edge runtime Sentry configuration
- `app/global-error.tsx` - Global error boundary with Sentry reporting

### Test Pages
- `app/sentry-test/page.tsx` - Error testing page for validation
- `app/api/sentry-test/route.ts` - API endpoint for server-side error testing

## Features

### Automatic Error Capture
- **Unhandled exceptions** are automatically captured and reported
- **React render errors** are caught by the global error boundary
- **API route errors** are automatically instrumented
- **Navigation errors** are tracked via router instrumentation

### Manual Error Reporting
```typescript
import * as Sentry from "@sentry/nextjs";

// Capture an exception
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// Capture a custom message
Sentry.captureMessage("Something important happened", "info");

// Add context
Sentry.withScope((scope) => {
  scope.setTag("feature", "user-auth");
  scope.setContext("user", { id: "123", plan: "premium" });
  Sentry.captureException(error);
});
```

### Performance Monitoring
- **Transaction tracing** for API routes and page loads
- **Custom transactions** can be created for specific operations
- **Database query tracing** (when applicable)

### Session Replay
- **Error replays** are automatically captured when errors occur
- **Sample rate** is configured to 10% for regular sessions
- **Privacy controls** mask sensitive text and media by default

## Environment-Specific Configuration

### Development
- Full error tracking enabled
- Session replay disabled or minimal sampling
- Debug mode can be enabled for testing

### Staging
- Full error tracking enabled
- Moderate session replay sampling
- Environment tagged as "staging"

### Production
- Full error tracking enabled
- Conservative session replay sampling (10%)
- Environment tagged as "production"
- Source maps uploaded for better stack traces

## Testing

### Manual Testing
Visit `/sentry-test` to verify the integration:

1. **Client Error Test** - Triggers a client-side error
2. **Server Error Test** - Triggers a server-side API error
3. **Custom Message Test** - Sends a custom message to Sentry

### Validation
1. Build the application: `npm run build`
2. Start the application: `npm start`
3. Visit the test page and trigger errors
4. Check your Sentry dashboard for reported errors

## Deployment

### GitHub Actions / CI/CD
The environment variables are automatically available in CI/CD through GitHub secrets.

### Vercel Deployment
Environment variables are automatically configured through the `set_vercel_env.sh` script.

### Source Maps
Source maps are automatically uploaded during build when `SENTRY_AUTH_TOKEN` is configured.

## Monitoring and Alerts

### Dashboard
- Monitor errors in real-time through the Sentry dashboard
- Set up alerts for error thresholds
- Configure integrations with Slack, email, or other services

### Error Grouping
Sentry automatically groups similar errors and provides:
- Error frequency and trends
- User impact analysis
- Stack traces with source maps
- Context and breadcrumbs

## Security Considerations

- **SENTRY_AUTH_TOKEN** should be kept secure and not exposed to client-side code
- **DSN** is public and safe to expose in client-side builds
- **Session replay** masks sensitive information by default
- **Environment separation** ensures staging/production data isolation

## Troubleshooting

### Common Issues

1. **No errors appearing in Sentry**
   - Verify DSN configuration
   - Check network connectivity
   - Ensure environment variables are set correctly

2. **Source maps not working**
   - Verify SENTRY_AUTH_TOKEN is configured
   - Check organization and project slugs
   - Ensure build process completes successfully

3. **Performance impact**
   - Adjust trace sample rates if needed
   - Monitor bundle size impact
   - Consider disabling session replay in production if performance is critical

### Debug Mode
Enable debug mode in development by setting `debug: true` in configuration files.

## Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Dashboard](https://sentry.io/organizations/your-org/projects/)
- [Error Monitoring Best Practices](https://docs.sentry.io/product/error-monitoring/)