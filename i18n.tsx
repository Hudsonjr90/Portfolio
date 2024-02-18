import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptTranslation from "./locales/pt.json";
import enTranslation from "./locales/en.json";


i18n
  .use(initReactI18next)
  .init({
    lng: "pt", 
    fallbackLng: "pt", 
    resources: {
      pt: {
        translation: ptTranslation
      },
      en: {
        translation: enTranslation
      }
    }
  });

export default i18n;
