'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import useEmblaCarousel from 'embla-carousel-react';

import * as styles from './MainSlider.style';
import SliderItem from './SliderItem';

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

function MainSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = currentPanelIndex === MODE_ITEM_LIST.length - 1;

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setCurrentPanelIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const onPanelIndexChange = (index: number) => emblaApi?.scrollTo(index);
  const moveToNextPanel = () => emblaApi?.scrollNext();
  const moveToPrevPanel = () => emblaApi?.scrollPrev();

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
        <div className={emblaViewportStyle} ref={emblaRef}>
          <div className={emblaContainerStyle}>
            {MODE_ITEM_LIST.map((item) => (
              <div key={item.title} className={cx(styles.sliderItem, emblaSlideStyle)}>
                <SliderItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSlider;

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

const emblaViewportStyle = css({ overflow: 'hidden', width: '100%' });
const emblaContainerStyle = css({ display: 'flex' });
const emblaSlideStyle = css({ flex: '0 0 100%', minWidth: 0 });
