'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
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
            className={cn(currentPanelIndex === index ? 'active' : '')}
            onClick={() => onPanelIndexChange(index)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className={styles.sliderContainer}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex">
            {MODE_ITEM_LIST.map((item) => (
              <div key={item.title} className={cn(styles.sliderItem, 'flex-[0_0_100%] min-w-0')}>
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
      className={cn(
        direction === 'prev' ? prevArrowStyle : nextArrowStyle,
        direction === 'prev' ? 'rotate-180' : 'rotate-0',
        disabled ? 'cursor-not-allowed w-9 h-9 max-mobile:w-6 max-mobile:h-6' : 'cursor-pointer w-10 h-10 max-mobile:w-[26px] max-mobile:h-[26px]'
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
  'max-mobile:bottom-[191px]'
);

const prevArrowStyle = cn(
  arrowStyle,
  'left-[-62px] max-mobile:left-2'
);

const nextArrowStyle = cn(
  arrowStyle,
  'right-[-62px] max-mobile:right-2'
);
