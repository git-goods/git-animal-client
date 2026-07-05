'use client';

import { Children } from 'react';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { cn } from '@gitanimals/ui-tailwind';
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
    <div className={containerStyle}>
      <div className="flex mb-[8px] justify-between items-center">
        <div className={arrowContainerStyle}>
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
      <div className={sliderContainerStyle}>
        <div className={emblaViewportStyle} ref={emblaRef}>
          <div className={emblaContainerStyle}>
            {childrenArray.map((child, idx) => (
              <div className={emblaSlideStyle(slidesPerView)} key={idx}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const arrowContainerStyle = 'flex gap-[10px]';

const containerStyle = 'w-full max-w-[1200px] mx-auto px-[60px] relative mobile:px-[35px]';

const sliderContainerStyle = 'relative w-full mobile:mt-[0px]';

const emblaViewportStyle = 'overflow-hidden w-full';

const emblaContainerStyle = 'flex gap-[20px]';

const emblaSlideStyle = (slidesPerView: number) =>
  cn(
    slidesPerView === 1 ? 'flex-[0_0_100%]' : 'flex-[0_0_calc(50%_-_10px)]',
    'min-w-0 p-[10px] text-center',
    '[&_img]:w-full [&_img]:h-auto [&_img]:rounded-[8px]',
    '[&_p]:mt-[10px] [&_p]:text-[16px]',
  );

export default EmblaCarousel;
