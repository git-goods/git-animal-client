import type { Metadata } from 'next';

import QueryClientProvider from '@/apis/QueryClientProvider';
import Monitoring from '@/components/Monitoring';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyle from '@/styles/GlobalStyle';

export const metadata: Metadata = {
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
        <QueryClientProvider>
          <StyledComponentsRegistry>
            <Monitoring />
            <GlobalStyle />
            {children}
            {/* <ThemeProvider theme={theme}>
              </ThemeProvider> */}
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
