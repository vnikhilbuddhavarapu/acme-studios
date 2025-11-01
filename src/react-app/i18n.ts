// src/react-app/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/common.json'
import frCA from './locales/fr-CA/common.json'

const COOKIE = 'lng'

// tiny cookie reader
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : null
}

// Pick initial language: cookie > navigator > default 'en'
const nav = (typeof navigator !== 'undefined' ? navigator.language : '').toLowerCase()
const initialLng = getCookie(COOKIE) || (nav.startsWith('fr') ? 'fr-CA' : 'en')

i18n
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: 'en',
    resources: {
      en: { common: en },
      'fr-CA': { common: frCA },
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    // If you want React to render without Suspense:
    react: { useSuspense: false },
  })

export default i18n
