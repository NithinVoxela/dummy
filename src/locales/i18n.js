import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from "i18next-http-backend";
//
import enLocales from './en.json';
import jaLocales from './ja.json';

// ----------------------------------------------------------------------

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'  
}

i18n
  .use(XHR)
  .use(LanguageDetector)  
  .use(initReactI18next)
  .init({
    detection: options,
    resources: {
      en: { translations: enLocales },  
      ja: { translations: jaLocales }
    },
    order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],    
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
