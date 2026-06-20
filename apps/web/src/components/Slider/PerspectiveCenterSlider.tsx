'use client';

import { Children } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import useEmblaCarousel from 'embla-carousel-react';

import { usePerspectiveTween } from './usePerspectiveTween';

/**
 * 중앙에 있는 카드를 3D 효과로 보여주는 슬라이더.
 *
 * flicking(Perspective+Fade+Arrow) → embla 로 전환(PR3c). Perspective/Fade 는
 * usePerspectiveTween 으로 재현. embla 구조 클래스(viewport/container/slide)만 tailwind 이고,
 * 화살표/컨테이너 시각 스타일(panda)은 landing 스타일 전환(PR3d) 때 함께 옮긴다.
 */
export function PerspectiveCenterSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: false });
  usePerspectiveTween(emblaApi, { rotate: 0.5, scale: 0.2 });

  return (
    <div>
      <div className={cx(sliderContainer, 'slider-container')}>
        <button
          type="button"
          aria-label="previous"
          onClick={() => emblaApi?.scrollPrev()}
          className={cx('is-outside', prevArrowStyle)}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </button>
        <button
          type="button"
          aria-label="next"
          onClick={() => emblaApi?.scrollNext()}
          className={cx('is-outside', nextArrowStyle)}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </button>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {Children.map(children, (child, index) => (
              <div key={index} className="min-w-0 flex-[0_0_auto]">
                {child}
              </div>
            ))}
          </div>
        </div>
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
  zIndex: 'floating',
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
