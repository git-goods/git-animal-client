import mixpanel from 'mixpanel-browser';

import { isProd } from '@/constants/env';

const MIXPANEL_TOKEN = '3e01e631ae4efb8019bbcdf2fb401209';

export const initAnalytics = () => {
  if (!isProd) return;
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== 'production',
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: true,
  });

  // GA는 별도의 초기화가 필요 없음 (Google Analytics 컴포넌트에서 이미 처리됨)
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!isProd) return;
  // Mixpanel에 이벤트 전송
  mixpanel.track(eventName, properties);

  // Google Analytics에 이벤트 전송
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  } else {
    console.warn('Google Analytics not loaded');
  }
};

// 페이지 뷰 추적을 위한 함수
export const trackPageView = (url: string) => {
  if (!isProd) return;
  // Mixpanel 페이지 뷰 추적
  mixpanel.track('Page View', { url });

  // Google Analytics 페이지 뷰 추적
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
      page_path: url,
    });
  }
};
