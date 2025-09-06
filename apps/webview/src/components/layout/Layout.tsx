import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';
import { authUtils } from '@/utils';
import { css } from '_panda/css';
import { useEffect } from 'react';
import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/utils/interceptor';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';

function Layout() {
  const isAuthenticated = authUtils.isAuthenticated();

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
        <main className={css({ h: 'full', maxWidth: 'var(--container-max-width)', mx: 'auto' })}>
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

  // return (
  //   <div className={css({ minHeight: '100vh', backgroundColor: 'black' })}>
  //     <main className={css({ h: 'full', maxWidth: 'var(--container-max-width)', mx: 'auto' })}>
  //       <Outlet />
  //       <div className={css({ p: '2rem', color: 'white', backgroundColor: 'red' })}>no auth</div>
  //     </main>
  //   </div>
  // );
}

export default Layout;
