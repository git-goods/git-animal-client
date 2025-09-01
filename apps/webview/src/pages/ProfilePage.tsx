import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Banner } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';

function ProfilePage() {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // const response = await userAPI.getProfile();
      // setUserProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setError(t('profile.error'));
    } finally {
      setIsLoading(false);
    }
  };

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
        {t('profile.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={css({
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        })}
      >
        <Banner image="❌" label={error} />
        <Button onClick={fetchUserProfile}>{t('common.retry')}</Button>
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
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '2rem',
        })}
      >
        {t('profile.title')}
      </h1>

      {userProfile ? (
        <div
          className={css({
            padding: '2rem',
            border: '1px solid',
            borderColor: 'gray.300',
            borderRadius: 'md',
            backgroundColor: 'white',
          })}
        >
          <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>{t('profile.profile_information')}</h2>
          <pre className={css({ fontSize: 'sm', whiteSpace: 'pre-wrap' })}>{JSON.stringify(userProfile, null, 2)}</pre>
        </div>
      ) : (
        <Banner image="⚠️" label={t('profile.no_data')} />
      )}

      <div className={css({ display: 'flex', gap: '1rem' })}>
        <Button onClick={fetchUserProfile}>{t('profile.refresh_profile')}</Button>
      </div>
    </div>
  );
}

export default ProfilePage;
