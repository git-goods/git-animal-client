'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

const MODE_ITEM_LIST = [
  {
    title: 'Line Mode',
    description:
      'Line mode allows you to specify one of your pets to move within the specified width and height range.When using line mode, if you request the image in markdown, you cannot set width and height, so please use HTML format instead.',
    img: '/main/mode_demo-line.png',
  },
  {
    title: 'Farm mode',
    description: 'Farm mode shows all your animals and additional information.',
    img: '/main/mode_demo-farm.png',
  },
];

function LandingMainSlider() {
  const flicking = useRef<Flicking | null>(null);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = currentPanelIndex === MODE_ITEM_LIST.length - 1;

  const onPanelIndexChange = (index: number) => {
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
    <div className={containerStyle}>
      <div className={tabStyle}>
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

      <div className={sliderContainerStyle}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions}>
          {MODE_ITEM_LIST.map((item) => (
            <div key={item.title} className={panelStyle}>
              <div className={panelInnerStyle}>
                <Image src={item.img} alt={item.title} width={1024} height={594} />
                <hgroup className={hgroupStyle}>
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

const sliderContainerStyle = css({
  position: 'relative',
  width: '1120px',
  height: '800px',
});

const containerStyle = css({
  width: 'fit-content',
  height: 'fit-content',
  margin: 'auto',

  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.10)',
});

const tabStyle = css({
  display: 'flex',
  gap: '0',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '40px',

  '& button': {
    padding: '4px 10px',
    color: '#fff',
    textStyle: 'glyph18.bold',
    opacity: '0.5',

    '&.active': {
      opacity: '1',
    },
  },
});

const panelStyle = css({
  width: 'fit-content',
  height: 'fit-content',
});

const panelInnerStyle = css({
  padding: '40px 40px 60px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});

const hgroupStyle = css({
  padding: '0 20px',
  color: '#fff',
  '& h2': {
    textStyle: 'glyph32.bold',
  },
  '& p': {
    textStyle: 'glyph18.regular',
  },
});

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
});

const prevArrowStyle = cx(arrowStyle, css({ left: '-62px' }));

const nextArrowStyle = cx(arrowStyle, css({ right: '-62px' }));
