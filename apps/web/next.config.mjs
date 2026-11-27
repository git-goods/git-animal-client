import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';
import NextPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' || process.env.DISABLE_PWA === 'true',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  transpilePackages: ['@gitanimals/ui-tailwind'],
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

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(withPWA(nextConfig));
