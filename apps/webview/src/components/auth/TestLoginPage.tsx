import { useState } from 'react';
import { Button } from '@gitanimals/ui-tailwind';
import { authUtils } from '../../utils';

interface TestLoginPageProps {
  onClose?: () => void;
}

/**
 * 테스트 로그인 페이지
 * GitHub OAuth 로그인과 수동 토큰 입력을 지원
 */
export function TestLoginPage({ onClose }: TestLoginPageProps) {
  const [manualToken, setManualToken] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleManualTokenSubmit = () => {
    if (manualToken.trim()) {
      console.log('[Auth Debug] TestLoginPage: Manual token login');
      authUtils.setTokensFromParent(manualToken.trim());
      setManualToken('');
      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
      <div className="max-h-[80vh] w-[90%] max-w-[400px] overflow-y-auto rounded-lg bg-white p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Test Login</h2>
          {onClose && (
            <Button variant="secondary" size="s" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {/* GitHub OAuth 로그인 */}
          <div className="rounded-md border border-gray-200 p-4">
            <h3 className="mb-2 font-semibold">GitHub OAuth Login</h3>
            <a href="https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/LOCAL">LOGIN</a>
            <p className="mb-4 text-sm text-gray-600">
              Login using GitHub OAuth (requires backend integration)
            </p>
          </div>

          {/* 수동 토큰 입력 */}
          <div className="rounded-md border border-gray-200 p-4">
            <h3 className="mb-2 font-semibold">Manual Token Input</h3>
            <p className="mb-4 text-sm text-gray-600">Paste your JWT token manually</p>

            {!showManualInput ? (
              <Button variant="secondary" size="s" onClick={() => setShowManualInput(true)}>
                Show Token Input
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="Paste JWT token here..."
                  className="h-20 w-full resize-y rounded-sm border border-gray-300 p-2 text-sm"
                />
                <div className="flex gap-2">
                  <Button size="s" onClick={handleManualTokenSubmit} disabled={!manualToken.trim()}>
                    Submit Token
                  </Button>
                  <Button
                    variant="secondary"
                    size="s"
                    onClick={() => {
                      setShowManualInput(false);
                      setManualToken('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
