/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['static.gitanimals.org'],
  },
};

export default nextConfig;
