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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/90 text-2xl">
      <div className="p-8 text-center">
        <div className="mb-4">🔐 Authenticating...</div>
        <div className="text-sm text-gray-600">Processing your login</div>

        {/* 숨겨진 토큰 처리 컴포넌트 */}
        <TokenHandler jwtToken={jwtToken} onSuccess={handleAuthSuccess} onError={handleAuthError} />
      </div>
    </div>
  );
}
