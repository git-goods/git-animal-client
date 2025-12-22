import type { ComponentPropsWithRef } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { css, cx } from '_panda/css';
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
    <button type="button" className={cx(dotButtonStyle, className)} {...restProps}>
      {children}
    </button>
  );
};

const dotButtonStyle = css({
  WebkitTapHighlightColor: 'rgba(v  ar(--text-high-contrast-rgb-value), 0.5)',
  WebkitAppearance: 'none',
  appearance: 'none',
  backgroundColor: 'transparent',
  touchAction: 'manipulation',
  display: 'inline-flex',
  textDecoration: 'none',
  cursor: 'pointer',
  border: '0',
  padding: '0',
  margin: '0',
  width: '26px',
  height: '26px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',

  _after: {
    borderColor: '#EAEAEA',
    borderWidth: '1px',
    borderStyle: 'solid',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    content: '""',
  },

  '&.embla__dot--selected': {
    _after: {
      bg: 'white.white_75',
    },
  },
});
