import type { ComponentPropsWithRef } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import type { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      type="button"
      className={cn(
        'appearance-none bg-transparent touch-manipulation inline-flex no-underline cursor-pointer',
        'border-0 p-0 m-0 w-[26px] h-[26px] items-center justify-center rounded-full',
        'after:border after:border-[#EAEAEA] after:w-[14px] after:h-[14px] after:rounded-full after:flex after:items-center after:content-[""]',
        '[&.selected]:after:bg-white/75',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
