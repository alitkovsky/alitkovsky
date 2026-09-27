import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Static export served by Cloudflare Workers static assets (wrangler.jsonc).
// Security headers and CSP: public/_headers. Redirects: public/_redirects.
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // next/image only renders SVGs here, which were never optimized
  images: { unoptimized: true },
  reactStrictMode: true,
  // Capture browser source maps for Lighthouse diagnostics and better stack traces
  productionBrowserSourceMaps: true,
  // Allow cross-origin requests during development
  allowedDevOrigins: ['192.168.178.79'],
  turbopack: {},
};

export default withBundleAnalyzer(nextConfig);
