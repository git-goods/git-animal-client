import { bridge } from '../utils/bridge';
import { authUtils } from '../utils/authUtils';

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

  // 기존 SET_TOKENS 메시지도 지원 (하위 호환성)
  bridge.on('SET_TOKENS', (data) => {
    if (data.accessToken) {
      authUtils.setTokensFromParent(data.accessToken, data.refreshToken);
    }
  });
}
