import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Banner, Dialog } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils } from '../utils';

function SettingsPage() {
  const { t } = useTranslation();
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
        {t('settings.title')}
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
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('settings.token_management')}</h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'sm', marginBottom: '1rem' })}>
          <div>{t('auth.token_valid')}: {tokenInfo?.isValid ? `✅ ${t('settings.yes')}` : `❌ ${t('settings.no')}`}</div>
          <div>
            {t('auth.expires_in')}: {tokenInfo?.expiresIn ? `${Math.floor(tokenInfo.expiresIn / 1000 / 60)} ${t('auth.minutes')}` : t('settings.unknown')}
          </div>
        </div>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button onClick={handleRefreshToken}>{t('auth.refresh_token')}</Button>
          <Button variant="secondary" onClick={() => authUtils.requestAuthFromParent()}>
            {t('auth.request_new_auth')}
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
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('settings.app_settings')}</h2>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button variant="secondary" onClick={handleClearCache}>
            {t('settings.clear_cache')}
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            {t('settings.reload_app')}
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
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('settings.account')}</h2>
        <Button variant="primary" onClick={() => setShowLogoutDialog(true)}>
          {t('settings.logout')}
        </Button>
      </div>

      <Banner image="⚙️" label={t('settings.banner_message')} />

      {/* 로그아웃 확인 다이얼로그 */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <Dialog.Content>
          <Dialog.Title>{t('settings.logout_confirm_title')}</Dialog.Title>
          <Dialog.Description>
            {t('settings.logout_confirm_description')}
          </Dialog.Description>
          <div className={css({ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' })}>
            <Button variant="secondary" onClick={() => setShowLogoutDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              {t('settings.logout')}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default SettingsPage;