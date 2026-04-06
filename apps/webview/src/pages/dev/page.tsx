import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Banner, Dialog } from '@gitanimals/ui-tailwind';
import { authUtils } from '@/utils';

export default function DevPage() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  useEffect(() => {
    setTokenInfo(authUtils.getTokenInfo());
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // const response = await userAPI.getProfile();
      // setUserProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
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

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-8 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('home.title')}</h1>
      </div>

      {/* 인증 상태 정보 */}
      <div className="rounded-md border border-green-300 bg-green-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('auth.authentication_status')}</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            {t('home.status')}: ✅ {t('auth.authenticated')}
          </div>
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
        <Button size="s" variant="secondary" onClick={handleRefreshToken} className="mt-4">
          {t('auth.refresh_token')}
        </Button>
      </div>

      {/* 사용자 프로필 정보 */}
      {userProfile && (
        <div className="rounded-md border border-blue-300 bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">{t('home.user_profile')}</h2>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(userProfile, null, 2)}</pre>
        </div>
      )}

      {/* API 테스트 섹션 */}
      <div className="rounded-md border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">{t('home.api_testing')}</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={fetchUserProfile}>{t('home.fetch_profile')}</Button>
          <Button variant="secondary" onClick={() => setCount(count + 1)}>
            {t('home.counter')}: {count}
          </Button>
          <Button variant="primary" size="s" onClick={handleRefreshToken}>
            {t('auth.refresh_token')}
          </Button>
        </div>
      </div>

      <Banner
        image={<span className="text-5xl leading-none">🎉</span>}
        label={t('home.banner_message')}
      />

      <Dialog>
        <Dialog.Trigger asChild>
          <Button>{t('home.webview_info')}</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>{t('home.webview_info_title')}</Dialog.Title>
          <Dialog.Description>{t('home.webview_info_description')}</Dialog.Description>
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">{t('home.features')}:</h3>
            <ul className="list-disc pl-6 text-sm">
              {(t('home.features_list', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <Button variant="secondary">{t('common.close')}</Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
