# Datadog Integration for ironhorse

This document describes the Datadog integration setup for monitoring and alerting in the ironhorse application.

## Overview

The ironhorse application now includes comprehensive Datadog integration with:

- **APM (Application Performance Monitoring)** - Server-side tracing
- **RUM (Real User Monitoring)** - Client-side performance monitoring  
- **Log Management** - Centralized logging with trace correlation
- **Custom Metrics** - Business-specific metrics tracking

## Setup

### 1. Environment Variables

#### Server-side APM Configuration
```bash
# Required for production
DD_API_KEY=your-datadog-api-key
DD_SERVICE=ironhorse
DD_ENV=production
DD_VERSION=1.0.0

# Optional configurations
DD_TRACE_SAMPLE_RATE=1.0  # 100% sampling (adjust for high traffic)
DATADOG_ENABLED=true      # Enable/disable Datadog (default: enabled in production)
```

#### Client-side RUM Configuration
```bash
# Required for browser monitoring
NEXT_PUBLIC_DD_APPLICATION_ID=your-datadog-application-id
NEXT_PUBLIC_DD_CLIENT_TOKEN=your-datadog-client-token
NEXT_PUBLIC_DD_SITE=datadoghq.com  # Or your Datadog site

# Optional configurations
NEXT_PUBLIC_DD_SERVICE=ironhorse
NEXT_PUBLIC_DD_ENV=production
NEXT_PUBLIC_DD_VERSION=1.0.0
```

### 2. Datadog Account Setup

1. **Create a Datadog Account**: Visit [datadoghq.com](https://datadoghq.com)

2. **Get API Key**: 
   - Go to Organization Settings > API Keys
   - Create a new API key for the ironhorse application

3. **Create RUM Application**:
   - Go to UX Monitoring > RUM Applications
   - Create a new application for ironhorse
   - Copy the Application ID and Client Token

4. **Configure Integrations**:
   - Enable Node.js APM integration
   - Configure log collection if needed

### 3. Deployment Configuration

#### Vercel Deployment
Add environment variables in your Vercel dashboard:

```bash
# Required for APM
DD_API_KEY=your-key
DD_SERVICE=ironhorse
DD_ENV=production

# Required for RUM  
NEXT_PUBLIC_DD_APPLICATION_ID=your-app-id
NEXT_PUBLIC_DD_CLIENT_TOKEN=your-client-token
```

#### Docker Deployment
```dockerfile
ENV DD_API_KEY=your-key
ENV DD_SERVICE=ironhorse
ENV DD_ENV=production
ENV NEXT_PUBLIC_DD_APPLICATION_ID=your-app-id
ENV NEXT_PUBLIC_DD_CLIENT_TOKEN=your-client-token
```

## Features

### APM (Application Performance Monitoring)

- **Automatic instrumentation** for HTTP requests, database queries, and external services
- **Custom spans** for business logic (see `/api/quotes/weekly/route.ts`)
- **Error tracking** with stack traces and context
- **Performance metrics** including response times and throughput

### RUM (Real User Monitoring)

- **Page load performance** monitoring
- **User interaction tracking** (clicks, navigation)
- **Error tracking** in the browser
- **Session replay** (20% sampling by default)

### Logging

- **Structured JSON logging** with trace correlation
- **Custom logger** (`lib/logger.ts`) with Datadog integration
- **Automatic log injection** with trace and span IDs

### Custom Metrics

Use the logger and tracer to add custom business metrics:

```typescript
import { logger } from '@/lib/logger';
import { tracer } from '@/lib/datadog';

// Custom logging
logger.info('User action completed', { userId: 123, action: 'purchase' });

// Custom spans  
tracer.trace('business.operation', (span) => {
  span?.setTag('user.id', userId);
  span?.setTag('operation.type', 'critical');
  
  // Your business logic here
});
```

## Development

### Local Development

For local development, Datadog is disabled by default. To enable:

```bash
# In your .env.local file
DATADOG_ENABLED=true
DD_API_KEY=your-dev-key
# ... other variables
```

### Testing

The application includes safe defaults:
- Datadog will not initialize without proper API keys
- Missing configuration logs warnings but doesn't break the app
- All Datadog calls are wrapped in try-catch blocks

## Monitoring

### Key Metrics to Monitor

1. **Response Times**: Monitor API endpoint performance
2. **Error Rates**: Track 4xx and 5xx responses  
3. **User Experience**: Page load times and Core Web Vitals
4. **Custom Business Metrics**: Quote requests, user interactions

### Recommended Alerts

1. **High Error Rate**: Error rate > 5% for 5 minutes
2. **Slow Response Time**: P95 response time > 2 seconds
3. **High Memory Usage**: Memory usage > 80%
4. **Failed Deployments**: Deployment errors

### Dashboards

Create dashboards for:
- **Application Overview**: Response times, error rates, throughput
- **User Experience**: Core Web Vitals, page load times
- **Infrastructure**: Memory, CPU, database performance
- **Business Metrics**: Quote requests, user activity

## Troubleshooting

### Common Issues

1. **APM not showing data**:
   - Verify `DD_API_KEY` is set correctly
   - Check that `DATADOG_ENABLED=true` in production
   - Ensure the service name matches your Datadog configuration

2. **RUM not working**:
   - Verify `NEXT_PUBLIC_DD_APPLICATION_ID` and `NEXT_PUBLIC_DD_CLIENT_TOKEN`
   - Check browser console for errors
   - Ensure the Datadog site matches your account region

3. **Logs not correlated**:
   - Verify log injection is enabled in tracer configuration
   - Check that structured JSON logging is used

### Debug Mode

Enable debug logging:
```bash
DEBUG=true
DD_TRACE_DEBUG=true
```

## Cost Optimization

### Sampling Configuration

Adjust sampling rates based on traffic:

```bash
# For high-traffic applications, reduce sampling
DD_TRACE_SAMPLE_RATE=0.1  # 10% sampling

# For RUM, adjust session replay sampling
# Edit lib/datadog-rum.ts to change sessionReplaySampleRate
```

### Log Management

- Use appropriate log levels (avoid excessive debug logs in production)
- Configure log retention policies in Datadog
- Use log sampling for high-volume applications

## Support

- **Datadog Documentation**: [docs.datadoghq.com](https://docs.datadoghq.com)
- **Next.js Integration**: [Datadog Next.js Guide](https://docs.datadoghq.com/tracing/setup_overview/setup/nodejs/)
- **Support**: Contact Datadog support for integration issues