# 웹뷰 브릿지 구현 가이드 (No Injected JavaScript)

이 문서는 웹뷰 프로젝트에서 React Native 앱과의 통신을 위한 브릿지 구현 방법을 설명합니다. `injectedJavaScript`를 사용하지 않고 웹뷰 프로젝트에서 직접 구현합니다.

> **📝 참고사항**: 이 가이드의 모든 예시 코드는 마크다운 파일로 작성되어 빌드에 포함되지 않습니다. 실제 구현 시에는 TypeScript/JavaScript 파일로 변환하여 사용하세요.

## 개요

React Native 앱의 웹뷰에서 웹 페이지로 메시지를 전송하고, 웹 페이지에서 다시 앱으로 응답을 보내는 양방향 통신을 구현합니다. 모든 JavaScript 코드는 웹뷰 프로젝트 내에서 직접 구현합니다.

## 메시지 타입

### 1. 웹뷰에서 앱으로 보내는 메시지

#### 로그아웃 요청

```javascript
window.ReactNativeWebView.postMessage(
  JSON.stringify({
    type: 'LOGOUT',
  }),
);
```

#### GitHub 로그인 요청

```javascript
window.ReactNativeWebView.postMessage(
  JSON.stringify({
    type: 'GITHUB_LOGIN',
  }),
);
```

#### 네비게이션 상태 변경

```javascript
window.ReactNativeWebView.postMessage(
  JSON.stringify({
    type: 'navigation',
    data: {
      url: window.location.href,
      canGoBack: window.history.length > 1,
    },
  }),
);
```

### 2. 앱에서 웹뷰로 보내는 메시지

#### 토큰 설정

```javascript
// 앱에서 전송
{
  type: 'SET_TOKEN',
  token: 'your-jwt-token-here'
}
```

#### 로그아웃 요청

```javascript
// 앱에서 전송
{
  type: 'LOGOUT';
}
```

## 브릿지 구현 방법

### 1. 기본 메시지 리스너 설정

```javascript
// utils/bridge.js
class WebViewBridge {
  constructor() {
    this.messageHandlers = new Map();
    this.setupMessageListener();
  }

  setupMessageListener() {
    // React Native 앱으로부터 메시지 수신
    window.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    });
  }

  handleMessage(data) {
    const handler = this.messageHandlers.get(data.type);
    if (handler) {
      handler(data);
    } else {
      console.warn('No handler for message type:', data.type);
    }
  }

  // 메시지 핸들러 등록
  on(type, handler) {
    this.messageHandlers.set(type, handler);
  }

  // 앱으로 메시지 전송
  sendToApp(type, data = {}) {
    const message = { type, ...data };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
}

export const bridge = new WebViewBridge();
```

### 2. 토큰 처리 핸들러

```javascript
// handlers/tokenHandler.js
import { bridge } from '../utils/bridge';

export function setupTokenHandler() {
  bridge.on('SET_TOKEN', async (data) => {
    console.log('Token received from app:', data.token);

    try {
      // 토큰을 서버로 전송하여 인증 처리
      const response = await fetch('/api/auth/callback/rn-webview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: data.token,
          callbackUrl: window.location.origin,
        }),
      });

      const result = await response.json();

      if (result.url) {
        // 인증 성공 시 리다이렉트
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Token processing failed:', error);
    }
  });
}
```

### 3. 로그아웃 처리 핸들러

```javascript
// handlers/logoutHandler.js
import { bridge } from '../utils/bridge';

export function setupLogoutHandler() {
  bridge.on('LOGOUT', async () => {
    console.log('Logout request received from app');

    try {
      // 웹뷰 내부 세션 로그아웃
      await fetch('/api/auth/signout', { method: 'POST' });

      // 쿠키 삭제
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      // 로컬스토리지 및 세션스토리지 삭제
      localStorage.clear();
      sessionStorage.clear();

      // 로그아웃 완료 알림
      bridge.sendToApp('LOGOUT_COMPLETED');
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러가 있어도 완료 알림
      bridge.sendToApp('LOGOUT_COMPLETED');
    }
  });
}
```

### 4. 버튼 핸들러 설정

```javascript
// handlers/buttonHandler.js
import { bridge } from '../utils/bridge';

export function setupButtonHandlers() {
  // GitHub 로그인 버튼 핸들러
  const loginSelectors = [
    '[data-testid="github-login-button"]',
    '[data-testid="login-button"]',
    'button:contains("GitHub")',
    'a:contains("GitHub")',
  ];

  // 로그아웃 버튼 핸들러
  const logoutSelectors = [
    'button:contains("logout")',
    '[data-testid="logout-button"]',
    '.logout-button',
    '#logout-button',
  ];

  function addLoginHandler(element) {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      bridge.sendToApp('GITHUB_LOGIN');
    });
  }

  function addLogoutHandler(element) {
    element.addEventListener('click', function (e) {
      e.preventDefault();
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
}
```

