'use client';

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { Arrow } from '@egjs/flicking-plugins';
import type { FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

// TODO: 후에 공통으로 사용할 수 있을 것 같다.
function AnimalSliderContainer({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const plugins = [new Arrow({ parentEl: wrapperRef.current })];

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    panelsPerView: 1,
    plugins: isMounted ? plugins : undefined,
  };

  return (
    <div>
      <div ref={wrapperRef} className={sliderContainer}>
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
        </Flicking>
        <span className={cx('flicking-arrow-prev', 'is-outside', sliderArrowStyle, prevArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span className={cx('flicking-arrow-next', 'is-outside', sliderArrowStyle, nextArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
      </div>
    </div>
  );
}

export default AnimalSliderContainer;

const sliderArrowStyle = css({
  transform: 'translateX(40px)',
  width: '40px',
  height: '40px',

  position: 'absolute',
  display: 'block',
  top: '0',
  bottom: 0,
  margin: 'auto',
  zIndex: 100,

  '&.flicking-arrow-disabled': {
    transform: 'translateX(36px)',
    width: '36px',
    height: '36px',

    cursor: 'not-allowed',
    filter: 'brightness(0.5)',
  },
});

const prevArrowStyle = css({
  rotate: '180deg',
  left: '-24px',
});

const nextArrowStyle = css({
  right: '-24px',
});

const sliderContainer = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  _mobile: {
    width: '100%',
    height: 'auto',
  },
});
