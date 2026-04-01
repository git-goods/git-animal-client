'use client';

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import { Arrow } from '@egjs/flicking-plugins';
import type { FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

// TODO: 후에 공통으로 사용할 수 있을 것 같다.
function AnimalSliderContainer({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  // TODO: useMounted hook으로 분리
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const plugins = [new Arrow({ parentEl: wrapperRef.current })];

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    panelsPerView: 1,
    plugins: isMounted ? plugins : undefined,
  };

  return (
    <div>
      <div ref={wrapperRef} className={sliderContainer}>
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
        </Flicking>
        <span className={cn('flicking-arrow-prev', 'is-outside', sliderArrowStyle, prevArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
        <span className={cn('flicking-arrow-next', 'is-outside', sliderArrowStyle, nextArrowStyle)}>
          <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
        </span>
      </div>
    </div>
  );
}

export default AnimalSliderContainer;

const sliderArrowStyle = cn(
  'translate-x-10 w-10 h-10',
  'absolute block top-0 bottom-0 my-auto z-floating',
  '[&.flicking-arrow-disabled]:translate-x-9 [&.flicking-arrow-disabled]:w-9 [&.flicking-arrow-disabled]:h-9',
  '[&.flicking-arrow-disabled]:cursor-not-allowed [&.flicking-arrow-disabled]:brightness-50'
);

const prevArrowStyle = cn('rotate-180 -left-6');

const nextArrowStyle = cn('-right-6');

const sliderContainer = cn(
  'relative w-full h-full',
  'max-mobile:w-full max-mobile:h-auto'
);
