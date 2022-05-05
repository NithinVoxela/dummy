import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//
import enLocales from './en.json';
import jaLocales from './ja.json';

// ----------------------------------------------------------------------

const options = {
  order: ['navigator']  
}

i18n
  .use(LanguageDetector)  
  .use(initReactI18next)
  .init({
    detection: options,
    resources: {
      en: { translations: enLocales },  
      ja: { translations: jaLocales }
    },
    order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
