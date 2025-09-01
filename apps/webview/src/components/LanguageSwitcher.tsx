import { useTranslation } from 'react-i18next';
import { Button } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      })}
    >
      <span
        className={css({
          fontSize: 'sm',
          color: 'gray.600',
        })}
      >
        {t('language.change_language')}:
      </span>
      <Button
        size="s"
        variant="secondary"
        onClick={toggleLanguage}
        className={css({
          minWidth: '70px',
        })}
      >
        {currentLanguage === 'ko' ? t('language.english') : t('language.korean')}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;