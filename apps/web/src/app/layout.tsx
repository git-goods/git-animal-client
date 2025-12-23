import type { Metadata, Viewport } from 'next';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';

import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/apis/interceptor';

import './globals.css'; // 글로벌 CSS (PandaCSS와 Tailwind 모두 포함)
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
    apple: [{ url: '/app-icon.png' }],
    shortcut: ['/app-icon.png'],
    other: [
      {
        rel: 'apple-touch-startup-image',
        url: '/app-icon.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
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
