/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow builds to complete even with type errors during development
    ignoreBuildErrors: false,
  },
  
  // Environment variables validation
  env: {
    // These will be available at build time
    DD_SERVICE: process.env.DD_SERVICE || 'ironhorse',
    DD_ENV: process.env.DD_ENV || process.env.NODE_ENV || 'development',
    DD_VERSION: process.env.DD_VERSION || '1.0.0',
  },
}

module.exports = nextConfig