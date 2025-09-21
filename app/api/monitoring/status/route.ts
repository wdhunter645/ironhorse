import { NextRequest, NextResponse } from 'next/server';

/**
 * Monitoring Status API
 * 
 * Provides monitoring status, health checks, and alert summaries
 */

interface MonitoringStatus {
  timestamp: string;
  status: 'healthy' | 'warning' | 'error';
  services: {
    database: ServiceStatus;
    auth: ServiceStatus;
    storage: ServiceStatus;
    api: ServiceStatus;
  };
  alerts: {
    critical: number;
    error: number;
    warning: number;
    info: number;
  };
  uptime: {
    database: number;
    overall: number;
  };
}

interface ServiceStatus {
  status: 'up' | 'down' | 'degraded';
  responseTime?: number;
  lastCheck: string;
  errorRate?: number;
}

// Simulated monitoring data (in production, this would come from real monitoring)
function getMonitoringStatus(): MonitoringStatus {
  const now = new Date().toISOString();
  
  return {
    timestamp: now,
    status: 'healthy',
    services: {
      database: {
        status: 'up',
        responseTime: 45,
        lastCheck: now,
        errorRate: 0.001
      },
      auth: {
        status: 'up',
        responseTime: 120,
        lastCheck: now,
        errorRate: 0.002
      },
      storage: {
        status: 'up',
        responseTime: 80,
        lastCheck: now,
        errorRate: 0.0
      },
      api: {
        status: 'up',
        responseTime: 95,
        lastCheck: now,
        errorRate: 0.003
      }
    },
    alerts: {
      critical: 0,
      error: 0,
      warning: 1,
      info: 3
    },
    uptime: {
      database: 99.8,
      overall: 99.9
    }
  };
}

export async function GET(_request: NextRequest) {
  try {
    const status = getMonitoringStatus();
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('Failed to get monitoring status:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve monitoring status',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}