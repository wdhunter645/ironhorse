'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Quote {
  id: string
  text: string
  author: string
  created_at: string
}

interface MediaAsset {
  id: string
  filename: string
  url: string
  status: string
  created_at: string
}

export default function SupabaseTest() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        setLoading(true)
        setError(null)

        // Test quotes table
        const { data: quotesData, error: quotesError } = await supabase
          .from('quotes')
          .select('*')
          .order('created_at', { ascending: true })

        if (quotesError) {
          throw new Error(`Quotes error: ${quotesError.message}`)
        }

        // Test media_assets table
        const { data: mediaData, error: mediaError } = await supabase
          .from('media_assets')
          .select('*')
          .order('created_at', { ascending: true })

        if (mediaError) {
          throw new Error(`Media error: ${mediaError.message}`)
        }

        setQuotes(quotesData || [])
        setMediaAssets(mediaData || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Supabase Cloud Connectivity Test</h1>
        <p>Testing connection to Supabase Cloud...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Supabase Cloud Connectivity Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Connection Error:</strong> {error}
        </div>
        <p>Please check your environment variables and ensure your Supabase project is properly configured.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Supabase Cloud Connectivity Test</h1>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        ✅ Successfully connected to Supabase Cloud!
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Quotes Table ({quotes.length} records)</h2>
        {quotes.length > 0 ? (
          <div className="space-y-2">
            {quotes.map((quote) => (
              <div key={quote.id} className="border p-3 rounded">
                <p className="italic">&ldquo;{quote.text}&rdquo;</p>
                <p className="text-sm text-gray-600 mt-1">— {quote.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quotes found. Run the database seed script to add sample data.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Media Assets Table ({mediaAssets.length} records)</h2>
        {mediaAssets.length > 0 ? (
          <div className="space-y-2">
            {mediaAssets.map((asset) => (
              <div key={asset.id} className="border p-3 rounded">
                <p><strong>Filename:</strong> {asset.filename}</p>
                <p><strong>URL:</strong> {asset.url}</p>
                <p><strong>Status:</strong> {asset.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No media assets found. Run the database seed script to add sample data.</p>
        )}
      </div>

      <div className="text-sm text-gray-600">
        <p>This test page verifies that:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Supabase Cloud client is properly configured</li>
          <li>Environment variables are correctly set</li>
          <li>Database tables exist and are accessible</li>
          <li>Row Level Security policies allow read access</li>
        </ul>
      </div>
    </div>
  )
}