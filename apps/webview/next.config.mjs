// import withBundleAnalyzer from '@next/bundle-analyzer';
// withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
import NextPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' || process.env.DISABLE_PWA === 'true',
  register: true,
  skipWaiting: true,
});

const nextConfig = withNextIntl({
  transpilePackages: ['@gitanimals/ui-panda'],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.gitanimals.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
});

export default withPWA(nextConfig);
// export default withBundleAnalyzer(nextConfig);
