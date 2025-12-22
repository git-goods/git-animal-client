/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import type { Background } from '@gitanimals/api';
import { useScrollHeading } from '@gitanimals/react';
import { renderUserQueries, shopQueries, useBuyBackground } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
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
      <div className={cx(cardImageCss, isPurchased && purchasedCardImageCss)}>
        <img src={getBackgroundImage(item.type)} alt={item.type} width={550} height={275} />
      </div>
      <div className={cardPointStyle}>{addNumberComma(item.price)} P</div>
      <Button variant="secondary" onClick={() => onBuy(item.type)} disabled={isPurchased}>
        {isPurchased ? t('purchased') : t('buy')}
      </Button>
    </div>
  );
}

const eventLabelCss = css({
  position: 'absolute',
  top: '12px',
  left: '12px',
  zIndex: 'floating',
  display: 'inline-flex',
  padding: '6px 12px',
  alignItems: 'center',
  gap: '2px',
  borderRadius: '8px',
  background: '#FF3030',
  textStyle: 'glyph18.bold',
  color: 'white',
});

const sectionCss = css({
  position: 'relative',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  padding: '120px 20px',
  width: '100%',
  bg: '#6DE575',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '0',
    right: '0',
    height: '2px',
    bg: '#6DE575',
  },

  _mobile: {
    padding: '40px 16px',
  },
});

const h2Css = css({
  textStyle: 'glyph82.bold',
  color: 'black',
  marginBottom: '80px',

  _mobile: {
    marginBottom: '40px',
    textStyle: 'glyph40.bold',
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
  position: 'relative',
});

const purchasedCardImageCss = css({
  filter: 'brightness(0.5)',
  cursor: 'not-allowed',
});

const cardPointStyle = css({
  textStyle: 'glyph18.bold',
  color: 'black.black_75',
  border: '1px solid #3FB458',
  background: '#56CA6F',
  mt: '4px',
  mb: '24px',
  p: '4px 25px',
  w: '100%',
});
