'use client';

import { Children, useRef, useState } from 'react';
import { css } from '_panda/css';
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
    <div className={containerStyle}>
      <div className={sliderContainerStyle}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions}>
          {Children.map(children, (child, idx) => (
            <div className={sliderItemStyle} key={idx}>
              {child}
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}

const containerStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',

  padding: '0 35px',
});

const sliderContainerStyle = css({
  position: 'relative',
  width: '100%',

  marginTop: '0px',
});

const sliderItemStyle = css({
  width: 'calc(50% - 10px)', // gap을 고려한 너비
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

export default BackgroundSlider;
