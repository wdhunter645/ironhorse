import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  // Static response - no database connections in standalone mode
  const results = {
    timestamp: new Date().toISOString(),
    status: 'standalone',
    mode: 'static',
    overall: { 
      healthy: true, 
      message: 'Standalone website mode - no external database connections' 
    }
  }

  return NextResponse.json(results, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  })
}