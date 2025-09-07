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

interface AuthWrapperProps {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const cleanup = setupWebViewMessageHandler();

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

    setInterceptors();
    waitForTokenReady();

    return () => {
      cleanup?.();
    };
  }, []);

  console.log('isTokenReady', isTokenReady);

  // 토큰이 준비되지 않았으면 로딩 상태 표시
  if (!isTokenReady) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '16px',
          backgroundColor: 'red',
          color: '#666',
        }}
      >
        인증 정보를 확인하는 중...
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthWrapper;
