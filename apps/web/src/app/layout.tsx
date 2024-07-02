import type { Metadata } from 'next';

import ClientProvider from '@/components/ClientProvider';
import FeedBack from '@/components/FeedBack/FeedBack';

import './globals.css';
import '@gitanimals/asset-fonts/product-sans/index.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
          <FeedBack />
        </ClientProvider>
      </body>
    </html>
  );
}
