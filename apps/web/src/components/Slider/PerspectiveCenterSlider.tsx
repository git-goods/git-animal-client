'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import useEmblaCarousel from 'embla-carousel-react';

/**
 * 중앙 정렬 캐러셀 슬라이더 (Embla Carousel 기반)
 */
export function PerspectiveCenterSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    containScroll: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className={cn('mt-20 relative slider-container')}>
        <span
          className={cn(
            'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-10 h-10 [&_img]:w-full [&_img]:h-full max-mobile:bottom-0 max-mobile:w-[26px] max-mobile:h-[26px]',
            'rotate-180 -left-[62px] max-mobile:left-2',
          )}
          onClick={scrollPrev}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span
          className={cn(
            'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-10 h-10 [&_img]:w-full [&_img]:h-full max-mobile:bottom-0 max-mobile:w-[26px] max-mobile:h-[26px]',
            '-right-[62px] max-mobile:right-2',
          )}
          onClick={scrollNext}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {Array.isArray(children)
              ? children.map((child, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    {child}
                  </div>
                ))
              : children}
          </div>
        </div>
      </div>
    </div>
  );
}
