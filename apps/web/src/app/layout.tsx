import type { Metadata } from 'next';
import { setInstanceToken } from '@gitanimals/api';

import { auth } from '@/auth';
import ClientProvider from '@/components/ClientProvider';

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
// const secret = process.env.NEXTAUTH_SECRET;

// const setToken = async () => {
//   const session = await auth();
//   console.log('session: ', session);
//   setRequestInterceptor({
//     onFulfilled: (config) => {
//       if (token) {
//         config.headers['Authorization'] = token;
//       }
//       console.log('config: ', config.headers);
//       return config;
//     },
//     onRejected: (error) => {
//       return Promise.reject(error);
//     },
//   });
// };
// setToken();

const setToken = async () => {
  const session = await auth();

  const accessToken = session?.user.accessToken;
  setInstanceToken(`Bearer ${accessToken}`);
};

setToken();

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const data = await axios.get('http://localhost:3000/api/auth/jwt');
  // console.log('data: ', data);

  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
