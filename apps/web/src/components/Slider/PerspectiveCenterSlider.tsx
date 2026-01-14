'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import { Arrow, Fade, Perspective } from '@egjs/flicking-plugins';
import type { FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

import { useIsMounted } from '@/hooks/useIsMounted';

/**
 * 중앙에 있는 카드를 3D 효과로 보여주는 슬라이더
 */
export function PerspectiveCenterSlider({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();

  const _plugins = [
    new Perspective({ rotate: 0.5, scale: 0.2 }),
    new Fade(),
    new Arrow({ parentEl: wrapperRef.current }),
  ];

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    align: 'center',
    plugins: isMounted ? _plugins : undefined,
  };

  return (
    <div>
      <div className={cn('mt-20', 'slider-container')} ref={wrapperRef}>
        <span
          className={cn(
            'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-10 h-10 [&_img]:w-full [&_img]:h-full max-mobile:bottom-0 max-mobile:w-[26px] max-mobile:h-[26px]',
            'rotate-180 -left-[62px] max-mobile:left-2',
            'flicking-arrow-prev is-outside',
          )}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span
          className={cn(
            'absolute top-0 bottom-0 m-auto z-floating cursor-pointer w-10 h-10 [&_img]:w-full [&_img]:h-full max-mobile:bottom-0 max-mobile:w-[26px] max-mobile:h-[26px]',
            '-right-[62px] max-mobile:right-2',
            'flicking-arrow-next is-outside',
          )}
        >
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
        </Flicking>
      </div>
    </div>
  );
}
