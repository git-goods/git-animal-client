/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

export default nextConfig;
