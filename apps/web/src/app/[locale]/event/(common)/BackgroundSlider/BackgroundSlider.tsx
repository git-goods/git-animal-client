'use client';

import { Children, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';

import { ArrowButton } from './Arrow';

function BackgroundSlider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const panelsPerView = isMobile ? 1 : 2;

  // flicking(panelsPerView/align:'prev'/gap:20) → embla. 2-per-view 는 슬라이드 폭 50%(mobile 100%)로,
  // slidesToScroll=panelsPerView 로 페이지 단위 이동. 화살표 disabled 는 embla canScrollPrev/Next 로 대체.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: panelsPerView,
    containScroll: 'trimSnaps',
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({ align: 'start', slidesToScroll: panelsPerView, containScroll: 'trimSnaps' });
  }, [emblaApi, panelsPerView]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect).on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-[60px] mobile:px-[35px]">
      <div className="relative mt-[20px] w-full mobile:mt-0">
        <ArrowButton onClick={() => emblaApi?.scrollPrev()} direction="prev" disabled={!canPrev} />
        <ArrowButton onClick={() => emblaApi?.scrollNext()} direction="next" disabled={!canNext} />
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {Children.map(children, (child, idx) => (
              <div
                className="w-[calc(50%_-_10px)] shrink-0 p-[10px] text-center mobile:w-full [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[8px] [&_p]:mt-[10px] [&_p]:text-[16px]"
                key={idx}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSlider;
