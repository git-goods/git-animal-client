'use client';

import { Children, useCallback, useEffect, useState } from 'react';
import { css } from '_panda/css';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import useEmblaCarousel from 'embla-carousel-react';

import { ArrowButton } from './Arrow';

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

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const childrenArray = Children.toArray(children);

  return (
    <div className={containerStyle}>
      <div className={sliderContainerStyle}>
        <ArrowButton onClick={scrollPrev} direction="prev" disabled={prevBtnDisabled} />
        <ArrowButton onClick={scrollNext} direction="next" disabled={nextBtnDisabled} />
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

const containerStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 60px',
  position: 'relative',

  _mobile: {
    padding: '0 35px',
  },
});

const sliderContainerStyle = css({
  position: 'relative',
  width: '100%',
  marginTop: '20px',

  _mobile: {
    marginTop: '0px',
  },
});

const emblaViewportStyle = css({
  overflow: 'hidden',
  width: '100%',
});

const emblaContainerStyle = css({
  display: 'flex',
  gap: '20px',
});

const emblaSlideStyle = (slidesPerView: number) =>
  css({
    flex: slidesPerView === 1 ? '0 0 100%' : '0 0 calc(50% - 10px)',
    minWidth: 0,
    padding: '10px',
    textAlign: 'center',

    '& img': {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
    },

    '& p': {
      marginTop: '10px',
      fontSize: '16px',
    },
  });

export default EmblaCarousel;
