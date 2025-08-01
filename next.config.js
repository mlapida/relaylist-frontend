/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async headers() {
    // Get API base URL from environment variable, fallback to default
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.relaylist.com';
    const apiDomain = new URL(apiBaseUrl).origin;
    
    return [
      {
        // Apply headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval for dev
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // Bootstrap CDN
              "img-src 'self' data: https:",
              "font-src 'self' https://cdn.jsdelivr.net",
              `connect-src 'self' ${apiDomain}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
