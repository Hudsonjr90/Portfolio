import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ptTranslation from "./src/locales/pt.json"
import enTranslation from "./src/locales/en.json"
import esTranslation from "./src/locales/es.json"
import frTranslation from "./src/locales/fr.json"
import itTranslation from "./src/locales/it.json"


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
      fr: {	
        translation : frTranslation
      },
      it:{
        translation : itTranslation
      },
      es: {
        translation : esTranslation
      }
    }
  })

export default i18n
