'use client';

import { Children, useRef, useState } from 'react';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';

import { ArrowButton } from './Arrow';

function BackgroundSlider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const flicking = useRef<Flicking | null>(null);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const panelsPerView = isMobile ? 1 : 2;

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = currentPanelIndex === Math.ceil(Children.count(children) / panelsPerView) - 1;

  const moveToNextPanel = async () => {
    if (!flicking.current || isLastPanel || flicking.current.animating) return;
    try {
      flicking.current.next();
    } catch (error) {}
  };

  const moveToPrevPanel = async () => {
    if (!flicking.current || isFirstPanel || flicking.current.animating) return;
    try {
      flicking.current.prev();
    } catch (error) {}
  };

  const onPanelChanged = (e: ChangedEvent<Flicking>) => {
    setCurrentPanelIndex(e.index);
  };

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    panelsPerView,
    align: 'prev',
    gap: 20,
    onChanged: onPanelChanged,
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-[60px] relative max-mobile:px-[35px]">
      <div className="relative w-full mt-5 max-mobile:mt-0">
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions}>
          {Children.map(children, (child, idx) => (
            <div className="w-[calc(50%-10px)] p-[10px] text-center [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_p]:mt-[10px] [&_p]:text-base" key={idx}>
              {child}
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}

export default BackgroundSlider;
