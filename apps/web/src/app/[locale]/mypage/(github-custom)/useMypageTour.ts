import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { buttonVariants, cn } from '@gitanimals/ui-tailwind';
import type { DriveStep, PopoverDOM } from 'driver.js';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';

import { hasSeen, markSeen } from './guideStorage';

type TourType = 'farm' | 'line';

const STEPS: Record<TourType, string[]> = {
  farm: ['preview', 'pet', 'background', 'publish'],
  line: ['preview', 'pet', 'publish'],
};

const POPOVER_STYLE =
  'mypage-tour bg-gray-150 text-white rounded-2xl border border-solid border-white-alpha-10 p-5 min-w-[280px] max-w-[320px] shadow-lg';

const PART_STYLE = {
  title: 'glyph16-bold text-white',
  description: 'glyph14-regular text-white-alpha-75',
  progress: 'glyph12-regular text-white-alpha-50',
  closeButton: 'text-white-alpha-50 hover:text-white focus-visible:text-white',
} as const;

// driver.css 기본 스타일을 서비스 Dialog(sm)·Button 과 같은 모양으로 덮는다
const applyServiceStyle = (popover: PopoverDOM) => {
  for (const [part, style] of Object.entries(PART_STYLE) as [keyof typeof PART_STYLE, string][]) {
    popover[part].className = cn(popover[part].className, style);
  }
  for (const [button, variant] of [
    [popover.previousButton, 'secondary'],
    [popover.nextButton, 'primary'],
  ] as const) {
    button.className = cn(
      button.className,
      buttonVariants({ variant, size: 's' }),
      'inline-flex items-center justify-center px-[16px]',
    );
    // driver 기본 버튼 hover 배경(#f7f7f7)이 서비스 버튼 색을 이겨서 기본 클래스를 뗀다
    button.classList.remove('driver-popover-footer-btn');
  }
};

export function useMypageTour(type: TourType) {
  const t = useTranslations('Mypage.Tour');

  useEffect(() => {
    const key = `${LOCAL_STORAGE_KEY.mypageTourSeen}:${type}`;
    if (hasSeen(key)) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    // 이미 본 사람은 driver.js 를 받지 않도록 필요할 때만 불러온다
    import('driver.js').then(({ driver }) => {
      if (cancelled) return;

      const steps: DriveStep[] = STEPS[type].map((name) => ({
        // Suspense fallback 으로 비어 있는 영역은 건너뛴다
        element: `[data-tour="${name}"]:not(:empty)`,
        popover: { title: t(`${type}-${name}-title`), description: t(`${type}-${name}-desc`) },
      }));

      const tour = driver({
        showProgress: true,
        progressText: '{{current}} / {{total}}',
        closeBtnLabel: t('close'),
        skipMissingElement: true,
        // 강조 영역의 버튼이 연 Dialog 는 오버레이 아래에 깔려 조작할 수 없다
        disableActiveInteraction: true,
        overlayOpacity: 0.8,
        popoverClass: POPOVER_STYLE,
        onPopoverRender: applyServiceStyle,
        nextBtnText: t('next'),
        prevBtnText: t('prev'),
        doneBtnText: t('done'),
        steps,
        // 사용자가 닫을 때만 불림. cleanup 의 destroy() 로는 안 불려서 StrictMode 이중 실행에 '봤음'이 찍히지 않는다
        onDestroyStarted: () => {
          markSeen(key);
          tour.destroy();
        },
      });
      tour.drive();
      destroy = tour.destroy;
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [type, t]);
}
