'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';

export const Background = memo(function Background() {
  return (
    <>
      <div className={backgroundDivCss}>
        <Image width={750} height={140} src="/assets/shop/land-m.webp" alt="land" />
        <Image width={750} height={140} src="/assets/shop/land-m.webp" alt="land" />
      </div>
    </>
  );
});

const backgroundDivCss = css({
  position: 'absolute',
  zIndex: 'base',
  bottom: 0,
  left: 0,
  w: '100%',
  overflow: 'hidden',
  h: '70px',

  '& img': {
    position: 'absolute',
    maxWidth: 'unset',
    objectFit: 'contain',

    width: 'auto',
    height: '70px',
  },

  '& img:first-of-type': {
    animation: `slide 60s linear infinite`,
  },

  '& img:last-of-type': {
    left: '454px', // NOTE: 2px은 깨지는 부분이 존재해 당김
    animation: `slide 60s linear infinite`,
  },
});
