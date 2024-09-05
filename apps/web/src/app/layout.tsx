import type { Metadata } from 'next';
import { setInstanceToken } from '@gitanimals/api';

import { setAPIInstantToken } from '@/apis';
import { getServerAuth } from '@/auth';

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
  const setToken = async () => {
    if (typeof window === 'undefined') {
      const session = await getServerAuth();

      const accessToken = session?.user.accessToken;
      setInstanceToken(`Bearer ${accessToken}`);
      setAPIInstantToken(`Bearer ${accessToken}`);
    }
  };

  setToken();

  return (
    <html lang="en">
      <body>
        {children}

        {/* <GoogleTagManager gtmId={MONITORING_KEY.GTM} />
        <ClientProvider>
          {children}

          <NoticeToast />
        </ClientProvider>
        <GoogleAnalytics gaId={MONITORING_KEY.GA} /> */}
      </body>
    </html>
  );
}
