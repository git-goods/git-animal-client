'use client';

import React, { Children, useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

import { sliderContainer } from '../MainSlider/MainSlider.style';

// TODO: 후에 공통으로 사용할 수 있을 것 같다.
function AnimalSliderContainer2({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = Children.count(children) - 1 === currentPanelIndex;

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

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    onChanged: onPanelChanged,
    align: 'center',
  };
  // '& .animal-card-container': {
  //   zIndex: 0,
  //   transform: 'scale(0.8) translateX(0px)',
  //   transition: 'transform 0.5s',
  // },
  // '& .prev .animal-card-container': {
  //   transform: 'scale(0.8) translateX(20vw)',
  // },
  // '& .next .animal-card-container': {
  //   transform: 'scale(0.8) translateX(-20vw)',
  // },

  // '& .current .animal-card-container': {
  //   zIndex: 2,
  //   transform: 'scale(1) translateX(0px)',
  // },

  // Ex
  // const rotateVal = -panel.progress * 20;
  // const sinRot = Math.sin(Math.abs(rotateVal * Math.PI / 180));
  // const depth = 150 * sinRot * sinRot;
  // panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;

  const updateTransform = (e: any) => {
    e.currentTarget.panels.forEach((panel: any) => {
      const progress = Math.abs(panel.progress);
      const scale = 0.8 + 0.2 * (1 - progress);
      const translateX = panel.progress === 0 ? 0 : panel.progress > 0 ? `${-20 * progress}vw` : `${20 * progress}vw`;

      panel.element.style.transform = `scale(${scale}) translateX(${translateX})`;
      panel.element.style.zIndex = progress < 0.8 ? 10 : 1;
    });
  };

  return (
    <div>
      <div className={sliderContainer}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions} onMove={updateTransform} onReady={updateTransform}>
          {children}
        </Flicking>
      </div>
    </div>
  );
}

export default AnimalSliderContainer2;

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
  zIndex: '2', // TODO : zIndex theme 적용

  '& img': {
    width: '100%',
    height: '100%',
  },

  _mobile: {
    bottom: '191px',
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
