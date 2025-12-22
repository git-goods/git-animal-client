'use client';

import { Children } from 'react';
import { css, cx } from '_panda/css';
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
    <div className={containerStyle}>
      <div className={css({ display: 'flex', mb: '8px', justifyContent: 'space-between', alignItems: 'center' })}>
        <div className={arrowContainerStyle}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div
          className={css({
            display: 'flex',
            gap: 1,
          })}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cx(index === selectedIndex && 'selected')}
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
const arrowContainerStyle = css({
  display: 'flex',
  gap: '10px',
});

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
