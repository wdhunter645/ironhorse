import tracer from 'dd-trace';

let isInitialized = false;

export function initDatadog() {
  // Prevent double initialization
  if (isInitialized) {
    return;
  }

  // Check if required environment variables are set
  const datadogApiKey = process.env.DD_API_KEY || process.env.DATADOG_API_KEY;
  const serviceName = process.env.DD_SERVICE || process.env.DATADOG_SERVICE_NAME || 'ironhorse';
  const environment = process.env.DD_ENV || process.env.NODE_ENV || 'development';
  const version = process.env.DD_VERSION || process.env.DATADOG_VERSION || '1.0.0';

  if (!datadogApiKey) {
    console.warn('⚠️  Datadog API key not found. Set DD_API_KEY or DATADOG_API_KEY environment variable.');
    return;
  }

  try {
    // Initialize the Datadog tracer
    tracer.init({
      service: serviceName,
      env: environment,
      version: version,
      
      // APM configuration
      profiling: true,
      runtimeMetrics: true,
      
      // Log injection for correlation
      logInjection: true,
      
      // Performance optimization
      startupLogs: true,
      
      // Tags for better filtering
      tags: {
        'app.name': 'ironhorse',
        'app.type': 'web-application',
        'framework': 'nextjs',
      },

      // Sampling configuration for cost optimization
      sampleRate: process.env.DD_TRACE_SAMPLE_RATE ? parseFloat(process.env.DD_TRACE_SAMPLE_RATE) : 1.0,
    });

    isInitialized = true;
    console.log('✅ Datadog APM initialized successfully', {
      service: serviceName,
      env: environment,
      version: version,
    });

  } catch (error) {
    console.error('❌ Failed to initialize Datadog APM:', error);
  }
}

// Export tracer for manual instrumentation if needed
export { tracer };