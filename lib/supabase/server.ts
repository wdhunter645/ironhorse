import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => {
  // Check if required environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return a mock client for build time when env vars aren't available
    const mockResult = { data: [], error: { message: 'Environment variables not configured' } };
    
    const createChainableMock = () => {
      const chainable = {
        select: () => chainable,
        order: () => Promise.resolve(mockResult),
        eq: () => chainable,
        filter: () => chainable,
        range: () => chainable,
        then: (onResolve: any) => Promise.resolve(mockResult).then(onResolve)
      };
      return chainable;
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {
      from: () => createChainableMock(),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      }
    } as any;
  }
  
  return createServerComponentClient({ cookies });
}