import { NextResponse } from 'next/server'

export async function GET() {
  // Static quotes - no external database connections
  const quotes = [
    {
      text: 'Today I consider myself the luckiest man on the face of the Earth.',
      author: 'Lou Gehrig'
    },
    {
      text: 'There is no room in baseball for discrimination. It is our national pastime and a game for all.',
      author: 'Lou Gehrig'
    },
    {
      text: 'I might have been given a bad break, but I\'ve got an awful lot to live for.',
      author: 'Lou Gehrig'
    },
    {
      text: 'The ballplayer who loses his head, who can\'t keep his cool, is worse than no ballplayer at all.',
      author: 'Lou Gehrig'
    },
    {
      text: 'I never got a chance to be a kid.',
      author: 'Lou Gehrig'
    }
  ]

  // Select quote based on week number for consistency
  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % quotes.length
  const selectedQuote = quotes[weekIndex]

  return NextResponse.json({ 
    quote: selectedQuote.text, 
    author: selectedQuote.author,
    source: 'static'
  })
}