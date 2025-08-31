import tokenManager from './tokenManager';

export const authUtils = {
  /**
   * 사용자 인증 상태 확인
   */
  isAuthenticated: (): boolean => {
    return tokenManager.isAuthenticated();
  },

  /**
   * 현재 액세스 토큰 반환
   */
  getToken: (): string | null => {
    return tokenManager.getAccessToken();
  },

  /**
   * 토큰 정보 반환 (유효성, 만료시간 등)
   */
  getTokenInfo: () => {
    return tokenManager.getTokenInfo();
  },

  /**
   * 로그아웃 처리
   */
  logout: (): void => {
    tokenManager.clearTokens();

    // webview 환경에서는 부모 앱에 로그아웃 메시지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'LOGOUT',
          message: 'User logged out',
        }),
      );
    } else {
      window.location.href = '/login';
    }
  },

  /**
   * 토큰 수동 갱신
   */
  refreshToken: async (): Promise<boolean> => {
    return await tokenManager.refreshAccessToken();
  },

  /**
   * 인증 헤더 생성
   */
  getAuthHeaders: (): Record<string, string> => {
    const token = tokenManager.getAccessToken();
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  },

  /**
   * 로그인 상태 변경 감지를 위한 이벤트 리스너
   */
  onAuthStateChange: (callback: (isAuthenticated: boolean) => void): (() => void) => {
    let lastAuthState = authUtils.isAuthenticated();

    const interval = setInterval(() => {
      const currentAuthState = authUtils.isAuthenticated();
      if (currentAuthState !== lastAuthState) {
        lastAuthState = currentAuthState;
        callback(currentAuthState);
      }
    }, 1000); // 1초마다 체크

    // cleanup 함수 반환
    return () => clearInterval(interval);
  },

  /**
   * webview에서 부모 앱으로부터 토큰 받기
   */
  setTokensFromParent: (accessToken: string, refreshToken?: string): void => {
    tokenManager.setTokens(accessToken, refreshToken);

    // 토큰 설정 완료 메시지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'TOKENS_SET',
          message: 'Tokens successfully set',
        }),
      );
    }
  },

  /**
   * 부모 앱에 인증 요청
   */
  requestAuthFromParent: (): void => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQUEST_AUTH',
          message: 'Authentication required',
        }),
      );
    }
  },
};

// webview 환경을 위한 글로벌 메시지 핸들러 설정
export const setupWebViewMessageHandler = (): (() => void) | void => {
  // webview에서 부모로부터 메시지를 받기 위한 핸들러
  const handleMessage = (event: MessageEvent) => {
    try {
      let data;

      // event.data가 이미 객체인 경우와 문자열인 경우 모두 처리
      if (typeof event.data === 'string') {
        data = JSON.parse(event.data);
      } else if (typeof event.data === 'object' && event.data !== null) {
        data = event.data;
      } else {
        console.warn('Invalid message data format:', event.data);
        return;
      }

      switch (data.type) {
        case 'SET_TOKENS':
          if (data.accessToken) {
            authUtils.setTokensFromParent(data.accessToken, data.refreshToken);
          }
          break;
        case 'LOGOUT':
          authUtils.logout();
          break;
        default:
        // console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing webview message:', error);
    }
  };

  // React Native WebView에서 오는 메시지 처리
  if (typeof window !== 'undefined') {
    window.addEventListener('message', handleMessage);

    // cleanup을 위한 함수 반환
    return () => window.removeEventListener('message', handleMessage);
  }
};

export default authUtils;
