'use client';

import { memo } from 'react';

export const Background = memo(function Background() {
  return (
    <div
      className={
        'absolute bottom-0 left-0 z-base h-[354px] w-full overflow-hidden max-mobile:h-[70px] ' +
        '[&_img]:absolute [&_img]:h-full [&_img]:max-w-none [&_img]:object-contain ' +
        'max-mobile:[&_img]:h-[70px] max-mobile:[&_img]:w-auto ' +
        '[&_img:first-of-type]:animate-[slide_60s_linear_infinite] ' +
        '[&_img:last-of-type]:left-[454px] [&_img:last-of-type]:animate-[slide_60s_linear_infinite]'
      }
    >
      <img width={750} height={140} src="/assets/shop/land-m.webp" alt="land" />
      <img width={750} height={140} src="/assets/shop/land-m.webp" alt="land" />
    </div>
  );
});
