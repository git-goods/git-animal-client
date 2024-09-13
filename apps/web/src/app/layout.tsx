import type { Metadata } from 'next';
import { setRequestInterceptor } from '@gitanimals/api';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { interceptorRequestFulfilled } from '@/apis/interceptor';
import ClientProvider from '@/components/ClientProvider';
import Monitoring from '@/components/Monitoring';
import { MONITORING_KEY } from '@/constants/monitoring';

import './globals.css';
import '@gitanimals/asset-font/product-sans/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gitanimals.org/'),
  title: 'GitAnimals',
  description: '깃허브 활동으로 펫을 키우세요!',
  authors: [
    {
      name: 'sumi-0011',
      url: 'https://github.com/sumi-0011',
    },
    {
      url: 'https://github.com/hyesungoh',
      name: 'hyesungoh',
    },
  ],
  generator: 'GitAnimals',
  openGraph: {
    type: 'website',
    url: 'https://www.gitanimals.org/',
    images: [
      {
        url: '/og-image.png',
      },
    ],
    title: 'GitAnimals',
    description: '깃허브 활동으로 펫을 키우세요!',
    siteName: 'GitAnimals',
  },
};

setRequestInterceptor(interceptorRequestFulfilled);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleTagManager gtmId={MONITORING_KEY.GTM} />
        <Monitoring />
        <ClientProvider>{children}</ClientProvider>
        <GoogleAnalytics gaId={MONITORING_KEY.GA} />
      </body>
    </html>
  );
}
