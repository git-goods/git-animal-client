import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Banner } from '@gitanimals/ui-tailwind';
import { authUtils } from '../utils';
import { ROUTES } from '../router/constants';

function AboutPage() {
  const { t } = useTranslation();
  const isAuthenticated = authUtils.isAuthenticated();

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-8 p-8">
      <h1 className="mb-8 text-2xl font-bold">{t('about.title')}</h1>

      <div className="rounded-md border border-gray-300 bg-white p-8">
        <h2 className="mb-4 text-xl font-semibold">{t('about.what_is_title')}</h2>
        <p className="mb-4 leading-relaxed">{t('about.description_1')}</p>
        <p className="mb-4 leading-relaxed">{t('about.description_2')}</p>
      </div>

      <div className="rounded-md border border-blue-300 bg-blue-50 p-8">
        <h2 className="mb-4 text-xl font-semibold">{t('about.features_title')}</h2>
        <ul className="flex list-disc flex-col gap-2 pl-6">
          {(t('about.features_list', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-md border border-green-300 bg-green-50 p-8">
        <h2 className="mb-4 text-xl font-semibold">{t('about.get_started_title')}</h2>
        {isAuthenticated ? (
          <div>
            <p className="mb-4">{t('about.authenticated_description')}</p>
            <div className="flex flex-wrap gap-4">
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
            <p className="mb-4">{t('about.not_authenticated_description')}</p>
            <Link to={ROUTES.AUTH}>
              <Button>{t('about.get_started_button')}</Button>
            </Link>
          </div>
        )}
      </div>

      <Banner image={<span className="text-5xl leading-none">🐾</span>} label={t('about.banner_message')} />
    </div>
  );
}

export default AboutPage;
