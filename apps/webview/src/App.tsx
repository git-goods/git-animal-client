import { useState, useEffect } from 'react';
import { Button, Banner, Dialog } from '@gitanimals/ui-panda';
import { css } from '../styled-system/css';
import { authUtils, setupWebViewMessageHandler, apiClient, userAPI } from './utils';
import { setRequestInterceptor, setResponseInterceptor } from '@gitanimals/api';
import { setRenderRequestInterceptor, setRenderResponseInterceptor } from '@gitanimals/api/src/_instance';
import {
  interceptorRequestFulfilled,
  interceptorResponseFulfilled,
  interceptorResponseRejected,
} from './utils/interceptor';

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  // WebView 통신 초기화 및 인증 상태 관리
  useEffect(() => {
    // 웹뷰 통신 설정
    const cleanup = setupWebViewMessageHandler();

    // 초기 인증 상태 확인
    const checkAuth = () => {
      const authStatus = authUtils.isAuthenticated();
      const tokenData = authUtils.getTokenInfo();

      setIsAuthenticated(authStatus);
      setTokenInfo(tokenData);
      setIsLoading(false);

      if (!authStatus) {
        // 인증되지 않은 경우 부모 앱에 인증 요청
        authUtils.requestAuthFromParent();
      }
    };

    const setInterceptors = () => {
      setRequestInterceptor(interceptorRequestFulfilled);
      setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
      setRenderRequestInterceptor(interceptorRequestFulfilled);
      setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
    };

    checkAuth();
    setInterceptors();

    // 인증 상태 변경 감지
    const unsubscribe = authUtils.onAuthStateChange((authState: boolean) => {
      setIsAuthenticated(authState);
      setTokenInfo(authUtils.getTokenInfo());

      if (authState) {
        // 인증 성공 시 사용자 프로필 가져오기
        fetchUserProfile();
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      cleanup?.();
      unsubscribe();
    };
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUserProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleLogout = () => {
    authUtils.logout();
    setUserProfile(null);
  };

  const handleRefreshToken = async () => {
    try {
      const success = await authUtils.refreshToken();
      if (success) {
        setTokenInfo(authUtils.getTokenInfo());
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: 'lg',
        })}
      >
        Loading...
      </div>
    );
  }

  // 인증되지 않은 상태
  if (!isAuthenticated) {
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '2rem',
          padding: '2rem',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            textAlign: 'center',
          })}
        >
          Authentication Required
        </h1>
        <Banner image="🔐" label="Please authenticate in the parent app to continue" />
        <Button onClick={() => authUtils.requestAuthFromParent()}>Request Authentication</Button>
      </div>
    );
  }

  return (
    <div
      className={css({
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        })}
      >
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
          })}
        >
          GitAnimals Webview
        </h1>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* 인증 상태 정보 */}
      <div
        className={css({
          padding: '1.5rem',
          border: '1px solid',
          borderColor: 'green.300',
          borderRadius: 'md',
          backgroundColor: 'green.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>Authentication Status</h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'sm' })}>
          <div>Status: ✅ Authenticated</div>
          <div>Token Valid: {tokenInfo?.isValid ? '✅ Yes' : '❌ No'}</div>
          <div>
            Expires In: {tokenInfo?.expiresIn ? `${Math.floor(tokenInfo.expiresIn / 1000 / 60)} minutes` : 'Unknown'}
          </div>
        </div>
        <Button size="s" variant="secondary" onClick={handleRefreshToken} className={css({ marginTop: '1rem' })}>
          Refresh Token
        </Button>
      </div>

      {/* 사용자 프로필 정보 */}
      {userProfile && (
        <div
          className={css({
            padding: '1.5rem',
            border: '1px solid',
            borderColor: 'blue.300',
            borderRadius: 'md',
            backgroundColor: 'blue.50',
          })}
        >
          <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>User Profile</h2>
          <pre className={css({ fontSize: 'sm', whiteSpace: 'pre-wrap' })}>{JSON.stringify(userProfile, null, 2)}</pre>
        </div>
      )}

      {/* API 테스트 섹션 */}
      <div
        className={css({
          padding: '1.5rem',
          border: '1px solid',
          borderColor: 'gray.300',
          borderRadius: 'md',
          backgroundColor: 'white',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>API Testing</h2>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button onClick={fetchUserProfile}>Fetch Profile</Button>
          <Button variant="secondary" onClick={() => setCount(count + 1)}>
            Counter: {count}
          </Button>
          <Button variant="primary" size="s" onClick={handleRefreshToken}>
            Refresh Token
          </Button>
        </div>
      </div>

      <Banner image="🎉" label="WebView with Token Manager is working!" />

      <Dialog>
        <Dialog.Trigger asChild>
          <Button>WebView Info</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>WebView Information</Dialog.Title>
          <Dialog.Description>
            This webview includes integrated token management for secure communication with the GitAnimals backend.
          </Dialog.Description>
          <div className={css({ marginTop: '1rem' })}>
            <h3 className={css({ fontWeight: 'semibold', marginBottom: '0.5rem' })}>Features:</h3>
            <ul className={css({ listStyle: 'disc', paddingLeft: '1.5rem', fontSize: 'sm' })}>
              <li>Automatic token refresh</li>
              <li>WebView ↔ Parent App communication</li>
              <li>Secure API calls with Bearer token</li>
              <li>Authentication state management</li>
            </ul>
          </div>
          <div className={css({ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' })}>
            <Button variant="secondary">Close</Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default App;
