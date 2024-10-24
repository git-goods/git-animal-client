'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { couponQueries, renderQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import useEffectOnce from '@/hooks/lifeCycle/useEffectOnce';
import { usePathname, useRouter } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';
import { useClientSession } from '@/utils/clientAuth';
import { sendLog } from '@/utils/log';

import { NOTICE_LIST } from './notice';

const generationNoticeKey = (noticeKey: string) => {
  return `notice_${noticeKey}`;
};

function NoticeToast() {
  const t = useTranslations('NoticeToast');
  const router = useRouter();
  const { status } = useClientSession();
  const isLogin = status === 'authenticated';

  const setViewNoticeItem = (id: string | number) => {
    const viewStorageData = window.localStorage.getItem('viewNotice');
    const viewList = viewStorageData ? JSON.parse(viewStorageData) : [];

    viewList.push(id);
    window.localStorage.setItem('viewNotice', JSON.stringify(viewList));
  };

  const getRenderNoticeList = () => {
    const viewStorageData = window.localStorage.getItem('viewNotice');

    const visibleNoticeList = NOTICE_LIST.filter((notice) => notice.visible);

    if (!viewStorageData) {
      return visibleNoticeList;
    }

    const viewList = JSON.parse(viewStorageData);

    return visibleNoticeList.filter((notice) => !viewList.includes(generationNoticeKey(notice.key)));
  };

  const renderToast = (notice: (typeof NOTICE_LIST)[number]) => {
    const toastId = generationNoticeKey(notice.key);
    if (notice?.isAuth && notice.isAuth !== isLogin) return;

    toast(t(notice.label), {
      id: toastId,
      duration: Infinity,
      className: 'notice-toast',
      position: 'top-right',
      onDismiss: () => {
        setViewNoticeItem(toastId);
        sendLog({ noticeKey: toastId, type: 'notice' }, 'notice toast dismiss');
      },
      onAutoClose: () => setViewNoticeItem(toastId),
      ...notice,
      action: notice.redirect
        ? {
            label: t(notice.redirect.label),
            onClick: () => {
              notice.redirect?.isOutLink ? window.open(notice.redirect.url) : router.push(notice.redirect.url);
              setViewNoticeItem(toastId);
              sendLog({ noticeKey: toastId, type: 'notice' }, `notice : ${notice.redirect.label}`);
            },
          }
        : undefined,
    });
  };

  useEffectOnce(() => {
    const renderList = getRenderNoticeList();

    renderList.forEach((notice) => renderToast(notice));
  });

  return (
    <>
      <HalloweenEventToast />
    </>
  );
}

export default NoticeToast;

const HALLOWEEN_EVENT_CODE = 'HALLOWEEN_2024';
const HALLOWEEN_STAR_BONUS_EVENT_CODE = 'HALLOWEEN_2024_STAR_BONUS';

const HalloweenEventToast = wrap
  .ErrorBoundary({ fallback: null })
  .Suspense()
  .on(() => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const t = useTranslations('Event.Halloween');

    const [isShowToast, setIsShowToast] = useState(false);

    const isHalloweenEventPage = pathname === `/event/${HALLOWEEN_EVENT_CODE}`;
    const isHalloweenStarBonusEventPage = pathname === `/event/${HALLOWEEN_STAR_BONUS_EVENT_CODE}`;

    const showToast = (message: string, pathname: string) => {
      if (isShowToast) {
        return;
      }
      setIsShowToast(true);
      toast.info(message, {
        duration: Infinity,
        className: 'notice-toast',
        position: 'top-right',
        action: {
          label: t('go'),
          onClick: () => {
            trackEvent('halloween-event-toast-click', { pathname });
            router.push(pathname);
          },
        },
      });
    };

    useEffectOnce(() => {
      if (isHalloweenEventPage || isHalloweenStarBonusEventPage) {
        return;
      }
      if (!session?.user.name) {
        showToast(t('not-login-toast'), `/event/${HALLOWEEN_EVENT_CODE}`);
      }
    });

    if (!session?.user.name) {
      return null;
    }

    const {
      data: { isPressStar },
    } = useSuspenseQuery(renderQueries.isPressStar({ login: session.user.name }));

    const { data: usedCoupons } = useSuspenseQuery({
      ...couponQueries.getUsedCoupons(),
    });
    const isUsedHalloweenCoupon = usedCoupons?.coupons.some((coupon) => coupon.code === HALLOWEEN_EVENT_CODE);
    const isUsedStarBonusCoupon = usedCoupons?.coupons.some(
      (coupon) => coupon.code === HALLOWEEN_STAR_BONUS_EVENT_CODE,
    );

    useEffectOnce(() => {
      if (!isUsedHalloweenCoupon && !isHalloweenEventPage) {
        showToast(t('result-halloween-coupon'), `/event/${HALLOWEEN_EVENT_CODE}`);
      }
      if (isUsedHalloweenCoupon && !isUsedStarBonusCoupon && !isPressStar && !isHalloweenStarBonusEventPage) {
        showToast(t('result-halloween-star-bonus-coupon-already-star'), `/event/${HALLOWEEN_STAR_BONUS_EVENT_CODE}`);
      }
      if (isUsedHalloweenCoupon && isUsedStarBonusCoupon && !isPressStar && !isHalloweenStarBonusEventPage) {
        showToast(t('result-halloween-star-bonus-coupon'), `/event/${HALLOWEEN_STAR_BONUS_EVENT_CODE}`);
      }
    });

    return <></>;
  });
