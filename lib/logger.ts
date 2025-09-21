// Custom logger with Datadog integration
// Conditionally import tracer only on server side
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tracer: any = null;
if (typeof window === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    tracer = require('./datadog').tracer;
  } catch {
    // Tracer not available, will work without it
  }
}

export interface LogContext {
  [key: string]: string | number | boolean | null | undefined;
}

export interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: LogContext;
  error?: Error;
}

class DatadogLogger {
  private formatLogEntry(entry: LogEntry): string {
    const timestamp = new Date().toISOString();
    const { level, message, context, error } = entry;
    
    // Get the current trace and span IDs for correlation if tracer is available
    let traceId = null;
    let spanId = null;
    
    if (tracer) {
      try {
        const span = tracer.scope().active();
        traceId = span?.context().toTraceId();
        spanId = span?.context().toSpanId();
      } catch {
        // Ignore tracer errors
      }
    }
    
    const logData = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(context && { context }),
      ...(error && { 
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      }),
      ...(traceId && { dd: { trace_id: traceId, span_id: spanId } }),
      service: process.env.DD_SERVICE || 'ironhorse',
      env: process.env.DD_ENV || process.env.NODE_ENV || 'development',
    };
    
    return JSON.stringify(logData);
  }

  info(message: string, context?: LogContext) {
    const logEntry = this.formatLogEntry({ level: 'info', message, context });
    console.log(logEntry);
  }

  warn(message: string, context?: LogContext) {
    const logEntry = this.formatLogEntry({ level: 'warn', message, context });
    console.warn(logEntry);
  }

  error(message: string, error?: Error, context?: LogContext) {
    const logEntry = this.formatLogEntry({ level: 'error', message, error, context });
    console.error(logEntry);
    
    // Also send error to current span if available
    if (tracer) {
      try {
        const span = tracer.scope().active();
        if (span && error) {
          span.setTag('error', true);
          span.setTag('error.message', error.message);
          span.setTag('error.type', error.name);
        }
      } catch {
        // Ignore tracer errors
      }
    }
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
      const logEntry = this.formatLogEntry({ level: 'debug', message, context });
      console.debug(logEntry);
    }
  }
}

// Export a singleton instance
export const logger = new DatadogLogger();

// Export for named imports
export { DatadogLogger };