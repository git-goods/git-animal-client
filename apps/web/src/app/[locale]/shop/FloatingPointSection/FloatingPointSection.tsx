'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
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
      // const { data } = useGetSuspenseUser();

      return (
        <div className={divCss}>
          <span className={titleCss}>My Points</span>
          <span className={pointCss}>
            <Image width={28} height={28} src="/shop/coin.webp" alt="coin" />
            {addNumberComma(data.points)}
          </span>
        </div>
      );
    }),
);

const divCss = css({
  position: 'fixed',
  top: '88px',
  left: '20px',
  w: 'fit-content',
  padding: '12px 16px',
  borderRadius: '12px',
  backgroundColor: 'black.black_25',
  zIndex: '1000',

  display: 'flex',
  flexDir: 'column',
  gap: '4px',
  color: 'white_100',
  backdropFilter: 'blur(7px)',
});

const titleCss = css({
  textStyle: 'glyph16.bold',
});

const pointCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  textStyle: 'glyph32.bold',
});
