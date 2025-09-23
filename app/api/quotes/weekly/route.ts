import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = createClient();
    const url = new URL(request.url);
    const week = url.searchParams.get('week');

    let query = supabase
      .from('quotes')
      .select('text, quote_text, source, attribution, week')
      .order('created_at', { ascending: false });

    if (week) {
      // Filter by specific week if provided
      query = query.eq('week', week);
    } else {
      // Get recent quotes (last 5)
      query = query.limit(5);
    }

    const { data: quotes, error } = await query;

    if (error) {
      console.error('Quotes query error:', error);
      // Fall back to empty array on error
      return Response.json({ 
        week: week || new Date().toISOString().split('T')[0],
        quotes: [] 
      });
    }

    // Map and normalize column names (support both text/quote_text and source/attribution)
    const normalizedQuotes = (quotes || []).map(quote => ({
      text: quote.text || quote.quote_text || '',
      source: quote.source || quote.attribution || ''
    })).filter(quote => quote.text); // Filter out empty quotes

    return Response.json({
      week: week || new Date().toISOString().split('T')[0],
      quotes: normalizedQuotes
    });

  } catch (error) {
    console.error('Quotes API error:', error);
    
    // Resilient fallback - return empty result instead of failing
    return Response.json({ 
      week: new Date().toISOString().split('T')[0],
      quotes: [] 
    });
  }
}
