import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { driver, type DriveStep } from 'driver.js';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';

type TourType = 'farm' | 'line';

const STEPS: Record<TourType, string[]> = {
  farm: ['preview', 'pet', 'background', 'publish'],
  line: ['preview', 'pet', 'publish'],
};

export const tourTarget = (name: string) => ({ 'data-tour': name });

export function useMypageTour(type: TourType) {
  const t = useTranslations('Mypage.Tour');

  useEffect(() => {
    const key = `${LOCAL_STORAGE_KEY.mypageTourSeen}:${type}`;
    try {
      if (localStorage.getItem(key) === 'true') return;
    } catch {
      return;
    }

    const steps: DriveStep[] = STEPS[type].map((name) => ({
      element: `[data-tour="${name}"]`,
      popover: { title: t(`${type}-${name}-title`), description: t(`${type}-${name}-desc`) },
    }));

    const tour = driver({
      showProgress: true,
      nextBtnText: t('next'),
      prevBtnText: t('prev'),
      doneBtnText: t('done'),
      steps,
      // 사용자가 닫을 때만 불림. cleanup 의 destroy() 로는 안 불려서 StrictMode 이중 실행에 '봤음'이 찍히지 않는다
      onDestroyStarted: () => {
        try {
          localStorage.setItem(key, 'true');
        } catch {}
        tour.destroy();
      },
    });
    tour.drive();

    return () => tour.destroy();
  }, [type, t]);
}
