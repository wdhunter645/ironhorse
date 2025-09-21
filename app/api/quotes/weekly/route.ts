import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// Conditionally import tracer only on server side
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tracer: any = null;
if (typeof window === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    tracer = require('@/lib/datadog').tracer;
  } catch (error) {
    console.warn('Datadog tracer not available:', error);
  }
}

const QUOTES = [
  'Today I consider myself the luckiest man on the face of the Earth.',
  'There is no room in baseball for discrimination. It is our national pastime and a game for all.',
  'I might have been given a bad break, but I\'ve got an awful lot to live for.'
];

export async function GET() {
  // Create a custom span for this operation if tracer is available
  if (tracer) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tracer.trace('quotes.weekly.get', async (span: any) => {
      return handleRequest(span);
    });
  } else {
    return handleRequest();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleRequest(span?: any) {
  try {
    // Add custom tags to the span if available
    if (span) {
      span.setTag('operation', 'get_weekly_quote');
      span.setTag('quotes.total', QUOTES.length);
    }
    
    // Calculate the weekly quote index based on the current week
    const weeksSinceEpoch = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const quoteIndex = weeksSinceEpoch % QUOTES.length;
    
    if (span) {
      span.setTag('quotes.index', quoteIndex);
      span.setTag('quotes.week', weeksSinceEpoch);
    }
    
    const selectedQuote = QUOTES[quoteIndex];
    
    // Log the operation using our custom logger
    logger.info('Weekly quote requested', { 
      quoteIndex, 
      week: weeksSinceEpoch,
      quoteLength: selectedQuote.length 
    });
    
    const response = {
      quote: selectedQuote,
      week: weeksSinceEpoch,
      index: quoteIndex
    };
    
    if (span) {
      span.setTag('response.quote_length', selectedQuote.length);
    }
    
    return NextResponse.json(response);
    
  } catch (error) {
    // Track errors in Datadog if available
    if (span) {
      span.setTag('error', true);
      span.setTag('error.message', error instanceof Error ? error.message : 'Unknown error');
    }
    
    logger.error('Error fetching weekly quote', error instanceof Error ? error : undefined, {
      operation: 'get_weekly_quote'
    });
    
    return NextResponse.json(
      { error: 'Failed to fetch weekly quote' }, 
      { status: 500 }
    );
  }
}