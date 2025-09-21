'use client';

import { useEffect } from 'react';
import { initDatadogRum } from '@/lib/datadog-rum';

export function DatadogRumProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Datadog RUM only on the client side
    initDatadogRum();
  }, []);

  return <>{children}</>;
}