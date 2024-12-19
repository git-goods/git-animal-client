'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { Arrow, Fade, Perspective } from '@egjs/flicking-plugins';
import type { FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

import { useIsMounted } from '@/hooks/useIsMounted';

/**
 * 중앙에 있는 카드를 3D 효과로 보여주는 슬라이더
 */
export function PerspectiveCenterSlider({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();

  const _plugins = [
    new Perspective({ rotate: 0.5, scale: 0.2 }),
    new Fade(),
    new Arrow({ parentEl: wrapperRef.current }),
  ];

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    align: 'center',
    plugins: isMounted ? _plugins : undefined,
  };

  return (
    <div>
      <div className={cx(sliderContainer, 'slider-container')} ref={wrapperRef}>
        <span className={cx('flicking-arrow-prev', 'is-outside', prevArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span className={cx('flicking-arrow-next', 'is-outside', nextArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
        </Flicking>
      </div>
    </div>
  );
}

const sliderContainer = css({
  marginTop: '80px',
});

const arrowStyle = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto',
  zIndex: '2', // TODO : zIndex theme 적용
  cursor: 'pointer',
  width: '40px',
  height: '40px',

  '& img': {
    width: '100%',
    height: '100%',
  },

  _mobile: {
    bottom: '0',
    width: '26px',
    height: '26px',
  },
});

const prevArrowStyle = cx(
  arrowStyle,
  css({
    rotate: '180deg',
    left: '-62px',
    _mobile: {
      left: '8px',
    },
  }),
);

const nextArrowStyle = cx(
  arrowStyle,
  css({
    right: '-62px',
    _mobile: {
      right: '8px',
    },
  }),
);
