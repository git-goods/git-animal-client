import { useState, useEffect } from 'react';
import { Button, Banner, Dialog } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils } from '../utils';

function SettingsPage() {
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    setTokenInfo(authUtils.getTokenInfo());
  }, []);

  const handleRefreshToken = async () => {
    try {
      const success = await authUtils.refreshToken();
      if (success) {
        setTokenInfo(authUtils.getTokenInfo());
        console.log('Token refreshed successfully');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  };

  const handleLogout = () => {
    authUtils.logout();
    setShowLogoutDialog(false);
  };

  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log('Cache cleared');
  };

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
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '2rem',
        })}
      >
        Settings
      </h1>

      {/* 토큰 관리 섹션 */}
      <div
        className={css({
          padding: '1.5rem',
          border: '1px solid',
          borderColor: 'blue.300',
          borderRadius: 'md',
          backgroundColor: 'blue.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>Token Management</h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'sm', marginBottom: '1rem' })}>
          <div>Token Valid: {tokenInfo?.isValid ? '✅ Yes' : '❌ No'}</div>
          <div>
            Expires In: {tokenInfo?.expiresIn ? `${Math.floor(tokenInfo.expiresIn / 1000 / 60)} minutes` : 'Unknown'}
          </div>
        </div>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button onClick={handleRefreshToken}>Refresh Token</Button>
          <Button variant="secondary" onClick={() => authUtils.requestAuthFromParent()}>
            Request New Auth
          </Button>
        </div>
      </div>

      {/* 앱 설정 섹션 */}
      <div
        className={css({
          padding: '1.5rem',
          border: '1px solid',
          borderColor: 'gray.300',
          borderRadius: 'md',
          backgroundColor: 'white',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>App Settings</h2>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button variant="secondary" onClick={handleClearCache}>
            Clear Cache
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Reload App
          </Button>
        </div>
      </div>

      {/* 계정 관리 섹션 */}
      <div
        className={css({
          padding: '1.5rem',
          border: '1px solid',
          borderColor: 'red.300',
          borderRadius: 'md',
          backgroundColor: 'red.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>Account</h2>
        <Button variant="primary" onClick={() => setShowLogoutDialog(true)}>
          Logout
        </Button>
      </div>

      <Banner image="⚙️" label="Settings page for managing your WebView preferences" />

      {/* 로그아웃 확인 다이얼로그 */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <Dialog.Content>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to logout? You will need to authenticate again to use the app.
          </Dialog.Description>
          <div className={css({ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' })}>
            <Button variant="secondary" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default SettingsPage;