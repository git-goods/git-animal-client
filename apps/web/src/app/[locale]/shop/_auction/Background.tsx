'use client';

import { memo } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { MediaQuery } from '@/components/MediaQuery';

export const Background = memo(function Background() {
  return (
    <>
      <MediaQuery
        desktop={
          <div className="absolute top-0 left-0 w-full h-full z-base">
            <motion.div className="absolute w-fit top-[860px] left-20" variants={coinVariants} animate="floating">
              <Image width={188} height={191} src="/shop/coin.webp" alt="coin" />
            </motion.div>

            <motion.div
              className="absolute w-fit top-[300px] right-[86px]"
              variants={carrotVariants}
              animate="floating"
            >
              <Image width={313} height={316} src="/shop/carrot.webp" alt="carrot" />
            </motion.div>
          </div>
        }
      />

      <MediaQuery
        desktop={
          <div
            className={cn(
              'absolute z-base bottom-0 left-0 w-full h-[354px] overflow-hidden',
              '[&_img]:absolute [&_img]:max-w-none [&_img]:h-full [&_img]:object-contain',
              '[&_img:first-of-type]:animate-slide',
              '[&_img:last-of-type]:left-[454px] [&_img:last-of-type]:animate-slide',
            )}
          >
            <Image width={2802} height={354} src="/shop/land.webp" alt="land" />
            <Image width={2802} height={354} src="/shop/land.webp" alt="land" />
          </div>
        }
        mobile={
          <div
            className={cn(
              'absolute z-base bottom-0 left-0 w-full h-[70px] overflow-hidden',
              '[&_img]:absolute [&_img]:max-w-none [&_img]:h-[70px] [&_img]:w-auto',
              '[&_img:first-of-type]:animate-slide',
              '[&_img:last-of-type]:left-[454px] [&_img:last-of-type]:animate-slide',
            )}
          >
            <Image width={750} height={140} src="/shop/land-m.webp" alt="land" />
            <Image width={750} height={140} src="/shop/land-m.webp" alt="land" />
          </div>
        }
      />
    </>
  );
});

const coinVariants: Variants = {
  floating: {
    x: [0, -2, 6, 2, 0],
    y: [0, -10, 12, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const carrotVariants: Variants = {
  floating: {
    x: [0, 4, -5, 6, -3, 0],
    y: [0, 6, -12, 2, 8, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};
