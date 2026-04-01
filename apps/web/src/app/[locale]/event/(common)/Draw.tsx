'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { CustomException } from '@gitanimals/exception';
import { useOutsideClick } from '@gitanimals/react';
import { couponQueries, renderQueries, useUsingCoupon } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { login } from '@/components/AuthButton';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { Link, useRouter } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

interface DrawProps {
  renderCard: (type: string) => React.ReactNode;
  bonusEventCode: string;
  baseEventCode: string;
}

export const Draw = wrap.Suspense().on(({ renderCard, bonusEventCode, baseEventCode }: DrawProps) => {
  const queryClient = useQueryClient();
  const t = useTranslations('Event.Halloween');

  const { eventCode } = useParams();

  if (Array.isArray(eventCode)) {
    throw new CustomException('UNKNOWN_ERROR', 'eventCode is not string');
  }

  const { data: session } = useSession();
  const { mutate: usingCoupon, isPending } = useUsingCoupon();

  const [drawedPet, setDrawedPet] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isStarBonusEvent = eventCode === bonusEventCode;
  const upperCaseEventCode = eventCode.toUpperCase();

  const onClickOutside = () => {
    setDrawedPet(null);
  };

  useOutsideClick(modalRef, onClickOutside);

  const { data: usedCoupons, isLoading: isLoadingUsedCoupons } = useQuery({
    ...couponQueries.usedCouponsOptions(),
    enabled: Boolean(session),
  });

  const isUsedCoupon = usedCoupons?.coupons.some((coupon) => coupon.code === upperCaseEventCode);

  const onClickDraw = () => {
    if (!session) {
      login(`/event/${baseEventCode}`);
      trackEvent(baseEventCode, {
        type: 'not-signed-in',
        coupon: upperCaseEventCode,
      });

      return;
    }

    usingCoupon(
      { code: upperCaseEventCode },
      {
        onSuccess: (res) => {
          trackEvent(baseEventCode, {
            type: 'success',
            pet: res.result,
            coupon: upperCaseEventCode,
          });
          setDrawedPet(res.result);
          queryClient.invalidateQueries({ queryKey: couponQueries.usedCouponsKey() });
        },
        onError: (error) => {
          toast.error(t('draw-error'));
          sendMessageToErrorChannel(
            `이벤트 실패, 이벤트 코드: ${upperCaseEventCode}, 사용자: ${session.user?.name}\n${error.message} ${error.name}`,
          );
          trackEvent(baseEventCode, {
            type: 'error',
            coupon: upperCaseEventCode,
          });
        },
      },
    );
  };

  const drawButtonText = (() => {
    if (!session) {
      return t('draw-button-not-signed-in');
    }

    if (isStarBonusEvent) {
      return t('draw-more-button');
    }

    return t('draw-button');
  })();

  return (
    <>
      <Button
        disabled={isPending || isLoadingUsedCoupons || isUsedCoupon}
        className="w-[230px] h-[76px] mx-auto mt-[63px] font-product text-glyph-28 font-bold"
        onClick={onClickDraw}
      >
        {drawButtonText}
      </Button>

      <AnimatePresence mode="wait">
        {drawedPet && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-drawer" ref={modalRef}>
            <motion.div
              className="p-6 bg-gray-150 rounded-2xl text-white min-w-[400px] h-auto flex flex-col justify-center items-center"
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className="font-product text-glyph-28 font-bold mb-5">{t('result-title')}</span>
              {renderCard(drawedPet)}

              <Link href="/mypage" className="font-product text-glyph-16 font-bold mt-6 mb-3 cursor-pointer underline">
                {t('result-apply')}
              </Link>

              <StarAnchor bonusEventCode={bonusEventCode} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.1 },
  animate: {
    opacity: [0, 1, 1],
    scale: [0.1, 0.2, 1.15, 1],
    transition: {
      scale: {
        duration: 1.2,
        times: [0, 0.3, 0.6, 1],
        ease: ['easeOut', 'easeOut', 'easeInOut'],
      },
    },
  },
  exit: { opacity: 0, scale: 0.9 },
};

const StarAnchor = wrap
  .ErrorBoundary({ fallback: null })
  .Suspense()
  .on(({ bonusEventCode }: { bonusEventCode: string }) => {
    const t = useTranslations('Event.Halloween');
    const router = useRouter();

    const { data: session } = useSession();
    const { eventCode } = useParams();

    if (!session?.user.name) {
      throw new CustomException('UNKNOWN_ERROR', 'session.user.name is undefined');
    }

    const {
      data: { isPressStar },
    } = useSuspenseQuery(renderQueries.isPressStar({ login: session.user.name }));

    const isStarBonusEvent = eventCode === bonusEventCode;

    const onClickFirstEvent = () => {
      router.replace(`/event/${bonusEventCode}`);
    };

    if (isStarBonusEvent) {
      return null;
    }

    if (isPressStar) {
      return (
        <Button>
          <Link href={`/event/${bonusEventCode}`}>{t('result-already-star')}</Link>
        </Button>
      );
    }

    return (
      <Button>
        <a href={GIT_ANIMALS_MAIN_URL} target="_blank" onClick={onClickFirstEvent}>
          {t('result-star-again')}
        </a>
      </Button>
    );
  });
