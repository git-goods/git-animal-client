import { memo } from 'react';
import { userQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { addNumberComma } from '@/utils/number';

const divCss =
  'fixed left-5 top-[88px] z-sticky flex w-fit flex-col gap-1 rounded-xl bg-black/25 py-1.5 pl-2 pr-2.5 text-white-100 backdrop-blur-[7px]';

const pointCss = 'flex items-center gap-1.5 text-glyph-15 font-bold';

export const FloatingPointSection = memo(
  wrap
    .Suspense({ fallback: null })
    .ErrorBoundary({ fallback: null })
    .on(function FloatingPointSection() {
      const { data } = useSuspenseQuery(userQueries.userOptions());

      return (
        <div className={divCss}>
          <span className={pointCss}>
            <img width={28} height={28} src="/assets/shop/coin.webp" alt="coin" />
            {addNumberComma(data.points)}P
          </span>
        </div>
      );
    }),
);
