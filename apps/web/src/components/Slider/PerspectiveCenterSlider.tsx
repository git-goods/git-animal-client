'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';

/**
 * 중앙에 있는 카드를 3D perspective + fade 효과로 보여주는 슬라이더
 * Embla Carousel + GSAP 기반
 */
export function PerspectiveCenterSlider({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    containScroll: false,
  });

  const slidesRef = useRef<HTMLElement[]>([]);

  const applyEffects = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slides = emblaApi.slideNodes();

    slides.forEach((slide, index) => {
      // 각 슬라이드의 중앙으로부터의 거리 계산 (loop 고려)
      let diff = engine.slideLooper.loopPoints.length
        ? engine.slideRegistry[index]!.reduce((sum, i) => {
            const location = engine.slideLocations[i]!;
            return sum + (location.get() - scrollProgress);
          }, 0) / engine.slideRegistry[index]!.length
        : engine.scrollSnaps[index]! - scrollProgress;

      // -1 ~ 1 범위로 정규화
      const distance = Math.min(Math.max(diff, -1), 1);
      const absDistance = Math.abs(distance);

      // Perspective 효과: rotate 0.5 → 최대 ±25deg, scale 0.2 → 최소 0.8
      const rotateY = distance * -25;
      const scale = 1 - absDistance * 0.2;
      const opacity = 1 - absDistance * 0.6;

      gsap.set(slide, {
        rotateY,
        scale,
        opacity,
        transformPerspective: 1000,
        zIndex: Math.round((1 - absDistance) * 10),
      });
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    applyEffects();
    emblaApi.on('scroll', applyEffects);
    emblaApi.on('reInit', applyEffects);

    return () => {
      emblaApi.off('scroll', applyEffects);
      emblaApi.off('reInit', applyEffects);
    };
  }, [emblaApi, applyEffects]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className={cn('mt-20 relative slider-container')}>
        <span
          className={cn(
            'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-10 h-10 [&_img]:w-full [&_img]:h-full max-mobile:bottom-0 max-mobile:w-[26px] max-mobile:h-[26px]',
            'rotate-180 -left-[62px] max-mobile:left-2',
          )}
          onClick={scrollPrev}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span
          className={cn(
            'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-10 h-10 [&_img]:w-full [&_img]:h-full max-mobile:bottom-0 max-mobile:w-[26px] max-mobile:h-[26px]',
            '-right-[62px] max-mobile:right-2',
          )}
          onClick={scrollNext}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {Array.isArray(children)
              ? children.map((child, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_80%] min-w-0 px-2"
                    ref={(el) => {
                      if (el) slidesRef.current[index] = el;
                    }}
                  >
                    {child}
                  </div>
                ))
              : children}
          </div>
        </div>
      </div>
    </div>
  );
}
