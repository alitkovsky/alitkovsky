import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow cross-origin requests during development
  allowedDevOrigins: ['192.168.178.79'],
  // You can add other config here as needed
};

const isDev = process.env.NODE_ENV === "development";

export default nextPwa({
  dest: "public",
  disable: isDev, // disables service worker during dev
  register: true,
  skipWaiting: true,
})(nextConfig);