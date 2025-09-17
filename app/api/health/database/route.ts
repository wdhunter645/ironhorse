import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(_request: NextRequest) {
  try {
    // Test database connectivity and schema
    const results = {
      timestamp: new Date().toISOString(),
      status: 'checking',
      tables: {
        quotes: { accessible: false, count: 0, error: null as string | null },
        media_assets: { accessible: false, count: 0, error: null as string | null }
      },
      overall: { healthy: false, message: '' }
    }

    // Test quotes table
    try {
      const { error: quotesError, count: quotesCount } = await supabase
        .from('quotes')
        .select('id', { count: 'exact' })
        .limit(1)

      if (quotesError) {
        results.tables.quotes.error = quotesError.message
      } else {
        results.tables.quotes.accessible = true
        results.tables.quotes.count = quotesCount || 0
      }
    } catch (error) {
      results.tables.quotes.error = error instanceof Error ? error.message : 'Unknown error'
    }

    // Test media_assets table
    try {
      const { error: mediaError, count: mediaCount } = await supabase
        .from('media_assets')
        .select('id', { count: 'exact' })
        .limit(1)

      if (mediaError) {
        results.tables.media_assets.error = mediaError.message
      } else {
        results.tables.media_assets.accessible = true
        results.tables.media_assets.count = mediaCount || 0
      }
    } catch (error) {
      results.tables.media_assets.error = error instanceof Error ? error.message : 'Unknown error'
    }

    // Determine overall health
    const quotesHealthy = results.tables.quotes.accessible
    const mediaHealthy = results.tables.media_assets.accessible
    
    if (quotesHealthy && mediaHealthy) {
      results.status = 'healthy'
      results.overall.healthy = true
      results.overall.message = 'All database tables are accessible and properly configured'
    } else if (quotesHealthy || mediaHealthy) {
      results.status = 'partial'
      results.overall.healthy = false
      results.overall.message = 'Some database tables are not accessible'
    } else {
      results.status = 'unhealthy'
      results.overall.healthy = false
      results.overall.message = 'Database tables are not accessible - schema may not be applied'
    }

    // Return appropriate HTTP status code
    const httpStatus = results.overall.healthy ? 200 : 503

    return NextResponse.json(results, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Database health check failed:', error)
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      status: 'error',
      overall: { 
        healthy: false, 
        message: error instanceof Error ? error.message : 'Health check failed'
      },
      tables: {
        quotes: { accessible: false, count: 0, error: 'Health check failed' },
        media_assets: { accessible: false, count: 0, error: 'Health check failed' }
      }
    }, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  }
}