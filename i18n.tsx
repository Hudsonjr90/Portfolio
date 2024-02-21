import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptTranslation from "./locales/pt.json";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import frTranslation from "./locales/fr.json";
import itTranslation from "./locales/it.json";


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
      },
      es: {
        translation : esTranslation
      },
      fr: {	
        translation : frTranslation
      },
      it:{
        translation : itTranslation
      }
    }
  });

export default i18n;
