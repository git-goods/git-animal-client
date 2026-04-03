'use client';

import { Children, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';

import { usePrevNextButtons } from '@/components/EmblaCarousel/EmblaCarouselArrowButtons';

import { ArrowButton } from './Arrow';

function BackgroundSlider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const slidesPerView = isMobile ? 1 : 2;
  const slideWidth = slidesPerView === 1 ? '100%' : 'calc(50% - 10px)';

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    slidesToScroll: slidesPerView,
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-[60px] relative max-mobile:px-[35px]">
      <div className="relative w-full mt-5 max-mobile:mt-0">
        <ArrowButton onClick={onPrevButtonClick} direction="prev" disabled={prevBtnDisabled} />
        <ArrowButton onClick={onNextButtonClick} direction="next" disabled={nextBtnDisabled} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {Children.map(children, (child, idx) => (
              <div
                className="min-w-0 p-[10px] text-center [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_p]:mt-[10px] [&_p]:text-base"
                style={{ flex: `0 0 ${slideWidth}` }}
                key={idx}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSlider;
