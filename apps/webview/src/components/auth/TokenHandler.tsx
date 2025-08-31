import { useEffect, useRef } from 'react';
import { Button } from '@gitanimals/ui-panda';
import { authUtils } from '../../utils';

interface TokenHandlerProps {
  jwtToken: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * JWT 토큰을 받아서 자동으로 로그인 처리하는 컴포넌트
 * webview-history의 LoginButton.tsx를 참고하여 구현
 */
export function TokenHandler({ jwtToken, onSuccess, onError }: TokenHandlerProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // JWT 토큰에서 실제 토큰 부분만 추출 (Bearer 제거)
  const token = jwtToken?.includes(' ') ? jwtToken.split(' ')[1] : jwtToken;

  useEffect(() => {
    if (token && ref.current) {
      console.log('[Auth Debug] TokenHandler: Token received', { 
        tokenLength: token?.length,
        tokenPreview: token?.substring(0, 20) + '...' 
      });
      ref.current.click();
    }
  }, [token]);

  const handleLogin = async () => {
    console.log('[Auth Debug] TokenHandler: Processing token login');
    
    try {
      // 토큰을 TokenManager에 저장
      // refresh token은 없으므로 access token만 설정
      authUtils.setTokensFromParent(token);
      
      console.log('[Auth Debug] TokenHandler: Token stored successfully');
      
      // 성공 콜백 호출
      if (onSuccess) {
        onSuccess();
      }
      
      // WebView에 로그인 성공 메시지 전송
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'LOGIN_SUCCESS',
          message: 'Login successful'
        }));
      }
      
    } catch (error) {
      console.error('[Auth Debug] TokenHandler: Login error', error);
      
      if (onError) {
        onError(error);
      }
      
      // WebView에 로그인 에러 메시지 전송
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'LOGIN_ERROR',
          message: 'Login failed',
          error: error
        }));
      }
    }
  };

  return (
    <div style={{ visibility: 'hidden' }}>
      <Button ref={ref} onClick={handleLogin}>
        Processing Login
      </Button>
    </div>
  );
}