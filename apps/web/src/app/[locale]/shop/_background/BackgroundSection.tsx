/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';
import type { Background } from '@gitanimals/api';
import { useScrollHeading } from '@gitanimals/react';
import { renderUserQueries, shopQueries, useBuyBackground } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { Button } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import EmblaCarousel from '@/components/EmblaCarousel';
import { trackEvent } from '@/lib/analytics';
import { getQueryClient } from '@/lib/react-query/queryClient';
import { useClientUser } from '@/utils/clientAuth';
import { getBackgroundImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

export const BackgroundSection = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function BackgroundSection() {
    // url에 '#background'라는 해쉬값이 있으면 아래 h2 태그로 스크롤되는 이벤트 처리
    const backgroundRef = useScrollHeading('background');

    const t = useTranslations('Shop.Background');
    const { name } = useClientUser();
    const {
      data: { backgrounds },
    } = useSuspenseQuery(shopQueries.backgroundOptions());
    const { data: myBackground } = useQuery(renderUserQueries.getMyBackground(name));

    const queryClient = getQueryClient();
    const { mutate: buyBackground } = useBuyBackground({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: renderUserQueries.getMyBackground(name).queryKey });

        toast.success(t('buy-success'));
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
        console.error('error: ', error);
      },
    });

    const backgroundList = (backgrounds ?? [])
      .map((item) => ({
        ...item,
        isPurchased: myBackground?.backgrounds.some((bg) => bg.type === item.type),
      }))
      .sort((a, b) => {
        if (a.isPurchased === b.isPurchased) return 0;
        return a.isPurchased ? 1 : -1;
      });

    const handleBuyBackground = (type: string) => {
      buyBackground({ type });
      trackEvent('buy-background', { background: type });
    };

    return (
      <div className={sectionCss}>
        <h2 ref={backgroundRef} className={h2Css}>
          Background
        </h2>
        <EmblaCarousel>
          {backgroundList?.map((item) => (
            <BackgroundItem
              key={item.type}
              item={item}
              onBuy={handleBuyBackground}
              isPurchased={item.isPurchased ?? false}
            />
          ))}
        </EmblaCarousel>
      </div>
    );
  });

const EVENT_BACKGROUND = ''; // TODO: 이벤트 배경 타입

function BackgroundItem({
  item,
  onBuy,
  isPurchased,
}: {
  item: Background;
  onBuy: (type: string) => void;
  isPurchased: boolean;
}) {
  const t = useTranslations('Shop.Background');

  const isEvent = item.type === EVENT_BACKGROUND;

  return (
    <div className={cardCss} key={item.type}>
      {isEvent && <div className={eventLabelCss}>{t('event-sale')}</div>}
      <div className={cn(cardImageCss, isPurchased && purchasedCardImageCss)}>
        <img src={getBackgroundImage(item.type)} alt={item.type} width={550} height={275} />
      </div>
      <div className={cardPointStyle}>{addNumberComma(item.price)} P</div>
      <Button variant="secondary" onClick={() => onBuy(item.type)} disabled={isPurchased}>
        {isPurchased ? t('purchased') : t('buy')}
      </Button>
    </div>
  );
}

const eventLabelCss = cn(
  'absolute top-3 left-3 z-floating',
  'inline-flex py-1.5 px-3 items-center gap-0.5',
  'rounded-lg bg-[#FF3030]',
  'font-product text-glyph-18 font-bold text-white'
);

const sectionCss = cn(
  'relative flex flex-col items-center',
  'py-[120px] px-5 w-full bg-[#6DE575]',
  "before:content-[''] before:absolute before:top-[-2px] before:left-0 before:right-0 before:h-0.5 before:bg-[#6DE575]",
  'max-mobile:py-10 max-mobile:px-4'
);

const h2Css = cn(
  'font-product text-glyph-82 font-bold text-black mb-20',
  'max-mobile:mb-10 max-mobile:text-glyph-40'
);

const cardCss = cn(
  'w-full flex flex-col items-center justify-center relative'
);

const cardImageCss = cn(
  'w-full aspect-[2/1] relative'
);

const purchasedCardImageCss = cn(
  'brightness-50 cursor-not-allowed'
);

const cardPointStyle = cn(
  'font-product text-glyph-18 font-bold text-black/75',
  'border border-[#3FB458] bg-[#56CA6F]',
  'mt-1 mb-6 py-1 px-[25px] w-full'
);
