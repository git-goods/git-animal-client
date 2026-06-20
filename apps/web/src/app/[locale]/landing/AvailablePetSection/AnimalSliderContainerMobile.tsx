'use client';

import React, { Children, useEffect, useState } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import useEmblaCarousel from 'embla-carousel-react';

import { usePerspectiveTween } from '@/components/Slider/usePerspectiveTween';

import { sliderContainer } from '../MainSection/MainSlider.style';

/**
 * flicking(Perspective+Fade) → embla 전환(PR3c). 3D 효과는 usePerspectiveTween 으로 재현.
 * 시각 스타일(panda)은 landing 스타일 전환(PR3d)에서 함께 옮긴다.
 */
function AnimalSliderContainerMobile({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' });
  usePerspectiveTween(emblaApi, { rotate: 0.5, scale: 0.2 });

  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = Children.count(children) - 1 === currentPanelIndex;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentPanelIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [emblaApi]);

  const moveToNextPanel = () => emblaApi?.scrollNext();
  const moveToPrevPanel = () => emblaApi?.scrollPrev();

  return (
    <div>
      <div className={cx(sliderContainer, 'slider-container')}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {Children.map(children, (child, index) => (
              <div key={index} className="min-w-0 flex-[0_0_auto]">
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
      className={cx(
        direction === 'prev' ? prevArrowStyle : nextArrowStyle,
        css({
          rotate: direction === 'prev' ? '180deg' : '0deg',
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: disabled ? '36px' : '40px',
          height: disabled ? '36px' : '40px',
          _mobile: {
            width: disabled ? '24px' : '26px',
            height: disabled ? '24px' : '26px',
          },
        }),
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

const arrowStyle = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto',
  zIndex: 'floating',

  '& img': {
    width: '100%',
    height: '100%',
  },

  _mobile: {
    bottom: '0',
  },
});

const prevArrowStyle = cx(
  arrowStyle,
  css({
    left: '-62px',
    _mobile: {
      left: '8px',
    },
  }),
);

const nextArrowStyle = cx(
  arrowStyle,
  css({
    right: '-62px',
    _mobile: {
      right: '8px',
    },
  }),
);
