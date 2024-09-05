// import withBundleAnalyzer from '@next/bundle-analyzer';
// withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = withNextIntl({
  transpilePackages: ['@gitanimals/ui-panda'],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.gitanimals.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
});

export default nextConfig;
// export default withBundleAnalyzer(nextConfig);
