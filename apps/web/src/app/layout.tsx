import type { Metadata } from 'next';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';

import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/apis/interceptor';

import '@gitanimals/asset-font/product-sans/index.css';
import 'driver.js/dist/driver.css';
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

setRequestInterceptor(interceptorRequestFulfilled);
setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
