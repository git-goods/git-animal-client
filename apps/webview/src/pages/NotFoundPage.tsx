import { Button } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
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
    <main className={mainCss}>
      <h1 className={h1Css}>404</h1>
      <div className={pCss}>
        <p>{t('notfound.title')}</p>
        <p>{t('notfound.description')}</p>
      </div>
      <div className={buttonCss}>
        <Button onClick={handleGoBack} variant="secondary">
          {t('common.back', { defaultValue: 'Back' })}
        </Button>
        <Button onClick={handleGoHome}>
          {t('notfound.go_home')}
        </Button>
      </div>
    </main>
  );
}

const buttonCss = css({
  display: 'flex',
  justifyContent: 'center',
  w: '100%',
  gap: '16px',
});

const mainCss = css({
  backgroundColor: 'white',
  w: '100dvw',
  h: '100dvh',
  textStyle: 'glyph16.regular',
  padding: '0 16px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const h1Css = css({
  textStyle: 'glyph40.bold',
  marginBottom: '12px',
});

const pCss = css({
  marginBottom: '32px',
  textAlign: 'center',
  '& a': {
    textDecoration: 'underline',
    color: 'blue',
  },
});

export default NotFoundPage;