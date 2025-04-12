import React from 'react';
import { css } from '_panda/css';

export const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={layoutStyle}>
      <div className={contentStyle}>{children}</div>
    </div>
  );
};

const layoutStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 'calc(100vh - var(--mobile-header-height))',
  backgroundColor: 'black',
  zIndex: 0,
});

const contentStyle = css({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '475px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});
