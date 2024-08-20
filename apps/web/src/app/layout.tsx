import type { Metadata } from 'next';

import ClientProvider from '@/components/ClientProvider';
import FeedBack from '@/components/Feedback/FeedBack';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const session = await auth();

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
