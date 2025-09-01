import { bridge } from '../utils/bridge';

export function setupNavigationHandler() {
  function wrap(fn: Function) {
    return function wrapper(this: any, ...args: any[]) {
      const res = fn.apply(this, args);
      bridge.sendToApp('navigation', {
        url: window.location.href,
        canGoBack: window.history.length > 1,
      });
      return res;
    };
  }

  // 히스토리 API 래핑
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = wrap(originalPushState);
  history.replaceState = wrap(originalReplaceState);

  // popstate 이벤트 리스너
  const handlePopState = () => {
    bridge.sendToApp('navigation', {
      url: window.location.href,
      canGoBack: window.history.length > 1,
    });
  };

  window.addEventListener('popstate', handlePopState);

  // 초기 네비게이션 상태 전송
  bridge.sendToApp('navigation', {
    url: window.location.href,
    canGoBack: window.history.length > 1,
  });

  // 정리 함수 반환
  return () => {
    history.pushState = originalPushState;
    history.replaceState = originalReplaceState;
    window.removeEventListener('popstate', handlePopState);
  };
}
