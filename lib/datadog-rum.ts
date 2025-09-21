'use client';

import { datadogRum } from '@datadog/browser-rum';

let isRumInitialized = false;

export function initDatadogRum() {
  // Prevent double initialization
  if (isRumInitialized || typeof window === 'undefined') {
    return;
  }

  const applicationId = process.env.NEXT_PUBLIC_DD_APPLICATION_ID || process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
  const clientToken = process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN || process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
  const site = process.env.NEXT_PUBLIC_DD_SITE || process.env.NEXT_PUBLIC_DATADOG_SITE || 'datadoghq.com';
  const environment = process.env.NEXT_PUBLIC_DD_ENV || process.env.NODE_ENV || 'development';
  const version = process.env.NEXT_PUBLIC_DD_VERSION || process.env.NEXT_PUBLIC_DATADOG_VERSION || '1.0.0';
  const serviceName = process.env.NEXT_PUBLIC_DD_SERVICE || process.env.NEXT_PUBLIC_DATADOG_SERVICE_NAME || 'ironhorse';

  if (!applicationId || !clientToken) {
    console.warn('⚠️  Datadog RUM not initialized: Missing application ID or client token');
    console.warn('Set NEXT_PUBLIC_DD_APPLICATION_ID and NEXT_PUBLIC_DD_CLIENT_TOKEN environment variables');
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rumConfig: any = {
      applicationId: applicationId,
      clientToken: clientToken,
      service: serviceName,
      env: environment,
      version: version,
      
      // Performance monitoring
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackViewsManually: false,
      trackResources: true,
      trackLongTasks: true,
      
      // Default privacy settings
      defaultPrivacyLevel: 'mask-user-input',
      
      // Custom configuration
      allowedTracingUrls: [
        // Add your API endpoints here
        { match: /^https?:\/\/.*\/api\/.*/, propagatorTypes: ['datadog'] },
      ],
    };

    // Only set site if it's not the default
    if (site !== 'datadoghq.com') {
      rumConfig.site = site;
    }

    datadogRum.init(rumConfig);

    // Set global context after initialization
    datadogRum.setGlobalContextProperty('app.name', 'ironhorse');
    datadogRum.setGlobalContextProperty('app.type', 'web-application');
    datadogRum.setGlobalContextProperty('framework', 'nextjs');

    isRumInitialized = true;
    console.log('✅ Datadog RUM initialized successfully', {
      service: serviceName,
      env: environment,
      version: version,
    });

  } catch (error) {
    console.error('❌ Failed to initialize Datadog RUM:', error);
  }
}

// Custom action tracking helpers
export function trackCustomAction(name: string, context?: Record<string, string | number | boolean>) {
  if (isRumInitialized) {
    datadogRum.addAction(name, context);
  }
}

export function trackCustomError(error: Error, context?: Record<string, string | number | boolean>) {
  if (isRumInitialized) {
    datadogRum.addError(error, context);
  }
}

export function addUserContext(user: Record<string, string | number | boolean>) {
  if (isRumInitialized) {
    datadogRum.setUser(user);
  }
}

export function addGlobalContext(key: string, value: string | number | boolean | null) {
  if (isRumInitialized) {
    datadogRum.setGlobalContextProperty(key, value);
  }
}