### 5. 네비게이션 핸들러

```javascript
// handlers/navigationHandler.js
import { bridge } from '../utils/bridge';

export function setupNavigationHandler() {
  function wrap(fn) {
    return function wrapper() {
      const res = fn.apply(this, arguments);
      bridge.sendToApp('navigation', {
        url: window.location.href,
        canGoBack: window.history.length > 1,
      });
      return res;
    };
  }

  // 히스토리 API 래핑
  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);

  // popstate 이벤트 리스너
  window.addEventListener('popstate', function () {
    bridge.sendToApp('navigation', {
      url: window.location.href,
      canGoBack: window.history.length > 1,
    });
  });
}
```

### 6. 메인 브릿지 초기화

```javascript
// bridge.js
import { bridge } from './utils/bridge';
import { setupTokenHandler } from './handlers/tokenHandler';
import { setupLogoutHandler } from './handlers/logoutHandler';
import { setupButtonHandlers } from './handlers/buttonHandler';
import { setupNavigationHandler } from './handlers/navigationHandler';

export function initializeBridge() {
  console.log('Initializing WebView bridge...');

  // 각 핸들러 설정
  setupTokenHandler();
  setupLogoutHandler();
  setupButtonHandlers();
  setupNavigationHandler();

  console.log('WebView bridge initialized');
}

// 페이지 로드 시 브릿지 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeBridge);
} else {
  initializeBridge();
}
```

## React Native 앱 설정

React Native 앱에서는 `injectedJavaScript`를 사용하지 않고, 웹뷰의 `onMessage` 이벤트만 처리합니다:

```javascript
// components/CustomWebView.tsx
const onMessage = async (event: any) => {
  try {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    console.log("[WebView Debug] Received message:", { type, data });

    switch (type) {
      case "navigation":
        setCanGoBack(data.canGoBack);
        break;

      case "GITHUB_LOGIN":
        await handleGithubLogin();
        break;

      case "LOGOUT":
        console.log("[WebView Debug] Logout request received from webview");
        // 웹뷰에 로그아웃 요청 전송
        sendMessageToWebView("LOGOUT");
        break;

      case "LOGOUT_COMPLETED":
        console.log("[WebView Debug] Webview logout completed");
        // React Native 앱 로그아웃
        await logout();
        router.replace("/auth/login");
        break;

      default:
        console.log("[WebView Debug] Unknown message type:", type);
    }
  } catch (error) {
    console.log("[WebView Debug] Failed to parse webview message:", error);
  }
};
```

## 사용 예시

### 웹 페이지에서 브릿지 사용

```javascript
// 페이지에서 브릿지 사용
import { bridge } from './bridge';

// 앱으로 메시지 전송
bridge.sendToApp('CUSTOM_MESSAGE', {
  data: 'Hello from webview!',
});

// 커스텀 메시지 핸들러 등록
bridge.on('CUSTOM_RESPONSE', (data) => {
  console.log('Received response from app:', data);
});
```

### Next.js 페이지에서 사용

```javascript
// pages/_app.js 또는 layout.js
import { useEffect } from 'react';
import { initializeBridge } from '../bridge';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 브릿지 초기화
    initializeBridge();
  }, []);

  return <Component {...pageProps} />;
}
```

### React 컴포넌트에서 사용

```javascript
// components/LoginButton.js
import { bridge } from '../utils/bridge';

export function LoginButton() {
  const handleLogin = () => {
    bridge.sendToApp('GITHUB_LOGIN');
  };

  return <button onClick={handleLogin}>GitHub로 로그인</button>;
}
```

## 보안 고려사항

1. **메시지 검증**: 받은 메시지의 유효성을 검증하세요
2. **도메인 확인**: 신뢰할 수 있는 도메인에서만 메시지를 받으세요
3. **토큰 보안**: 토큰을 안전하게 전송하고 저장하세요

## 디버깅

브릿지 디버깅을 위한 로그 설정:

```javascript
// 개발 환경에서만 상세 로그 출력
if (process.env.NODE_ENV === 'development') {
  bridge.on('*', (data) => {
    console.log('Bridge message:', data);
  });
}
```

## 장점

1. **완전한 제어**: 웹뷰 프로젝트에서 모든 JavaScript 코드를 직접 관리
2. **유지보수성**: 코드가 웹뷰 프로젝트 내에 있어 수정이 용이
3. **타입 안전성**: TypeScript와 함께 사용 시 더 나은 타입 체크
4. **테스트 용이성**: 웹뷰 프로젝트에서 직접 테스트 가능

이 가이드를 따라 구현하면 `injectedJavaScript` 없이도 React Native 앱과 웹뷰 간의 안전하고 효율적인 통신이 가능합니다.
