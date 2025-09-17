'use client'

export default function StandaloneInfo() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Standalone Website Mode</h1>
      
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        ✅ Website is running in standalone mode with no external database connections.
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Static Content Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Lou Gehrig quotes served from static data</li>
          <li>Collectibles information from local content</li>
          <li>No external service dependencies</li>
          <li>Fast loading and reliable performance</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600">
        <p>This website operates independently without requiring:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Database connections</li>
          <li>External API calls</li>
          <li>Third-party service authentication</li>
          <li>Network connectivity for core functionality</li>
        </ul>
      </div>
    </div>
  )
}