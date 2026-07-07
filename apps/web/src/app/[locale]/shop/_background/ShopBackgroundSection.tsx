/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';
import type { Background } from '@gitanimals/api';
import { useScrollHeading } from '@gitanimals/react';
import { renderUserQueries, shopQueries, useBuyBackground } from '@gitanimals/react-query';
import { Button, cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import EmblaCarousel from '@/components/EmblaCarousel';
import { trackEvent } from '@/lib/analytics';
import { getQueryClient } from '@/lib/react-query/queryClient';
import { useClientUser } from '@/hooks/clientAuth';
import { getBackgroundImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

export const ShopBackgroundSection = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function ShopBackgroundSection() {
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
      <div className="relative flex flex-col items-center p-[120px_20px] w-full bg-[#6DE575] before:content-[''] before:absolute before:top-[-2px] before:left-0 before:right-0 before:h-[2px] before:bg-[#6DE575] mobile:p-[40px_16px]">
        <h2
          ref={backgroundRef}
          className="glyph82-bold text-black mb-[80px] mobile:mb-[40px] mobile:glyph40-bold"
        >
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
    <div className="w-full flex flex-col items-center justify-center relative" key={item.type}>
      {isEvent && (
        <div className="absolute top-[12px] left-[12px] z-floating inline-flex p-[6px_12px] items-center gap-[2px] rounded-[8px] bg-[#FF3030] glyph18-bold text-white">
          {t('event-sale')}
        </div>
      )}
      <div
        className={cn(
          'w-full aspect-[2/1] relative',
          isPurchased && 'brightness-[0.5] cursor-not-allowed',
        )}
      >
        <img src={getBackgroundImage(item.type)} alt={item.type} width={550} height={275} />
      </div>
      <div className="glyph18-bold text-black-75 border border-[#3FB458] bg-[#56CA6F] mt-[4px] mb-[24px] p-[4px_25px] w-full">
        {addNumberComma(item.price)} P
      </div>
      <Button variant="secondary" onClick={() => onBuy(item.type)} disabled={isPurchased}>
        {isPurchased ? t('purchased') : t('buy')}
      </Button>
    </div>
  );
}
