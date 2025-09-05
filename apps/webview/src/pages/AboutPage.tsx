import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Banner } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils } from '../utils';
import { ROUTES } from '../router/constants';

function AboutPage() {
  const { t } = useTranslation();
  const isAuthenticated = authUtils.isAuthenticated();

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
        {t('about.title')}
      </h1>

      <div
        className={css({
          padding: '2rem',
          border: '1px solid',
          borderColor: 'gray.300',
          borderRadius: 'md',
          backgroundColor: 'white',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          {t('about.what_is_title')}
        </h2>
        <p className={css({ marginBottom: '1rem', lineHeight: '1.6' })}>
          {t('about.description_1')}
        </p>
        <p className={css({ marginBottom: '1rem', lineHeight: '1.6' })}>
          {t('about.description_2')}
        </p>
      </div>

      <div
        className={css({
          padding: '2rem',
          border: '1px solid',
          borderColor: 'blue.300',
          borderRadius: 'md',
          backgroundColor: 'blue.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          {t('about.features_title')}
        </h2>
        <ul className={css({ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
          {(t('about.features_list', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div
        className={css({
          padding: '2rem',
          border: '1px solid',
          borderColor: 'green.300',
          borderRadius: 'md',
          backgroundColor: 'green.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          {t('about.get_started_title')}
        </h2>
        {isAuthenticated ? (
          <div>
            <p className={css({ marginBottom: '1rem' })}>
              {t('about.authenticated_description')}
            </p>
            <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
              <Link to={ROUTES.HOME}>
                <Button>{t('about.go_to_dashboard')}</Button>
              </Link>
              <Link to={ROUTES.PROFILE}>
                <Button variant="secondary">{t('about.view_profile')}</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className={css({ marginBottom: '1rem' })}>
              {t('about.not_authenticated_description')}
            </p>
            <Link to={ROUTES.AUTH}>
              <Button>{t('about.get_started_button')}</Button>
            </Link>
          </div>
        )}
      </div>

      <Banner 
        image="🐾" 
        label={t('about.banner_message')} 
      />
    </div>
  );
}

export default AboutPage;