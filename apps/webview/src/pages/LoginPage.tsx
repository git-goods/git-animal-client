import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button, Banner } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils, setupWebViewMessageHandler } from '../utils';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';
import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from '../utils/interceptor';
import { TestLoginPage } from '../components/auth/TestLoginPage';
import { AuthPage } from '../components/auth/AuthPage';
import bridgeUtils from '../utils/bridgeUtils';

function LoginPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTestLogin, setShowTestLogin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [jwtFromUrl, setJwtFromUrl] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    const cleanup = setupWebViewMessageHandler();

    const checkUrlForToken = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const jwtToken = urlParams.get('jwt');

      if (jwtToken) {
        console.log('[Auth Debug] LoginPage: JWT token found in URL');
        setIsAuthenticating(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        return jwtToken;
      }

      return null;
    };

    const checkAuth = () => {
      const authStatus = authUtils.isAuthenticated();
      setIsAuthenticated(authStatus);
      setIsInitialized(true);

      if (!authStatus) {
        authUtils.requestAuthFromParent();
      }
    };

    const setInterceptors = () => {
      setRequestInterceptor(interceptorRequestFulfilled);
      setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
      setRenderRequestInterceptor(interceptorRequestFulfilled);
      setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
    };

    const tokenFromUrl = checkUrlForToken();
    if (tokenFromUrl) {
      setJwtFromUrl(tokenFromUrl);
    } else {
      checkAuth();
    }

    setInterceptors();

    const unsubscribe = authUtils.onAuthStateChange((authState: boolean) => {
      setIsAuthenticated(authState);
    });

    return () => {
      cleanup?.();
      unsubscribe();
    };
  }, []);

  const handleAuthComplete = () => {
    setIsAuthenticating(false);
    setJwtFromUrl(null);

    const authStatus = authUtils.isAuthenticated();
    setIsAuthenticated(authStatus);
  };

  // 이미 인증되어 있으면 원래 가려던 페이지로 리다이렉트
  if (isAuthenticated && isInitialized) {
    return <Navigate to={from} replace />;
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '2rem',
        padding: '2rem',
        backgroundColor: 'gray.50',
      })}
    >
      <div
        className={css({
          maxWidth: '400px',
          width: '100%',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: 'lg',
          boxShadow: 'lg',
          textAlign: 'center',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            marginBottom: '1rem',
          })}
        >
          {t('auth.welcome_title')}
        </h1>

        <p
          className={css({
            color: 'gray.600',
            marginBottom: '2rem',
          })}
        >
          {t('auth.welcome_description')}
        </p>

        <Banner image="🔐" label={t('auth.auth_required')} />

        <div className={css({ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' })}>
          <Button onClick={() => authUtils.requestAuthFromParent()}>{t('auth.authenticate_button')}</Button>
          <a href="https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/LOCAL">
            <Button variant="secondary">{t('auth.local_login')}</Button>
          </a>
          {/* <Button variant="secondary" onClick={() => setShowTestLogin(true)}>
            Test Login (Development)
          </Button> */}
        </div>

        {from !== '/' && (
          <p className={css({ fontSize: 'sm', color: 'gray.500', marginTop: '1rem' })}>
            {t('auth.redirecting_to', { path: from })}
          </p>
        )}
      </div>

      {showTestLogin && <TestLoginPage onClose={() => setShowTestLogin(false)} />}
      {jwtFromUrl && isAuthenticating && <AuthPage jwtToken={jwtFromUrl} onAuthComplete={handleAuthComplete} />}
    </div>
  );
}

export default LoginPage;
