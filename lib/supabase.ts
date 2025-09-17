// Standalone website - no external database connections
// This is a placeholder to maintain compatibility with existing code

export const supabase = {
  from: () => ({
    select: () => ({
      order: () => ({
        then: () => Promise.resolve({ data: [], error: { message: 'No database configured - standalone mode' } })
      })
    }),
    limit: () => ({
      then: () => Promise.resolve({ data: [], error: { message: 'No database configured - standalone mode' } })
    })
  })
}