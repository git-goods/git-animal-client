'use client';

import { Children } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import useEmblaCarousel from 'embla-carousel-react';

import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

interface EmblaCarouselProps {
  children: React.ReactNode;
}

function EmblaCarousel({ children }: EmblaCarouselProps) {
  const isMobile = useIsMobile();
  const slidesPerView = isMobile ? 1 : 2;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    skipSnaps: false,
  });

  const childrenArray = Children.toArray(children);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className={cn('w-full max-w-[1200px] mx-auto px-[60px] relative', 'max-mobile:px-[35px]')}>
      <div className="flex mb-2 justify-between items-center">
        <div className="flex gap-[10px]">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="flex gap-1">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(index === selectedIndex && 'selected')}
            />
          ))}
        </div>
      </div>
      <div className={cn('relative w-full', 'max-mobile:mt-0')}>
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-5">
            {childrenArray.map((child, idx) => (
              <div
                className={cn(
                  slidesPerView === 1 ? 'flex-[0_0_100%]' : 'flex-[0_0_calc(50%-10px)]',
                  'min-w-0 p-[10px] text-center',
                  '[&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg',
                  '[&_p]:mt-[10px] [&_p]:text-[16px]'
                )}
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

export default EmblaCarousel;
