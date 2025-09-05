import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';
import { authUtils } from '@/utils';
import { css } from '_panda/css';

function Layout() {
  const isAuthenticated = authUtils.isAuthenticated();
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
}

export default Layout;
