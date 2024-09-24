'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { wrap } from '@suspensive/react';

import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

export const FloatingPointSection = memo(
  wrap
    .Suspense({ fallback: null })
    .ErrorBoundary({ fallback: null })
    .on(function FloatingPointSection() {
      const { data } = useGetSuspenseUser();

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
  top: 88,
  left: 20,
  w: 'fit-content',
  padding: '12px 16px',
  borderRadius: '12px',
  backgroundColor: 'black.black_25',
  zIndex: '1000',

  display: 'flex',
  flexDir: 'column',
  gap: 4,
  color: 'white_100',
  backdropFilter: 'blur(7px)',
});

const titleCss = css({
  textStyle: 'glyph16.bold',
});

const pointCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  textStyle: 'glyph32.bold',
});
