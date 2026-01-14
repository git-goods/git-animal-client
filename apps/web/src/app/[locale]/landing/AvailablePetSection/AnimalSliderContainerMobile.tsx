'use client';

import React, { Children, useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import { Fade, Perspective } from '@egjs/flicking-plugins';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

import { sliderContainer } from '../MainSection/MainSlider.style';

function AnimalSliderContainerMobile({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = Children.count(children) - 1 === currentPanelIndex;

  // TODO: arrow plugin을 사용
  const moveToNextPanel = async () => {
    if (!flicking.current) return;
    if (isLastPanel) return;
    if (flicking.current.animating) return;

    try {
      flicking.current.next();
    } catch (error) {}
  };

  const moveToPrevPanel = async () => {
    if (!flicking.current) return;
    if (isFirstPanel) return;
    if (flicking.current.animating) return;

    try {
      flicking.current.prev();
    } catch (error) {}
  };
  const onPanelChanged = (e: ChangedEvent<Flicking>) => {
    setCurrentPanelIndex(e.index);
  };
  const _plugins = [new Perspective({ rotate: 0.5, scale: 0.2 }), new Fade()];

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    onChanged: onPanelChanged,
    align: 'center',
    plugins: _plugins,
  };

  return (
    <div>
      <div className={cn(sliderContainer, 'slider-container')}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
        </Flicking>
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
        disabled ? 'max-mobile:w-6 max-mobile:h-6' : 'max-mobile:w-[26px] max-mobile:h-[26px]'
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
  'max-mobile:bottom-0'
);

const prevArrowStyle = cn(
  arrowStyle,
  '-left-[62px]',
  'max-mobile:left-2'
);

const nextArrowStyle = cn(
  arrowStyle,
  '-right-[62px]',
  'max-mobile:right-2'
);
