import React from 'react'
import { ThemeContext } from '../theme/ThemeProvider'

// Update these paths if needed:
const ICON_DARK = '/acme-favicon-dark.ico'
const ICON_LIGHT = '/acme-favicon-light.ico'

export default function FaviconSwitcher() {
  const { theme } = React.useContext(ThemeContext)

  React.useEffect(() => {
    function ensure(rel: string) {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      return link
    }
    const icon = ensure('icon')
    const alt = ensure('alternate icon') // some UAs honor this
    const href = theme === 'dark' ? ICON_DARK : ICON_LIGHT
    ;[icon, alt].forEach((l) => {
      l.type = 'image/png'
      l.href = href
      l.sizes = '32x32'
    })
  }, [theme])

  return null
}
