'use client';

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
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  zIndex: 0,
});

const contentStyle = css({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});
