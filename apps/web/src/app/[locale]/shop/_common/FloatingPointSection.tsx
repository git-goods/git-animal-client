'use client';

import { memo } from 'react';
import Image from 'next/image';
import { userQueries } from '@gitanimals/react-query';
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
        <div className="fixed top-[88px] left-[20px] w-fit p-[12px_16px] rounded-[12px] bg-black-25 z-sticky flex flex-col gap-[4px] text-white-100 backdrop-blur-[7px] mobile:p-[6px_10px_6px_8px]">
          <span className="glyph16-bold mobile:hidden">My Points</span>
          <span className="flex items-center gap-[6px] glyph32-bold mobile:glyph15-bold">
            <Image width={28} height={28} src="/shop/coin.webp" alt="coin" />
            {addNumberComma(data.points)}P
          </span>
        </div>
      );
    }),
);
