'use client';

import { Children } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import useEmblaCarousel from 'embla-carousel-react';

import { usePerspectiveTween } from './usePerspectiveTween';

// 중앙 카드를 3D 로 강조하는 슬라이더. flicking 의 Perspective/Fade 를 usePerspectiveTween 으로 재현한다.
export function PerspectiveCenterSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: false });
  usePerspectiveTween(emblaApi, { rotate: 0.5, scale: 0.2 });

  return (
    <div>
      <div className={cn(sliderContainer, 'slider-container')}>
        <button
          type="button"
          aria-label="previous"
          onClick={() => emblaApi?.scrollPrev()}
          className={cn('is-outside', prevArrowStyle)}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </button>
        <button
          type="button"
          aria-label="next"
          onClick={() => emblaApi?.scrollNext()}
          className={cn('is-outside', nextArrowStyle)}
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

const sliderContainer = 'mt-[80px]';

const arrowStyle =
  'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-[40px] h-[40px] [&_img]:w-full [&_img]:h-full mobile:bottom-0 mobile:w-[26px] mobile:h-[26px]';

const prevArrowStyle = cn(arrowStyle, 'rotate-[180deg] left-[-62px] mobile:left-[8px]');

const nextArrowStyle = cn(arrowStyle, 'right-[-62px] mobile:right-[8px]');
