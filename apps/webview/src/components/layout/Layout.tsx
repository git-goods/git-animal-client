import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';
import { authUtils } from '@/utils';
import { css } from '_panda/css';
import { useEffect, useState } from 'react';
import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/utils/interceptor';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authUtils.isAuthenticated());

    const unsubscribe = authUtils.onAuthStateChange((authState: boolean) => {
      setIsAuthenticated(authState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setInterceptors = () => {
      setRequestInterceptor(interceptorRequestFulfilled);
      setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
      setRenderRequestInterceptor(interceptorRequestFulfilled);
      setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
    };

    if (isAuthenticated) {
      setInterceptors();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className={css({ minHeight: '100vh', backgroundColor: 'black' })}>
        <main
          className={css({
            h: 'calc(100vh - var(--tab-bar-height))',
            maxWidth: 'var(--container-max-width)',
            mx: 'auto',
          })}
        >
          <Outlet />
        </main>
        <div className={css({ h: 'var(--tab-bar-height)' })}></div>
        <TabBar />
      </div>
    );
  }

  return (
    <div className={css({ minHeight: '100vh', backgroundColor: 'black' })}>
      <main className={css({ h: 'full', maxWidth: 'var(--container-max-width)', mx: 'auto' })}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
