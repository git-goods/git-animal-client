'use client';

import React, { Children, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@gitanimals/ui-tailwind';

import { usePrevNextButtons } from '@/shared/ui/EmblaCarousel/EmblaCarouselArrowButtons';

import { sliderContainer } from '../MainSection/MainSlider.style';

function AnimalSliderContainerMobile({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: false,
    skipSnaps: false,
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div>
      <div className={cn(sliderContainer, 'slider-container')}>
        <ArrowButton onClick={onPrevButtonClick} direction="prev" disabled={prevBtnDisabled} />
        <ArrowButton onClick={onNextButtonClick} direction="next" disabled={nextBtnDisabled} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {Children.map(children, (child, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalSliderContainerMobile;

function ArrowButton({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: 'prev' | 'next';
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        direction === 'prev' ? prevArrowStyle : nextArrowStyle,
        direction === 'prev' ? 'rotate-180' : 'rotate-0',
        disabled ? 'cursor-not-allowed w-9 h-9' : 'cursor-pointer w-10 h-10',
        disabled ? 'max-mobile:w-6 max-mobile:h-6' : 'max-mobile:w-[26px] max-mobile:h-[26px]',
      )}
    >
      {disabled ? (
        <Image src="/icon/circle-arrow-disable.svg" alt="arrow" width={36} height={36} />
      ) : (
        <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
      )}
    </button>
  );
}

const arrowStyle = cn(
  'absolute top-0 bottom-0 my-auto z-floating',
  '[&_img]:w-full [&_img]:h-full',
  'max-mobile:bottom-0',
);

const prevArrowStyle = cn(arrowStyle, '-left-[62px]', 'max-mobile:left-2');

const nextArrowStyle = cn(arrowStyle, '-right-[62px]', 'max-mobile:right-2');
