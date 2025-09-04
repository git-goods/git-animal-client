import { useState, useEffect, ReactNode } from 'react';
import { authUtils, setupWebViewMessageHandler } from '../../utils';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';
import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '../../utils/interceptor';
import { AuthPage } from './AuthPage';
import { useNavigate } from 'react-router-dom';

interface AuthWrapperProps {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [jwtFromUrl, setJwtFromUrl] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  console.log('isTokenReady', isTokenReady);

  useEffect(() => {
    const cleanup = setupWebViewMessageHandler();

    const checkUrlForToken = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const jwtToken = urlParams.get('jwt');

      if (jwtToken) {
        console.log('[Auth Debug] AuthWrapper: JWT token found in URL');
        setIsAuthenticating(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        return jwtToken;
      }

      return null;
    };

    const setInterceptors = () => {
      setRequestInterceptor(interceptorRequestFulfilled);
      setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
      setRenderRequestInterceptor(interceptorRequestFulfilled);
      setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
    };

    const waitForTokenReady = async () => {
      try {
        await authUtils.waitForToken();
        setIsTokenReady(true);
      } catch (error) {
        console.error('[AuthWrapper] Token wait failed:', error);
        // webview 환경에서는 토큰이 없어도 계속 진행
        if (window.ReactNativeWebView) {
          setIsTokenReady(true);
        }
      }
    };

    // URL에서 JWT 토큰 확인 후 처리
    const tokenFromUrl = checkUrlForToken();
    if (tokenFromUrl) {
      setJwtFromUrl(tokenFromUrl);
    }

    setInterceptors();
    waitForTokenReady();

    return () => {
      cleanup?.();
    };
  }, []);

  const handleAuthComplete = () => {
    setIsAuthenticating(false);
    setJwtFromUrl(null);
  };

  // 토큰이 준비되지 않았으면 로딩 상태 표시
  if (!isTokenReady) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          fontSize: '16px',
          color: '#666',
          backgroundColor: 'black',
        }}
      >
        인증 정보를 확인하는 중...
      </div>
    );
  }

  return (
    <>
      {children}
      {jwtFromUrl && isAuthenticating && <AuthPage jwtToken={jwtFromUrl} onAuthComplete={handleAuthComplete} />}
    </>
  );
}

export default AuthWrapper;
