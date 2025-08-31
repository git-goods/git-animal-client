import { useState } from 'react';
import { Button, Banner } from '@gitanimals/ui-panda';
import { css } from '../../../styled-system/css';
import { LoginButton } from './AuthButton';
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
    <div
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      })}
    >
      <div
        className={css({
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: 'lg',
          maxWidth: '400px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
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
          <h2 className={css({ fontSize: 'xl', fontWeight: 'bold' })}>Test Login</h2>
          {onClose && (
            <Button variant="secondary" size="s" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          })}
        >
          {/* GitHub OAuth 로그인 */}
          <div
            className={css({
              padding: '1rem',
              border: '1px solid',
              borderColor: 'gray.200',
              borderRadius: 'md',
            })}
          >
            <h3 className={css({ fontWeight: 'semibold', marginBottom: '0.5rem' })}>GitHub OAuth Login</h3>
            <a href="https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/LOCAL">LOGIN</a>
            <p className={css({ fontSize: 'sm', color: 'gray.600', marginBottom: '1rem' })}>
              Login using GitHub OAuth (requires backend integration)
            </p>
            <LoginButton label="Login with GitHub" />
          </div>

          {/* 수동 토큰 입력 */}
          <div
            className={css({
              padding: '1rem',
              border: '1px solid',
              borderColor: 'gray.200',
              borderRadius: 'md',
            })}
          >
            <h3 className={css({ fontWeight: 'semibold', marginBottom: '0.5rem' })}>Manual Token Input</h3>
            <p className={css({ fontSize: 'sm', color: 'gray.600', marginBottom: '1rem' })}>
              Paste your JWT token manually
            </p>

            {!showManualInput ? (
              <Button variant="secondary" size="s" onClick={() => setShowManualInput(true)}>
                Show Token Input
              </Button>
            ) : (
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
                <textarea
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="Paste JWT token here..."
                  className={css({
                    width: '100%',
                    height: '80px',
                    padding: '0.5rem',
                    border: '1px solid',
                    borderColor: 'gray.300',
                    borderRadius: 'sm',
                    fontSize: 'sm',
                    resize: 'vertical',
                  })}
                />
                <div className={css({ display: 'flex', gap: '0.5rem' })}>
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
