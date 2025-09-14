/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow builds to complete even with type errors during development
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig