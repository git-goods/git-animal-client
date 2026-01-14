'use client';

import { memo } from 'react';
import Image from 'next/image';
import { userQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { addNumberComma } from '@/utils/number';

export const FloatingPointSection = memo(
  wrap
    .Suspense({ fallback: null })
    .ErrorBoundary({ fallback: null })
    .on(function FloatingPointSection() {
      const { data } = useSuspenseQuery(userQueries.userOptions());

      return (
        <div className={cn(
          'fixed top-[88px] left-5 w-fit',
          'px-4 py-3 rounded-xl bg-black/25 z-sticky',
          'flex flex-col gap-1 text-white backdrop-blur-[7px]',
          'max-mobile:px-2.5 max-mobile:py-1.5'
        )}>
          <span className={cn(
            'font-product text-glyph-16 font-bold',
            'max-mobile:hidden'
          )}>
            My Points
          </span>
          <span className={cn(
            'flex items-center gap-1.5',
            'font-product text-glyph-32 font-bold',
            'max-mobile:text-glyph-15'
          )}>
            <Image width={28} height={28} src="/shop/coin.webp" alt="coin" />
            {addNumberComma(data.points)}P
          </span>
        </div>
      );
    }),
);
