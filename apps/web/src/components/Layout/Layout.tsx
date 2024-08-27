import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';

function Layout({ children }: PropsWithChildren) {
  return <div className={containerStyle}>{children}</div>;
}

export default Layout;

const containerStyle = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  minWidth: '1400px',
  '& > img': {
    zIndex: -1,
    objectFit: 'cover',
  },
  '& > main': {
    minHeight: '100vh',
    zIndex: 1,
  },
});
