import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Banner, Dialog } from '@gitanimals/ui-tailwind';
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
    <div className="mx-auto flex max-w-[800px] flex-col gap-8 p-8">
      <h1 className="mb-8 text-2xl font-bold">{t('settings.title')}</h1>

      {/* 토큰 관리 섹션 */}
      <div className="rounded-md border border-blue-300 bg-blue-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('settings.token_management')}</h2>
        <div className="mb-4 flex flex-col gap-2 text-sm">
          <div>
            {t('auth.token_valid')}: {tokenInfo?.isValid ? `✅ ${t('settings.yes')}` : `❌ ${t('settings.no')}`}
          </div>
          <div>
            {t('auth.expires_in')}:{' '}
            {tokenInfo?.expiresIn
              ? `${Math.floor(tokenInfo.expiresIn / 1000 / 60)} ${t('auth.minutes')}`
              : t('settings.unknown')}
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleRefreshToken}>{t('auth.refresh_token')}</Button>
          <Button variant="secondary" onClick={() => authUtils.requestAuthFromParent()}>
            {t('auth.request_new_auth')}
          </Button>
        </div>
      </div>

      {/* 앱 설정 섹션 */}
      <div className="rounded-md border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('settings.app_settings')}</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" onClick={handleClearCache}>
            {t('settings.clear_cache')}
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            {t('settings.reload_app')}
          </Button>
        </div>
      </div>

      {/* 계정 관리 섹션 */}
      <div className="rounded-md border border-red-300 bg-red-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('settings.account')}</h2>
        <Button variant="primary" onClick={() => setShowLogoutDialog(true)}>
          {t('settings.logout')}
        </Button>
      </div>

      <Banner image={<span className="text-5xl leading-none">⚙️</span>} label={t('settings.banner_message')} />

      {/* 로그아웃 확인 다이얼로그 */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <Dialog.Content>
          <Dialog.Title>{t('settings.logout_confirm_title')}</Dialog.Title>
          <Dialog.Description>{t('settings.logout_confirm_description')}</Dialog.Description>
          <div className="mt-4 flex justify-end gap-4">
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
