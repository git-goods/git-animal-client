import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from './TabBar';
import { authUtils } from '@/utils';
import { css } from '_panda/css';

function Layout() {
  const isAuthenticated = authUtils.isAuthenticated();

  const navigate = useNavigate();

  const currentPath = useLocation();
  console.log('currentPath', currentPath);

  if (isAuthenticated) {
    return (
      <div className={css({ minHeight: '100vh', backgroundColor: 'black' })}>
        <div className={css({ color: 'white', backgroundColor: 'red' })}>{currentPath.pathname}</div>
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
      <div className={css({ color: 'white', backgroundColor: 'red' })}>{currentPath.pathname}</div>
      <main className={css({ h: 'full', maxWidth: 'var(--container-max-width)', mx: 'auto' })}>
        {/* <Outlet /> */}
        no auth
      </main>
    </div>
  );
}

export default Layout;
