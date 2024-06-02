import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import { useGetUser } from '@/apis/user/useGetUser';
import LoadingProvider from '@/components/Loading/LoadingProvider';
import MetaHead from '@/components/MetaHead';
import Monitoring from '@/components/Monitoring';
import { SnackBarProvider } from '@/components/SnackBar/SnackBarProvider';
import usePageTrack from '@/hooks/event/usePageTrack';
import { useSetUserData, useUser } from '@/store/user';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  usePageTrack();

  return (
    <QueryClientProvider>
      <Monitoring />
      <MetaHead />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <UserProvider />
          <SnackBarProvider />
          <LoadingProvider />
          <Component {...pageProps} />
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function UserProvider() {
  const { data } = useGetUser();
  const user = useUser();
  const { setUserData } = useSetUserData();

  useEffect(() => {
    if (!data) return;
    if (!user.isLogin) return;

    const { id, points } = data;
    if (user.id !== id || user.points !== points) {
      setUserData(data);
    }
  }, [data, setUserData]);

  return <></>;
}

// 2개의 object가 같은 값을 가지고있는지 확인
const isObjectEqual = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
