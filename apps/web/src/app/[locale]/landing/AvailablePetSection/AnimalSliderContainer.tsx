'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@gitanimals/ui-tailwind';

function AnimalSliderContainer({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className={sliderContainer}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {React.Children.map(children, (child, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                {child}
              </div>
            ))}
          </div>
        </div>
        <span className={cn(sliderArrowStyle, prevArrowStyle)} onClick={scrollPrev}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span className={cn(sliderArrowStyle, nextArrowStyle)} onClick={scrollNext}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
      </div>
    </div>
  );
}

export default AnimalSliderContainer;

const sliderArrowStyle = cn(
  'w-10 h-10 cursor-pointer',
  'absolute block top-0 bottom-0 my-auto z-floating',
  '[&_img]:w-full [&_img]:h-full',
);

const prevArrowStyle = cn('rotate-180 -left-6');

const nextArrowStyle = cn('-right-6');

const sliderContainer = cn('relative w-full h-full', 'max-mobile:w-full max-mobile:h-auto');
