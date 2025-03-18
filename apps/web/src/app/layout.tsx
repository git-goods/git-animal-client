import type { Metadata, Viewport } from 'next';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';

import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/apis/interceptor';

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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GitAnimals',
  },
  icons: {
    apple: [{ url: '/icons/apple-touch-icon.png' }],
    shortcut: ['/icons/favicon.ico'],
    other: [
      {
        rel: 'apple-touch-startup-image',
        url: '/splash.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

setRequestInterceptor(interceptorRequestFulfilled);
setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
setRenderRequestInterceptor(interceptorRequestFulfilled);
setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
