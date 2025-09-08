import { css } from '../../../styled-system/css';
import { TokenHandler } from './TokenHandler';

interface AuthPageProps {
  jwtToken: string;
  onAuthComplete?: () => void;
}

/**
 * 인증 처리 페이지
 * JWT 토큰을 받아서 자동으로 로그인 처리
 */
export function AuthPage({ jwtToken, onAuthComplete }: AuthPageProps) {
  const handleAuthSuccess = () => {
    console.log('[Auth Debug] AuthPage: Authentication successful');
    if (onAuthComplete) {
      onAuthComplete();
    }
  };

  const handleAuthError = (error: any) => {
    console.error('[Auth Debug] AuthPage: Authentication failed', error);
    if (onAuthComplete) {
      onAuthComplete();
    }
  };

  return (
    <div
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2xl',
        zIndex: 1000,
      })}
    >
      <div
        className={css({
          textAlign: 'center',
          padding: '2rem',
        })}
      >
        <div className={css({ marginBottom: '1rem' })}>🔐 Authenticating...</div>
        <div className={css({ fontSize: 'sm', color: 'gray.600' })}>Processing your login</div>

        {/* 숨겨진 토큰 처리 컴포넌트 */}
        <TokenHandler jwtToken={jwtToken} onSuccess={handleAuthSuccess} onError={handleAuthError} />
      </div>
    </div>
  );
}
