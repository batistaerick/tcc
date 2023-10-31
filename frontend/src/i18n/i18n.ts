import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './en';
import pt from './pt';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'pt',
    lng: 'pt',
    keySeparator: ':',
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

export default i18n;
