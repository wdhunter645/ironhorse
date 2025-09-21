import { NextRequest, NextResponse } from 'next/server';

/**
 * Supabase Webhook Endpoint for Database Events
 * 
 * Receives webhooks from Supabase for real-time monitoring
 * Supports database events, auth events, and custom alerts
 */

interface SupabaseWebhookPayload {
  type: string;
  table?: string;
  record?: Record<string, unknown>;
  old_record?: Record<string, unknown>;
  schema?: string;
  timestamp?: string;
}

interface AlertEvent {
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'database' | 'auth' | 'storage' | 'api';
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Store recent alerts in memory (in production, use a database)
const recentAlerts: AlertEvent[] = [];
const MAX_STORED_ALERTS = 100;

function logAlert(alert: AlertEvent) {
  console.log(`🚨 SUPABASE ALERT [${alert.severity.toUpperCase()}] - ${alert.category}`);
  console.log(`   Message: ${alert.message}`);
  console.log(`   Time: ${alert.timestamp}`);
  if (alert.metadata) {
    console.log(`   Metadata:`, JSON.stringify(alert.metadata, null, 2));
  }
  console.log('');

  // Store alert
  recentAlerts.unshift(alert);
  if (recentAlerts.length > MAX_STORED_ALERTS) {
    recentAlerts.splice(MAX_STORED_ALERTS);
  }
}

function processWebhookPayload(payload: SupabaseWebhookPayload): AlertEvent | null {
  const timestamp = new Date().toISOString();

  switch (payload.type) {
    case 'INSERT':
      return {
        severity: 'info',
        category: 'database',
        message: `New record inserted in ${payload.table}`,
        timestamp,
        metadata: {
          table: payload.table,
          record_id: payload.record?.id,
          schema: payload.schema
        }
      };

    case 'UPDATE':
      return {
        severity: 'info',
        category: 'database',
        message: `Record updated in ${payload.table}`,
        timestamp,
        metadata: {
          table: payload.table,
          record_id: payload.record?.id,
          schema: payload.schema
        }
      };

    case 'DELETE':
      return {
        severity: 'warning',
        category: 'database',
        message: `Record deleted from ${payload.table}`,
        timestamp,
        metadata: {
          table: payload.table,
          record_id: payload.old_record?.id,
          schema: payload.schema
        }
      };

    case 'auth.failed':
      return {
        severity: 'warning',
        category: 'auth',
        message: 'Authentication attempt failed',
        timestamp,
        metadata: payload.record
      };

    case 'auth.signup':
      return {
        severity: 'info',
        category: 'auth',
        message: 'New user signup',
        timestamp,
        metadata: {
          user_id: payload.record?.id,
          email: payload.record?.email
        }
      };

    case 'database.connection_limit':
      return {
        severity: 'critical',
        category: 'database',
        message: 'Database connection limit reached',
        timestamp,
        metadata: payload.record
      };

    case 'storage.quota_warning':
      return {
        severity: 'warning',
        category: 'storage',
        message: 'Storage quota threshold exceeded',
        timestamp,
        metadata: payload.record
      };

    default:
      return {
        severity: 'info',
        category: 'database',
        message: `Webhook event: ${payload.type}`,
        timestamp,
        metadata: { ...payload }
      };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook signature (in production)
    const signature = request.headers.get('x-supabase-signature');
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      // In production, verify the signature here
      // const isValid = verifyWebhookSignature(body, signature, webhookSecret);
      // if (!isValid) {
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // }
    }

    const payload: SupabaseWebhookPayload = await request.json();
    
    // Process the webhook payload
    const alert = processWebhookPayload(payload);
    
    if (alert) {
      logAlert(alert);
    }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      alert_logged: !!alert
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    const errorAlert: AlertEvent = {
      severity: 'error',
      category: 'api',
      message: 'Failed to process webhook',
      timestamp: new Date().toISOString(),
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    };
    
    logAlert(errorAlert);

    return NextResponse.json(
      { error: 'Failed to process webhook' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const severity = searchParams.get('severity');
  const category = searchParams.get('category');

  let filteredAlerts = recentAlerts;

  if (severity) {
    filteredAlerts = filteredAlerts.filter(alert => alert.severity === severity);
  }

  if (category) {
    filteredAlerts = filteredAlerts.filter(alert => alert.category === category);
  }

  const alerts = filteredAlerts.slice(0, limit);

  return NextResponse.json({
    alerts,
    total: recentAlerts.length,
    filtered: filteredAlerts.length,
    summary: {
      critical: recentAlerts.filter(a => a.severity === 'critical').length,
      error: recentAlerts.filter(a => a.severity === 'error').length,
      warning: recentAlerts.filter(a => a.severity === 'warning').length,
      info: recentAlerts.filter(a => a.severity === 'info').length
    }
  });
}