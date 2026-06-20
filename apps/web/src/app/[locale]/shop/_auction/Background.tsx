'use client';

import { memo } from 'react';
import Image from 'next/image';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { MediaQuery } from '@/components/MediaQuery';

const backgroundImgCss = 'absolute max-w-[unset] h-full object-contain mobile:w-auto mobile:h-[70px]';
const backgroundImgFirstCss = `${backgroundImgCss} animate-[slide_60s_linear_infinite]`;
// NOTE: 2px은 깨지는 부분이 존재해 당김
const backgroundImgLastCss = `${backgroundImgCss} left-[454px] animate-[slide_60s_linear_infinite]`;

export const Background = memo(function Background() {
  return (
    <>
      <MediaQuery
        desktop={
          <div className="absolute top-0 left-0 w-full h-full z-base">
            <motion.div className="absolute w-fit top-[860px] left-[80px]" variants={coinVariants} animate="floating">
              <Image width={188} height={191} src="/shop/coin.webp" alt="coin" />
            </motion.div>

            <motion.div className="absolute w-fit top-[300px] right-[86px]" variants={carrotVariants} animate="floating">
              <Image width={313} height={316} src="/shop/carrot.webp" alt="carrot" />
            </motion.div>
          </div>
        }
      />

      <MediaQuery
        desktop={
          <div className="absolute z-base bottom-0 left-0 w-full h-[354px] overflow-hidden mobile:h-[70px]">
            <Image className={backgroundImgFirstCss} width={2802} height={354} src="/shop/land.webp" alt="land" />
            <Image className={backgroundImgLastCss} width={2802} height={354} src="/shop/land.webp" alt="land" />
          </div>
        }
        mobile={
          <div className="absolute z-base bottom-0 left-0 w-full h-[354px] overflow-hidden mobile:h-[70px]">
            <Image className={backgroundImgFirstCss} width={750} height={140} src="/shop/land-m.webp" alt="land" />
            <Image className={backgroundImgLastCss} width={750} height={140} src="/shop/land-m.webp" alt="land" />
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
