'use client';

import { useEffect, useState } from 'react';

interface DeviceInfo {
  isPWA: boolean;
  deviceType: 'iOS' | 'Android' | 'Other';
  isStandalone: boolean;
  browser: 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Opera' | 'Samsung' | 'Unknown';
}

export function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isPWA: false,
    deviceType: 'Other',
    isStandalone: false,
    browser: 'Unknown',
  });

  useEffect(() => {
    // PWA 환경 확인 함수
    const isPWA = () => {
      // standalone 모드 확인 (안드로이드, iOS 모두 적용)
      if (window.matchMedia('(display-mode: standalone)').matches) return true;

      // iOS Safari에서 홈 화면에 추가된 경우 확인
      if ('standalone' in window.navigator && (window.navigator as any).standalone === true) return true;

      // Android TWA(Trusted Web Activity) 확인
      if (document.referrer.includes('android-app://')) return true;

      // display-mode가 fullscreen, minimal-ui인 경우도 PWA로 간주
      if (window.matchMedia('(display-mode: fullscreen)').matches) return true;
      if (window.matchMedia('(display-mode: minimal-ui)').matches) return true;

      return false;
    };

    // 디바이스 타입 확인 함수
    const getDeviceType = (): 'iOS' | 'Android' | 'Other' => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

      // iOS 확인
      if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return 'iOS';
      }

      // Android 확인
      if (/android/i.test(userAgent)) {
        return 'Android';
      }

      return 'Other';
    };

    // 브라우저 타입 확인 함수
    const getBrowserType = (): 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Opera' | 'Samsung' | 'Unknown' => {
      const userAgent = navigator.userAgent;

      // Edge 확인 (Chromium 기반 Edge는 Chrome과 Edge 모두 포함)
      if (userAgent.indexOf('Edg') !== -1) {
        return 'Edge';
      }

      // Chrome 확인
      if (
        userAgent.indexOf('Chrome') !== -1 &&
        userAgent.indexOf('OPR') === -1 &&
        userAgent.indexOf('Samsung') === -1
      ) {
        return 'Chrome';
      }

      // Safari 확인 (Chrome이 아니면서 Safari 문자열 포함)
      if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
        return 'Safari';
      }

      // Firefox 확인
      if (userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox';
      }

      // Opera 확인
      if (userAgent.indexOf('OPR') !== -1 || userAgent.indexOf('Opera') !== -1) {
        return 'Opera';
      }

      // Samsung 브라우저 확인
      if (userAgent.indexOf('Samsung') !== -1) {
        return 'Samsung';
      }

      return 'Unknown';
    };

    // standalone 모드 확인
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as any).standalone === true);

    setDeviceInfo({
      isPWA: isPWA(),
      deviceType: getDeviceType(),
      isStandalone,
      browser: getBrowserType(),
    });

    // display-mode가 변경될 때 이벤트 리스너 추가
    const mediaQueryList = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDeviceInfo((prev) => ({ ...prev, isStandalone: e.matches, isPWA: isPWA() }));
    };

    // 브라우저 호환성을 위한 이벤트 리스너 추가 방식
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else if ((mediaQueryList as any).addListener) {
      // Safari 이전 버전 지원
      (mediaQueryList as any).addListener(handleChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else if ((mediaQueryList as any).removeListener) {
        (mediaQueryList as any).removeListener(handleChange);
      }
    };
  }, []);

  return deviceInfo;
}

export function PWADetector() {
  const { isPWA, deviceType, isStandalone, browser } = useDeviceInfo();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div>
      <p>디바이스 타입: {deviceType}</p>
      <p>브라우저: {browser}</p>
      <p>PWA 환경: {isPWA ? '네' : '아니오'}</p>
      <p>Standalone 모드: {isStandalone ? '네' : '아니오'}</p>
    </div>
  );
}
