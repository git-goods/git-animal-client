import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';
import { authUtils } from '@/utils';
import { useEffect, useState } from 'react';
import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '@/utils/interceptor';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';
import { cn } from '@gitanimals/ui-tailwind/utils';

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
      <div className="min-h-screen bg-black">
        <main
          className={cn(
            'mx-auto max-w-[var(--container-max-width)]',
            'h-[calc(100vh-var(--tab-bar-height))]',
          )}
        >
          <Outlet />
        </main>
        <div className="h-[var(--tab-bar-height)]" />
        <TabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <main className="mx-auto h-full max-w-[var(--container-max-width)]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
