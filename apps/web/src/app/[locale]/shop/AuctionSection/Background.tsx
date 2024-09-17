'use client';

import Image from 'next/image';
import { css } from '_panda/css';
import type { Variants } from 'framer-motion';
import { m } from 'framer-motion';

export function Background() {
  return (
    <>
      <div className={floatingBackgroundDivCss}>
        <m.div className={coinCss} variants={coinVariants} animate="floating">
          <Image width={188} height={191} src="/shop/coin.webp" alt="coin" />
        </m.div>

        <m.div className={carrotCss} variants={carrotVariants} animate="floating">
          <Image width={313} height={316} src="/shop/carrot.webp" alt="carrot" />
        </m.div>
      </div>

      <div className={backgroundDivCss}>
        <Image width={2802} height={354} src="/shop/land.webp" alt="land" />
        <Image width={2802} height={354} src="/shop/land.webp" alt="land" />
      </div>
    </>
  );
}

const floatingBackgroundDivCss = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
});

const coinCss = css({
  position: 'absolute',
  width: 'fit-content',
  top: 860,
  left: 80,
});

const coinVariants: Variants = {
  floating: {
    x: [0, -2, 6, 2, 0],
    y: [0, -10, 12, -8, 0],
    rotate: 0,
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const carrotCss = css({
  position: 'absolute',
  width: 'fit-content',
  top: 300,
  right: 86,
});

const carrotVariants: Variants = {
  floating: {
    x: [0, 4, -5, 6, -3, 0],
    y: [0, 6, -12, 2, 8, 0],
    rotate: 0,
    transition: {
      duration: 7,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const backgroundDivCss = css({
  position: 'absolute',
  zIndex: 0,
  bottom: 0,
  left: 0,
  w: '100%',
  h: 354,
  overflow: 'hidden',

  '& img': {
    position: 'absolute',
    maxWidth: 'unset',
    height: '100%',
  },

  '& img:first-of-type': {
    animation: `slide 60s linear infinite`,
  },

  '& img:last-of-type': {
    left: 2800, // NOTE: 2px은 깨지는 부분이 존재해 당김
    animation: `slide 60s linear infinite`,
  },
});
