import { Button } from '@gitanimals/ui-tailwind';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-glyph-16 text-white">
      <h1 className="mb-3 text-glyph-40 font-bold">404</h1>
      <div className="mb-8 text-center [&_a]:text-blue-500 [&_a]:underline">
        <p>{t('notfound.title')}</p>
        <p>{t('notfound.description')}</p>
      </div>
      <div className="flex w-full justify-center gap-4">
        <Button onClick={handleGoBack} variant="secondary">
          {t('common.back', { defaultValue: 'Back' })}
        </Button>
        <Button onClick={handleGoHome}>{t('notfound.go_home')}</Button>
      </div>
    </main>
  );
}

export default NotFoundPage;
