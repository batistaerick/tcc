import en from '@/i18n/en';
import pt from '@/i18n/pt';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: { en: { translation: en }, pt: { translation: pt } },
    fallbackLng: 'pt',
    keySeparator: ':',
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export default i18n;
