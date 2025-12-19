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
