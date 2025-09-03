import { token } from '_panda/tokens';
import { bridge } from './bridge';
import tokenManager from './tokenManager';

/**
 * 앱으로 메시지를 전송하는 유틸리티 함수들
 */
export const bridgeUtils = {
  /**
   * GitHub 로그인 요청
   */
  requestGithubLogin: () => {
    bridge.sendToApp('GITHUB_LOGIN');
  },

  /**
   * 로그아웃 요청
   */
  requestLogout: () => {
    bridge.sendToApp('LOGOUT_COMPLETED');
    // 로그아웃 시 토큰 제거
    tokenManager.clearTokens();
  },

  /**
   * 인증 요청
   */
  requestAuth: () => {
    bridge.sendToApp('REQUEST_AUTH');
  },

  /**
   * 네비게이션 상태 전송
   */
  sendNavigationState: (canGoBack?: boolean) => {
    bridge.sendToApp('navigation', {
      url: window.location.href,
      canGoBack: canGoBack ?? window.history.length > 1,
    });
  },

  /**
   * 커스텀 메시지 전송
   */
  sendCustomMessage: (type: string, data: any = {}) => {
    bridge.sendToApp(type, data);
  },

  /**
   * 메시지 핸들러 등록
   */
  onMessage: (type: string, handler: (data: any) => void) => {
    bridge.on(type, handler);
  },

  /**
   * 브릿지 사용 가능 여부 확인
   */
  isAvailable: (): boolean => {
    return typeof window !== 'undefined' && !!window.ReactNativeWebView;
  },

  /**
   * 토큰 수신 리스너 설정
   */
  setupTokenListener: () => {
    bridge.on('SET_TOKEN', (data: any) => {
      // alert('SET_TOKEN received: ' + JSON.stringify(data));

      // 다양한 메시지 형식 지원
      let token: string;
      if (typeof data === 'string') {
        token = data;
      } else if (data && typeof data === 'object') {
        token = data.token || data.accessToken || data.access_token;
      } else {
        console.log('Invalid token data format: ' + JSON.stringify(data));
        return;
      }

      if (!token) {
        console.log('No token found in data: ' + JSON.stringify(data));
        return;
      }

      tokenManager.setTokens(token);
      console.log('Token saved via tokenManager: ' + token);
    });
  },
};

export default bridgeUtils;
