import { bridge } from './utils/bridge';
import { setupTokenHandler } from './handlers/tokenHandler';
import { setupLogoutHandler } from './handlers/logoutHandler';
import { setupButtonHandlers } from './handlers/buttonHandler';
import { setupNavigationHandler } from './handlers/navigationHandler';

let cleanupFunctions: (() => void)[] = [];

export function initializeBridge() {
  console.log('Initializing WebView bridge...');

  // 각 핸들러 설정
  setupTokenHandler();
  setupLogoutHandler();

  const buttonCleanup = setupButtonHandlers();
  const navigationCleanup = setupNavigationHandler();

  if (buttonCleanup) cleanupFunctions.push(buttonCleanup);
  if (navigationCleanup) cleanupFunctions.push(navigationCleanup);

  // 브릿지를 전역에서 접근할 수 있도록 설정
  if (typeof window !== 'undefined') {
    (window as any).__bridge = bridge;
  }

  console.log('WebView bridge initialized');
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
