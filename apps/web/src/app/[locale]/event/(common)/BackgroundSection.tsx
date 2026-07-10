/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';
import type { Background } from '@gitanimals/api';
import { renderUserQueries, shopQueries, useBuyBackground } from '@gitanimals/react-query';
import { Button, cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import EmblaCarousel from '@/components/EmblaCarousel';
import { trackEvent } from '@/lib/analytics';
import { useClientUser } from '@/hooks/clientAuth';
import { getBackgroundImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface BackgroundSectionProps {
  possibleBgTypes: string[];
}
// apps/web/src/app/[locale]/shop/BackgroundSection/BackgroundSection.tsx
// TODO : 위의 컴포넌트와 유사합니다. 리팩토링이 필요합니다.
export const BackgroundSection = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({ fallback: <></> })
  .on(function BackgroundSection({ possibleBgTypes }: BackgroundSectionProps) {
    const t = useTranslations('Shop.Background');
    const queryClient = useQueryClient();
    const { name } = useClientUser();
    const {
      data: { backgrounds },
    } = useSuspenseQuery({
      ...shopQueries.backgroundOptions(),
      select: (data) => ({
        ...data,
        backgrounds: data.backgrounds.filter((bg) => possibleBgTypes.includes(bg.type)),
      }),
    });
    const { data: myBackground } = useQuery(renderUserQueries.getMyBackground(name));
    const isLoggedIn = Boolean(name);

    const { mutate: buyBackground } = useBuyBackground({
      onSuccess: () => {
        toast.success(t('buy-success'));
        queryClient.invalidateQueries({ queryKey: renderUserQueries.backgroundKey(name) });
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
      if (!isLoggedIn) {
        toast.error(t('buy-possible-user'));
        return;
      }
      buyBackground({ type });
      trackEvent('buy-background', { background: type });
    };

    return (
      <div className="relative flex flex-col items-center py-[120px] px-[20px] w-full bg-[linear-gradient(180deg,#FFF_0%,#A7DEF6_100%)]">
        <h2 className="glyph82-bold text-black mb-[80px] mobile:glyph40-bold mobile:mb-[30px]">Background</h2>
        <EmblaCarousel>
          {backgroundList?.map((item) => (
            <BackgroundItem
              key={item.type}
              item={item}
              onBuy={handleBuyBackground}
              isPurchased={item.isPurchased ?? false}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </EmblaCarousel>
      </div>
    );
  });

function BackgroundItem({
  item,
  onBuy,
  isPurchased,
  isLoggedIn,
}: {
  item: Background;
  onBuy: (type: string) => void;
  isPurchased: boolean;
  isLoggedIn: boolean;
}) {
  const t = useTranslations('Shop.Background');

  return (
    <div className="w-full flex flex-col items-center justify-center relative" key={item.type}>
      <div
        className={cn('w-full aspect-[2/1] bg-white relative', isPurchased && 'brightness-50 cursor-not-allowed')}
      >
        <img src={getBackgroundImage(item.type)} alt={item.type} width={550} height={275} />
      </div>
      <div className="glyph18-bold text-black-75 border border-solid border-[#99C7DB] bg-[#DDF2FB] mt-[4px] mb-[24px] py-[4px] px-[25px] w-full">
        {addNumberComma(item.price)} P
      </div>
      <Button variant="secondary" onClick={() => onBuy(item.type)} disabled={isPurchased} className="min-w-[120px]">
        {!isLoggedIn ? t('buy-possible-user') : isPurchased ? t('purchased') : t('buy')}
      </Button>
    </div>
  );
}
