/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import type { Background } from '@gitanimals/api';
import { renderUserQueries, shopQueries, useBuyBackground } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import EmblaCarousel from '@/components/EmblaCarousel';
import { trackEvent } from '@/lib/analytics';
import { useClientUser } from '@/utils/clientAuth';
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
      <div className={sectionCss}>
        <h2 className={h2Css}>Background</h2>
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
    <div className={cardCss} key={item.type}>
      <div className={cx(cardImageCss, isPurchased && purchasedCardImageCss)}>
        <img src={getBackgroundImage(item.type)} alt={item.type} width={550} height={275} />
      </div>
      <div className={cardPointStyle}>{addNumberComma(item.price)} P</div>
      <Button
        variant="secondary"
        onClick={() => onBuy(item.type)}
        disabled={isPurchased}
        className={css({ minWidth: '120px' })}
      >
        {!isLoggedIn ? t('buy-possible-user') : isPurchased ? t('purchased') : t('buy')}
      </Button>
    </div>
  );
}

const sectionCss = css({
  position: 'relative',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  padding: '120px 20px',
  width: '100%',
  background: 'linear-gradient(180deg, #FFF 0%, #A7DEF6 100%)',
});

const h2Css = css({
  textStyle: 'glyph82.bold',
  color: 'black',
  marginBottom: '80px',

  _mobile: {
    textStyle: 'glyph40.bold',
    marginBottom: '30px',
  },
});

const cardCss = css({
  width: '100%',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const cardImageCss = css({
  width: '100%',
  aspectRatio: '2 / 1',
  bg: 'white',
  position: 'relative',
});

const purchasedCardImageCss = css({
  filter: 'brightness(0.5)',
  cursor: 'not-allowed',
});

const cardPointStyle = css({
  textStyle: 'glyph18.bold',
  color: 'black.black_75',
  border: '1px solid #99C7DB',
  background: '#DDF2FB',
  mt: '4px',
  mb: '24px',
  p: '4px 25px',
  w: '100%',
});
