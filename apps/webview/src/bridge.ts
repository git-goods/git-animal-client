import { bridge } from './utils/bridge';
import { bridgeUtils } from './utils/bridgeUtils';
import { setupNavigationHandler } from './handlers/navigationHandler';

let cleanupFunctions: (() => void)[] = [];

export function initializeBridge() {
  console.log('Initializing WebView bridge...');

  try {
    const navigationCleanup = setupNavigationHandler();
    console.log('Navigation handler setup completed');

    if (navigationCleanup) {
      cleanupFunctions.push(navigationCleanup);
      console.log('Navigation cleanup function added');
    }

    // 토큰 리스너 설정
    console.log('About to setup token listener...');
    bridgeUtils.setupTokenListener();
    console.log('Token listener setup completed');

    // 브릿지를 전역에서 접근할 수 있도록 설정
    if (typeof window !== 'undefined') {
      (window as any).__bridge = bridge;
      console.log('Bridge set to window.__bridge');
    }

    console.log('WebView bridge initialized successfully');
  } catch (error) {
    console.error('Error during bridge initialization:', error);
  }
}

export function cleanupBridge() {
  console.log('Cleaning up WebView bridge...');

  // 모든 정리 함수 실행
  cleanupFunctions.forEach((cleanup) => cleanup());
  cleanupFunctions = [];

  // 브릿지 정리
  bridge.destroy();

  console.log('WebView bridge cleaned up');
}

// 개발 환경에서만 상세 로그 출력
if (process.env.NODE_ENV === 'development') {
  bridge.on('*', (data) => {
    console.log('Bridge message:', data);
  });
}
