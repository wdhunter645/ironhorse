// This file is automatically loaded by Next.js when the app starts
// It's used to initialize tracing and other instrumentation

export async function register() {
  // Only initialize Datadog on the server side and in production
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    try {
      const tracer = await import('./lib/datadog');
      tracer.initDatadog();
    } catch (error) {
      console.warn('Failed to initialize Datadog:', error);
    }
  }
}