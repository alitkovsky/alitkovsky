import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const immutableCacheHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const shortCacheHeaders = [
  { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
];

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://assets.calendly.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.clarity.ms https://calendly.com https://api.calendly.com",
      "frame-src 'self' https://calendly.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  // Allow cross-origin requests during development
  allowedDevOrigins: ['192.168.178.79'],
  turbopack: {},
  // Business card QR code redirect
  async redirects() {
    return [
      {
        source: '/bc',
        destination: '/?utm_source=visitenkarte&utm_medium=qr&utm_campaign=andrii_brand',
        permanent: false, // 302 redirect for flexibility
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/favicon.ico',
        headers: immutableCacheHeaders,
      },
      {
        source: '/icon.svg',
        headers: immutableCacheHeaders,
      },
      {
        source: '/icon-light.svg',
        headers: immutableCacheHeaders,
      },
      {
        source: '/icon-dark.svg',
        headers: immutableCacheHeaders,
      },
      {
        source: '/icon-mask.png',
        headers: immutableCacheHeaders,
      },
      {
        source: '/icon-:size(16|32|48|192|512).png',
        headers: immutableCacheHeaders,
      },
      {
        source: '/apple-touch-icon.png',
        headers: immutableCacheHeaders,
      },
      {
        source: '/manifest.webmanifest',
        headers: shortCacheHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
