import React from 'react'
import i18n from '../i18n'

export default function LanguageToggle() {
  const [lng, setLng] = React.useState(i18n.language)

  React.useEffect(() => {
    const on = (l: string) => setLng(l)
    i18n.on('languageChanged', on)
    return () => { i18n.off('languageChanged', on) }
  }, [])

  function change(l: string) {
    i18n.changeLanguage(l)
    document.cookie = `locale=${l}; Max-Age=31536000; path=/`
  }

  return (
    <select
      aria-label="Language"
      className="px-2 py-2 rounded-md text-sm border border-[var(--border)] bg-[var(--surface-1)]"
      value={lng}
      onChange={(e) => change(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="fr-CA">FR-CA</option>
    </select>
  )
}
