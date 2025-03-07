'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';

export const Background = memo(function Background() {
  return (
    <div className={layoutStyle}>
      <div className={backgroundStyle}>
        <Image className={imageStyle} src="/quiz/quiz-bg.webp" alt="background" layout="fill" />
      </div>
    </div>
  );
});

const layoutStyle = css({
  position: 'absolute',
  width: '100vw',
  height: 'calc(100vh - var(--mobile-header-height))',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: -1,
  backgroundColor: 'black',
});

const backgroundStyle = css({
  position: 'relative',
  width: '100%',
  maxWidth: '475px',
  height: 'calc(100vh - var(--mobile-header-height))',
  overflow: 'hidden',
  zIndex: -1,
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'bottom',
});
