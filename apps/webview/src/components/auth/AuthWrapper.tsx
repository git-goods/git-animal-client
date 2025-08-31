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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [jwtFromUrl, setJwtFromUrl] = useState<string | null>(null);

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

    // URL에서 JWT 토큰 확인 후 처리
    const tokenFromUrl = checkUrlForToken();
    if (tokenFromUrl) {
      setJwtFromUrl(tokenFromUrl);
    }

    setInterceptors();

    return () => {
      cleanup?.();
    };
  }, []);

  const handleAuthComplete = () => {
    setIsAuthenticating(false);
    setJwtFromUrl(null);
  };

  return (
    <>
      {children}
      {jwtFromUrl && isAuthenticating && <AuthPage jwtToken={jwtFromUrl} onAuthComplete={handleAuthComplete} />}
    </>
  );
}

export default AuthWrapper;