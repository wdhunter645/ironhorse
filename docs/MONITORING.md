# Supabase Monitoring and Alert Bot

This repository includes a comprehensive monitoring and alert system for Supabase databases, designed to track database health, quota usage, and security events.

## Features

- **Database Health Monitoring**: Connection status, query performance, table accessibility
- **Quota Monitoring**: Storage usage, bandwidth consumption, database size tracking
- **Security Monitoring**: Authentication failures, suspicious activity detection
- **Real-time Alerts**: Console logging, file storage, webhook integration
- **API Integration**: REST endpoints for status and alert management
- **Configurable Thresholds**: Customizable alert triggers and monitoring intervals

## Quick Start

### 1. Environment Setup

Ensure your `.env.local` file contains the required Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_WEBHOOK_SECRET=your-webhook-secret  # optional
```

### 2. Install Dependencies

The monitoring bot requires the following dependencies (already included in package.json):

```bash
npm install @supabase/supabase-js dotenv
```

### 3. Run Monitoring Commands

Use the provided Makefile commands:

```bash
# Test the monitoring system (one-time check)
make monitor-test

# Check monitoring status
make monitor-status

# Start continuous monitoring
make monitor-start
```

Or run directly with Node.js:

```bash
# One-time health check
node scripts/supabase_monitor.js test

# Start continuous monitoring
node scripts/supabase_monitor.js start

# Check status
node scripts/supabase_monitor.js status
```

## Configuration

The monitoring system can be configured via `scripts/monitoring-config.json`:

### Monitoring Intervals

```json
{
  "intervals": {
    "healthCheck": 300000,    // 5 minutes
    "quotaCheck": 900000,     // 15 minutes  
    "securityCheck": 600000   // 10 minutes
  }
}
```

### Alert Thresholds

```json
{
  "thresholds": {
    "responseTime": 5000,         // 5 seconds
    "errorRate": 0.05,            // 5%
    "storageThreshold": 0.85,     // 85% of quota
    "bandwidthThreshold": 0.90    // 90% of quota
  }
}
```

### Alert Configuration

```json
{
  "alerts": {
    "logToConsole": true,
    "saveToFile": true,
    "webhookUrl": null,
    "maxStoredAlerts": 1000
  }
}
```

## API Endpoints

### Monitoring Status

```bash
GET /api/monitoring/status
```

Returns overall system status and service health:

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "status": "healthy",
  "services": {
    "database": {
      "status": "up",
      "responseTime": 45,
      "lastCheck": "2024-01-01T12:00:00.000Z",
      "errorRate": 0.001
    }
  },
  "alerts": {
    "critical": 0,
    "error": 0,
    "warning": 1,
    "info": 3
  }
}
```

### Webhook Alerts

```bash
POST /api/monitoring/webhooks
```

Receives webhook alerts from Supabase and processes them into structured alerts.

```bash
GET /api/monitoring/webhooks?limit=20&severity=error
```

Retrieves recent alerts with optional filtering:

```json
{
  "alerts": [...],
  "total": 100,
  "filtered": 10,
  "summary": {
    "critical": 0,
    "error": 2,
    "warning": 5,
    "info": 15
  }
}
```

## Alert Types

### Health Alerts

- **high_response_time**: Database response time exceeds threshold
- **checks_failed**: One or more health checks failed
- **check_error**: Error occurred during health check

### Quota Alerts

- **storage_threshold**: Storage usage exceeds configured threshold
- **bandwidth_threshold**: Bandwidth usage exceeds configured threshold

### Security Alerts

- **high_auth_failures**: Excessive authentication failures detected
- **suspicious_activity**: Unusual activity patterns detected

## Webhook Integration

### Supabase Webhook Setup

1. In your Supabase dashboard, go to Database → Webhooks
2. Create a new webhook with URL: `https://your-domain.com/api/monitoring/webhooks`
3. Configure for relevant events (INSERT, UPDATE, DELETE, auth events)
4. Add webhook secret to environment variables

### Custom Webhook Alerts

Send custom alerts to the monitoring system:

```bash
curl -X POST https://your-domain.com/api/monitoring/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "custom.alert",
    "severity": "warning", 
    "message": "Custom monitoring alert",
    "metadata": { "source": "external_system" }
  }'
```

## Monitoring Checks

### Database Health
- Connection status
- Table accessibility (quotes, media_assets)
- Query performance benchmarks
- Authentication service status

### Quota Monitoring
- Database storage usage
- Bandwidth consumption
- Connection pool utilization
- Table count and size

### Security Monitoring
- Authentication failure rates
- Suspicious IP activity
- Session anomalies
- Access pattern analysis

## Log Files

Alerts are automatically saved to `logs/supabase-alerts.json` when file logging is enabled. The log file contains:

- Alert timestamps
- Severity levels
- Category classification
- Detailed metadata

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   ```
   ❌ Missing required environment variables:
      NEXT_PUBLIC_SUPABASE_URL: ❌ Missing
      SUPABASE_SERVICE_ROLE_KEY: ❌ Missing
   ```
   Solution: Ensure `.env.local` contains required Supabase credentials.

2. **Permission Errors**
   ```
   ❌ Health check failed: permission denied for table quotes
   ```
   Solution: Verify service role key has appropriate permissions.

3. **Connection Timeouts**
   ```
   ❌ Health check failed: connect ETIMEDOUT
   ```
   Solution: Check network connectivity and Supabase URL.

### Debug Mode

Run with verbose logging:

```bash
DEBUG=true node scripts/supabase_monitor.js test
```

### Health Check Integration

Integrate with existing health checks:

```bash
# Add to your deployment scripts
make monitor-test && echo "Monitoring system healthy"
```

## Production Deployment

### Docker Integration

Add to your Dockerfile:

```dockerfile
# Install monitoring dependencies
RUN npm install @supabase/supabase-js dotenv

# Copy monitoring scripts
COPY scripts/supabase_monitor.js /app/scripts/
COPY scripts/monitoring-config.json /app/scripts/

# Health check
HEALTHCHECK --interval=5m --timeout=10s \
  CMD node scripts/supabase_monitor.js test || exit 1
```

### Process Management

Use PM2 or similar for production monitoring:

```bash
pm2 start scripts/supabase_monitor.js --name supabase-monitor -- start
```

### Log Rotation

Configure log rotation for alert files:

```bash
# Add to logrotate.d/supabase-monitor
/path/to/logs/supabase-alerts.json {
    daily
    rotate 30
    compress
    missingok
    notifempty
}
```

## Integration Examples

### CI/CD Pipeline

```yaml
# .github/workflows/monitor.yml
- name: Test Monitoring System
  run: make monitor-test
  
- name: Start Production Monitoring
  run: make monitor-start
  if: github.ref == 'refs/heads/main'
```

### Alert Automation

```bash
# Send alerts to Slack/Discord
export MONITORING_WEBHOOK_URL="https://hooks.slack.com/services/..."
make monitor-start
```

## Contributing

When adding new monitoring features:

1. Update `scripts/supabase_monitor.js` with new check functions
2. Add corresponding alert types to webhook handler
3. Update configuration options in `monitoring-config.json`
4. Document new features in this README

## Support

For issues related to the monitoring system:

1. Check the troubleshooting section above
2. Review log files in `logs/supabase-alerts.json`
3. Test individual components with `make monitor-test`
4. Verify environment variables with `make env-check`