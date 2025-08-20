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

      return (
        <div className={divCss}>
          <span className={pointCss}>
            <Image width={28} height={28} src="/assets/shop/coin.webp" alt="coin" />
            {addNumberComma(data.points)}P
          </span>
        </div>
      );
    }),
);

const divCss = css({
  position: 'fixed',
  top: '36px',
  left: '20px',
  w: 'fit-content',
  borderRadius: '12px',
  backgroundColor: 'black.black_25',
  zIndex: 'sticky',

  display: 'flex',
  flexDir: 'column',
  gap: '4px',
  color: 'white_100',
  backdropFilter: 'blur(7px)',

  padding: '6px 10px 6px 8px',
});

const pointCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  textStyle: 'glyph15.bold',
});
