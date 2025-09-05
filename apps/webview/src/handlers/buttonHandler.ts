import { bridge } from '../utils/bridge';

export function setupButtonHandlers() {
  // GitHub 로그인 버튼 핸들러
  const loginSelectors = [
    '[data-testid="github-login-button"]',
    '[data-testid="login-button"]',
    'button:contains("GitHub")',
    'a:contains("GitHub")',
    '.github-login-button',
    '#github-login-button',
  ];

  // 로그아웃 버튼 핸들러 (Navigation 컴포넌트의 버튼은 제외)
  const logoutSelectors = [
    'button:contains("logout")',
    '[data-testid="logout-button"]',
    '.logout-button',
    '#logout-button',
    'button:contains("로그아웃")',
    'a:contains("로그아웃")',
  ];

  // Navigation 컴포넌트의 로그아웃 버튼은 제외 (이미 브릿지와 연결됨)
  const excludeSelectors = [
    'nav button', // Navigation 컴포넌트 내의 버튼들
  ];

  function addLoginHandler(element: Element) {
    element.addEventListener('click', function (e: Event) {
      e.preventDefault();
      e.stopPropagation();
      bridge.sendToApp('GITHUB_LOGIN');
    });
  }

  function addLogoutHandler(element: Element) {
    // Navigation 컴포넌트 내의 버튼은 제외
    if (element.closest('nav')) {
      return;
    }
    
    element.addEventListener('click', function (e: Event) {
      e.preventDefault();
      e.stopPropagation();
      bridge.sendToApp('LOGOUT');
    });
  }

  function attachHandlers() {
    // 로그인 버튼 핸들러 추가
    loginSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(addLoginHandler);
    });

    // 로그아웃 버튼 핸들러 추가
    logoutSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(addLogoutHandler);
    });
  }

  // 초기 핸들러 연결
  attachHandlers();

  // 동적으로 추가되는 버튼을 위한 MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        attachHandlers();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // 정리 함수 반환
  return () => {
    observer.disconnect();
  };
}
