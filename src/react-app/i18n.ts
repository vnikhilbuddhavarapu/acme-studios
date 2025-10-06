import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/common.json'
import fr from './locales/fr-CA/common.json'

const COOKIE = 'locale'
function getCookie(name: string) {
  return document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith(name + '='))?.split('=')[1]
}

const initialLng = getCookie(COOKIE) || navigator.language?.toLowerCase().startsWith('fr') ? 'fr-CA' : 'en'

await i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      'fr-CA': { common: fr }
    },
    lng: initialLng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    defaultNS: 'common'
  })

export default i18next
