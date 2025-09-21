#!/usr/bin/env node

/**
 * Supabase Monitoring and Alert Bot
 * 
 * Monitors database health, quota usage, and security events
 * Integrates with existing Supabase infrastructure and provides automated alerts
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');
  console.error('\nPlease set these in your .env.local file.');
  process.exit(1);
}

// Use service key for monitoring (requires elevated permissions)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Monitoring configuration
const config = {
  // Check intervals (in milliseconds)
  healthCheckInterval: 5 * 60 * 1000, // 5 minutes
  quotaCheckInterval: 15 * 60 * 1000, // 15 minutes
  securityCheckInterval: 10 * 60 * 1000, // 10 minutes
  
  // Thresholds for alerts
  thresholds: {
    responseTime: 5000, // 5 seconds
    errorRate: 0.05, // 5%
    connectionThreshold: 80, // 80% of max connections
    storageThreshold: 0.85, // 85% of quota
    bandwidthThreshold: 0.90 // 90% of quota
  },
  
  // Alert configuration
  alerts: {
    logToConsole: true,
    saveToFile: true,
    webhookUrl: process.env.MONITORING_WEBHOOK_URL || null
  }
};

class SupabaseMonitor {
  constructor() {
    this.isRunning = false;
    this.alertHistory = [];
    this.lastChecks = {
      health: null,
      quota: null,
      security: null
    };
  }

  async start() {
    if (this.isRunning) {
      console.log('⚠️  Monitor is already running');
      return;
    }

    console.log('🚀 Starting Supabase Monitoring Bot...');
    console.log(`📊 Health checks every ${config.healthCheckInterval / 60000} minutes`);
    console.log(`💾 Quota checks every ${config.quotaCheckInterval / 60000} minutes`);
    console.log(`🔒 Security checks every ${config.securityCheckInterval / 60000} minutes`);
    console.log('');

    this.isRunning = true;

    // Initial checks
    await this.performHealthCheck();
    await this.performQuotaCheck();
    await this.performSecurityCheck();

    // Set up recurring checks
    this.healthInterval = setInterval(() => this.performHealthCheck(), config.healthCheckInterval);
    this.quotaInterval = setInterval(() => this.performQuotaCheck(), config.quotaCheckInterval);
    this.securityInterval = setInterval(() => this.performSecurityCheck(), config.securityCheckInterval);

    console.log('✅ Monitoring bot started successfully');
    console.log('Press Ctrl+C to stop monitoring\n');

    // Handle graceful shutdown
    process.on('SIGINT', () => this.stop());
    process.on('SIGTERM', () => this.stop());
  }

  stop() {
    if (!this.isRunning) return;

    console.log('\n🛑 Stopping Supabase Monitor...');
    this.isRunning = false;

    if (this.healthInterval) clearInterval(this.healthInterval);
    if (this.quotaInterval) clearInterval(this.quotaInterval);
    if (this.securityInterval) clearInterval(this.securityInterval);

    console.log('✅ Monitor stopped');
    process.exit(0);
  }

  async performHealthCheck() {
    const startTime = Date.now();
    
    try {
      console.log('🔍 Performing health check...');
      
      const checks = await Promise.allSettled([
        this.checkDatabaseConnection(),
        this.checkTableAccess(),
        this.checkQueryPerformance(),
        this.checkAuthService()
      ]);

      const results = {
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        checks: {}
      };

      checks.forEach((check, index) => {
        const checkNames = ['database', 'tables', 'performance', 'auth'];
        results.checks[checkNames[index]] = {
          status: check.status === 'fulfilled' ? 'pass' : 'fail',
          data: check.status === 'fulfilled' ? check.value : check.reason?.message
        };
      });

      this.lastChecks.health = results;
      
      // Check for alerts
      if (results.duration > config.thresholds.responseTime) {
        await this.sendAlert('health', 'high_response_time', {
          duration: results.duration,
          threshold: config.thresholds.responseTime
        });
      }

      const failedChecks = Object.values(results.checks).filter(c => c.status === 'fail');
      if (failedChecks.length > 0) {
        await this.sendAlert('health', 'checks_failed', {
          failedCount: failedChecks.length,
          total: Object.keys(results.checks).length,
          failures: failedChecks
        });
      }

      console.log(`   ✅ Health check completed in ${results.duration}ms`);
      
    } catch (error) {
      console.error(`   ❌ Health check failed: ${error.message}`);
      await this.sendAlert('health', 'check_error', { error: error.message });
    }
  }

  async performQuotaCheck() {
    try {
      console.log('💾 Checking quota usage...');
      
      const quotaData = await this.getQuotaInformation();
      
      this.lastChecks.quota = {
        timestamp: new Date().toISOString(),
        data: quotaData
      };

      // Check storage quota
      if (quotaData.storage && quotaData.storage.usage > config.thresholds.storageThreshold) {
        await this.sendAlert('quota', 'storage_threshold', quotaData.storage);
      }

      // Check bandwidth quota
      if (quotaData.bandwidth && quotaData.bandwidth.usage > config.thresholds.bandwidthThreshold) {
        await this.sendAlert('quota', 'bandwidth_threshold', quotaData.bandwidth);
      }

      console.log(`   ✅ Quota check completed`);
      
    } catch (error) {
      console.error(`   ❌ Quota check failed: ${error.message}`);
      await this.sendAlert('quota', 'check_error', { error: error.message });
    }
  }

  async performSecurityCheck() {
    try {
      console.log('🔒 Performing security check...');
      
      const securityData = await this.getSecurityMetrics();
      
      this.lastChecks.security = {
        timestamp: new Date().toISOString(),
        data: securityData
      };

      // Check for suspicious activity
      if (securityData.authFailures > 10) {
        await this.sendAlert('security', 'high_auth_failures', securityData);
      }

      console.log(`   ✅ Security check completed`);
      
    } catch (error) {
      console.error(`   ❌ Security check failed: ${error.message}`);
      await this.sendAlert('security', 'check_error', { error: error.message });
    }
  }

  async checkDatabaseConnection() {
    const { data, error } = await supabase
      .from('quotes')
      .select('count', { count: 'exact', head: true });
    
    if (error) throw error;
    return { connected: true, count: data };
  }

  async checkTableAccess() {
    const tables = ['quotes', 'media_assets'];
    const results = {};

    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('id')
          .limit(1);
        
        results[table] = error ? 'error' : 'accessible';
      } catch (err) {
        results[table] = 'error';
      }
    }

    return results;
  }

  async checkQueryPerformance() {
    const start = Date.now();
    
    const { error } = await supabase
      .from('quotes')
      .select('id, text, author')
      .limit(10);
    
    const duration = Date.now() - start;
    
    if (error) throw error;
    
    return {
      queryTime: duration,
      status: duration < 1000 ? 'good' : 'slow'
    };
  }

  async checkAuthService() {
    try {
      // Check if auth service is responsive
      const { data, error } = await supabase.auth.getSession();
      return { 
        authServiceUp: true,
        hasSession: !!data.session 
      };
    } catch (error) {
      return { 
        authServiceUp: false, 
        error: error.message 
      };
    }
  }

  async getQuotaInformation() {
    // Note: In a real implementation, you would use Supabase Management API
    // For now, we'll simulate quota data or use available metrics
    
    try {
      // Get approximate database size
      const { data: tablesData } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

      return {
        storage: {
          usage: 0.3, // 30% - would be calculated from real metrics
          limit: '8GB',
          status: 'ok'
        },
        bandwidth: {
          usage: 0.15, // 15% - would be calculated from real metrics
          limit: '50GB',
          status: 'ok'
        },
        database: {
          tables: tablesData?.length || 0,
          status: 'ok'
        }
      };
    } catch (error) {
      return {
        error: 'Unable to fetch quota information',
        message: error.message
      };
    }
  }

  async getSecurityMetrics() {
    // In a real implementation, you would query auth logs
    // For now, we'll simulate security metrics
    
    return {
      authFailures: Math.floor(Math.random() * 5), // Simulated
      activeUsers: Math.floor(Math.random() * 50),
      suspiciousIPs: [],
      lastCheck: new Date().toISOString()
    };
  }

  async sendAlert(category, type, data) {
    const alert = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      category,
      type,
      data,
      severity: this.getAlertSeverity(category, type)
    };

    this.alertHistory.push(alert);

    // Log to console
    if (config.alerts.logToConsole) {
      console.log(`\n🚨 ALERT [${alert.severity.toUpperCase()}] - ${category}/${type}`);
      console.log(`   Time: ${alert.timestamp}`);
      console.log(`   Data:`, JSON.stringify(data, null, 2));
      console.log('');
    }

    // Save to file
    if (config.alerts.saveToFile) {
      await this.saveAlertToFile(alert);
    }

    // Send to webhook if configured
    if (config.alerts.webhookUrl) {
      await this.sendWebhookAlert(alert);
    }
  }

  getAlertSeverity(category, type) {
    const severityMap = {
      health: {
        high_response_time: 'warning',
        checks_failed: 'error',
        check_error: 'error'
      },
      quota: {
        storage_threshold: 'warning',
        bandwidth_threshold: 'warning',
        check_error: 'error'
      },
      security: {
        high_auth_failures: 'critical',
        check_error: 'error'
      }
    };

    return severityMap[category]?.[type] || 'info';
  }

  async saveAlertToFile(alert) {
    try {
      const alertsDir = path.join(__dirname, '..', 'logs');
      if (!fs.existsSync(alertsDir)) {
        fs.mkdirSync(alertsDir, { recursive: true });
      }

      const alertFile = path.join(alertsDir, 'supabase-alerts.json');
      let alerts = [];

      if (fs.existsSync(alertFile)) {
        const content = fs.readFileSync(alertFile, 'utf8');
        alerts = JSON.parse(content);
      }

      alerts.push(alert);

      // Keep only last 1000 alerts
      if (alerts.length > 1000) {
        alerts = alerts.slice(-1000);
      }

      fs.writeFileSync(alertFile, JSON.stringify(alerts, null, 2));
    } catch (error) {
      console.error('Failed to save alert to file:', error.message);
    }
  }

  async sendWebhookAlert(alert) {
    try {
      // This would send to a webhook URL if configured
      console.log(`📡 Would send webhook alert to: ${config.alerts.webhookUrl}`);
    } catch (error) {
      console.error('Failed to send webhook alert:', error.message);
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastChecks: this.lastChecks,
      alertCount: this.alertHistory.length,
      uptime: this.isRunning ? 'Running' : 'Stopped'
    };
  }
}

// CLI interface
async function main() {
  const command = process.argv[2] || 'start';
  const monitor = new SupabaseMonitor();

  switch (command) {
    case 'start':
      await monitor.start();
      break;
    
    case 'status':
      console.log('📊 Monitor Status:', JSON.stringify(monitor.getStatus(), null, 2));
      break;
    
    case 'test':
      console.log('🧪 Running test checks...');
      await monitor.performHealthCheck();
      await monitor.performQuotaCheck();
      await monitor.performSecurityCheck();
      console.log('✅ Test completed');
      break;
    
    default:
      console.log('Usage: node supabase_monitor.js [start|status|test]');
      console.log('  start  - Start continuous monitoring');
      console.log('  status - Show current status');
      console.log('  test   - Run one-time checks');
      process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Monitor failed:', error.message);
    process.exit(1);
  });
}

module.exports = { SupabaseMonitor, config };