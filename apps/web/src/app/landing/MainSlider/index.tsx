'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

import * as styles from './MainSlider.style';

const MODE_ITEM_LIST = [
  {
    title: 'Line Mode',
    description:
      'Line mode allows you to specify one of your pets to move within the specified width and height range.When using line mode, if you request the image in markdown, you cannot set width and height, so please use HTML format instead.',
    img: '/main/mode_demo-line.png',
    webpImg: '/main/mode_demo-line.webp',
  },
  {
    title: 'Farm mode',
    description: 'Farm mode shows all your animals and additional information.',
    img: '/main/mode_demo-farm.png',
    webpImg: '/main/mode_demo-farm.webp',
  },
];

function LandingMainSlider() {
  const flicking = useRef<Flicking | null>(null);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = currentPanelIndex === MODE_ITEM_LIST.length - 1;

  const onPanelIndexChange = (index: number) => {
    if (!flicking.current) return;
    if (flicking.current.animating) return;
    flicking.current?.moveTo(index);
  };

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
    panelsPerView: 1,
    onChanged: onPanelChanged,
  };

  return (
    <div className={styles.container}>
      <div className={styles.tab}>
        {MODE_ITEM_LIST.map((item, index) => (
          <button
            key={item.title}
            className={cx(currentPanelIndex === index ? 'active' : '')}
            onClick={() => onPanelIndexChange(index)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className={styles.sliderContainer}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions}>
          {MODE_ITEM_LIST.map((item) => (
            <div key={item.title} className={styles.sliderItem}>
              <div className={styles.sliderItemInner}>
                <picture className={styles.sliderItemImage}>
                  <source srcSet={item.webpImg} type="image/webp" />
                  <Image src={item.img} alt={item.title} width={1024} height={594} />
                </picture>
                <hgroup className={styles.sliderItemHgroup}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </hgroup>
              </div>
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}

export default LandingMainSlider;

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
