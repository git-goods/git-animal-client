import type { Metadata } from 'next';
import { css } from '_panda/css';

import ClientProvider from '@/components/ClientProvider';

import './globals.css';

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
  // usePageTrack();
  return (
    <html lang="en">
      <body>
        <h1 className={css({ fontSize: '300px', color: 'red' })}>asdasd</h1>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
