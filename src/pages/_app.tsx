import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';

import '@/styles/globals.css';
import QueryClientProvider from '@/apis/QueryClientProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <LazyMotion features={domAnimation}>
        <Component {...pageProps} />
      </LazyMotion>
    </QueryClientProvider>
  );
}
