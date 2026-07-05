'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import useEmblaCarousel from 'embla-carousel-react';

import { sliderContainer } from './MainSlider.style';
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
    <div className="m-auto h-fit w-fit rounded-[16px] bg-[rgba(255,255,255,0.10)]">
      <div className="flex items-center justify-center gap-0 pt-[40px] mobile:pt-[26px]">
        {MODE_ITEM_LIST.map((item, index) => (
          <button
            key={item.title}
            className={cn(
              'px-[10px] py-[4px] text-white glyph18-regular mobile:px-[8px] mobile:py-[2px] mobile:glyph16-regular',
              currentPanelIndex === index
                ? 'opacity-100 glyph18-bold mobile:glyph16-bold'
                : 'opacity-50',
            )}
            onClick={() => onPanelIndexChange(index)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className={sliderContainer}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <div className={emblaViewportStyle} ref={emblaRef}>
          <div className={emblaContainerStyle}>
            {MODE_ITEM_LIST.map((item) => (
              <div key={item.title} className={cn('h-fit w-fit', emblaSlideStyle)}>
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
        direction === 'prev' ? 'rotate-[180deg]' : 'rotate-[0deg]',
        disabled
          ? 'cursor-not-allowed w-[36px] h-[36px] mobile:w-[24px] mobile:h-[24px]'
          : 'cursor-pointer w-[40px] h-[40px] mobile:w-[26px] mobile:h-[26px]',
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

const arrowStyle = 'absolute top-0 bottom-0 m-auto z-floating [&_img]:w-full [&_img]:h-full mobile:bottom-[191px]';

const prevArrowStyle = cn(arrowStyle, 'left-[-62px] mobile:left-[8px]');

const nextArrowStyle = cn(arrowStyle, 'right-[-62px] mobile:right-[8px]');

const emblaViewportStyle = 'overflow-hidden w-full';
const emblaContainerStyle = 'flex';
const emblaSlideStyle = 'flex-[0_0_100%] min-w-0';
