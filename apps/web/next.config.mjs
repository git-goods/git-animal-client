// import withBundleAnalyzer from '@next/bundle-analyzer';
// withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
// export default withBundleAnalyzer(nextConfig);
