import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';

// the translations
const resources = {
  en: {
    translation: enTranslations,
    quiz: enTranslations.quiz,
    gotcha: enTranslations.gotcha,
    shop: enTranslations.shop,
    mypage: enTranslations.mypage,
  },
  ko: {
    translation: koTranslations,
    quiz: koTranslations.quiz,
    gotcha: koTranslations.gotcha,
    shop: koTranslations.shop,
    mypage: koTranslations.mypage,
  },
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'ko',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      // options for language detection
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupLocalStorage: 'gitanimals-language',
      caches: ['localStorage'],
    },
  });

export default i18n;
