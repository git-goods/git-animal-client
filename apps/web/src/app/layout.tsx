import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import ClientProvider from '@/components/ClientProvider';
import FeedBack from '@/components/FeedBack/FeedBack';

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
const isProd = process.env.NODE_ENV === 'production';

const MONITORING_KEY = {
  GA: isProd ? 'G-RNEDVMFT5X' : 'G-N45935GS2S',
  GTM: 'GTM-T6DQHP7X',
  JENNIFER: isProd ? 'e9e023ee' : '000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
          <GoogleAnalytics gaId={MONITORING_KEY.GA} />
          <FeedBack />
        </ClientProvider>
      </body>
    </html>
  );
}
