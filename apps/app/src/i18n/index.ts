import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './locales/en.json';
import ko from './locales/ko.json';

type Language = 'ko' | 'en';

const SUPPORTED: readonly Language[] = ['ko', 'en'];
const DEFAULT_LANGUAGE: Language = 'ko';

export function pickLanguage(locales: string[]): Language {
  for (const locale of locales) {
    const code = locale.split(/[-_]/)[0].toLowerCase();
    const match = SUPPORTED.find((language) => language === code);
    if (match) return match;
  }
  return DEFAULT_LANGUAGE;
}

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources: { ko: { translation: ko }, en: { translation: en } },
  lng: pickLanguage(getLocales().map((locale) => locale.languageTag)),
  fallbackLng: DEFAULT_LANGUAGE,
  returnNull: false,
  interpolation: { escapeValue: false },
});

export default i18n;
