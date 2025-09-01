import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Banner, Dialog } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils } from '../utils';

function HomePage() {
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
          {t('home.title')}
        </h1>
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
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('auth.authentication_status')}</h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'sm' })}>
          <div>{t('home.status')}: ✅ {t('auth.authenticated')}</div>
          <div>{t('auth.token_valid')}: {tokenInfo?.isValid ? `✅ ${t('settings.yes')}` : `❌ ${t('settings.no')}`}</div>
          <div>
            {t('auth.expires_in')}: {tokenInfo?.expiresIn ? `${Math.floor(tokenInfo.expiresIn / 1000 / 60)} ${t('auth.minutes')}` : t('settings.unknown')}
          </div>
        </div>
        <Button size="s" variant="secondary" onClick={handleRefreshToken} className={css({ marginTop: '1rem' })}>
          {t('auth.refresh_token')}
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
          <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('home.user_profile')}</h2>
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
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('home.api_testing')}</h2>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button onClick={fetchUserProfile}>{t('home.fetch_profile')}</Button>
          <Button variant="secondary" onClick={() => setCount(count + 1)}>
            {t('home.counter')}: {count}
          </Button>
          <Button variant="primary" size="s" onClick={handleRefreshToken}>
            {t('auth.refresh_token')}
          </Button>
        </div>
      </div>

      <Banner image="🎉" label={t('home.banner_message')} />

      <Dialog>
        <Dialog.Trigger asChild>
          <Button>{t('home.webview_info')}</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>{t('home.webview_info_title')}</Dialog.Title>
          <Dialog.Description>
            {t('home.webview_info_description')}
          </Dialog.Description>
          <div className={css({ marginTop: '1rem' })}>
            <h3 className={css({ fontWeight: 'semibold', marginBottom: '0.5rem' })}>{t('home.features')}:</h3>
            <ul className={css({ listStyle: 'disc', paddingLeft: '1.5rem', fontSize: 'sm' })}>
              {(t('home.features_list', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={css({ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' })}>
            <Button variant="secondary">{t('common.close')}</Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export default HomePage;
