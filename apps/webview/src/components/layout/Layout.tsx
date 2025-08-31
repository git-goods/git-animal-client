import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { css } from '../../../styled-system/css';

function Layout() {
  return (
    <div className={css({ minHeight: '100vh', backgroundColor: 'gray.50' })}>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;