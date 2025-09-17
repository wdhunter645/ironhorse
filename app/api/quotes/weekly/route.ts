import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch quotes from Supabase Cloud
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching quotes:', error)
      // Fallback to hardcoded quotes if database query fails
      const fallbackQuotes = [
        'Today I consider myself the luckiest man on the face of the Earth.',
        'There is no room in baseball for discrimination. It is our national pastime and a game for all.',
        'I might have been given a bad break, but I\'ve got an awful lot to live for.'
      ]
      const i = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % fallbackQuotes.length
      return NextResponse.json({ quote: fallbackQuotes[i], source: 'fallback' })
    }

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ 
        quote: 'Today I consider myself the luckiest man on the face of the Earth.',
        source: 'default'
      })
    }

    // Select quote based on week number for consistency
    const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % quotes.length
    const selectedQuote = quotes[weekIndex]

    return NextResponse.json({ 
      quote: selectedQuote.text, 
      author: selectedQuote.author,
      source: 'supabase'
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ 
      quote: 'Today I consider myself the luckiest man on the face of the Earth.',
      source: 'error_fallback'
    })
  }
}