import { Link, NavLink, useLocation } from 'react-router-dom'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from '../theme/ThemeProvider'

const base = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
const linkCls = (active: boolean) =>
  `${base} ${active ? 'bg-[var(--surface-2)] text-[var(--fg)]' : 'hover:bg-[var(--surface-1)]'}`

const LOGO_DARK = '/acme-dark-logo.png'
const LOGO_LIGHT = '/acme-light-logo.png'

export default function Navbar() {
  const { t } = useTranslation('common')
  const { theme } = React.useContext(ThemeContext)
  const [signedIn, setSignedIn] = React.useState<boolean>(false)
  const loc = useLocation()

  const checkAuth = React.useCallback(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setSignedIn(!!d?.user))
      .catch(() => setSignedIn(false))
  }, [])

  // run once on mount, and again whenever the route changes
  React.useEffect(() => {
    checkAuth()
  }, [checkAuth, loc.pathname])

  // also refresh when tab regains focus
  React.useEffect(() => {
    const onFocus = () => checkAuth()
    const onVis = () => { if (!document.hidden) checkAuth() }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [checkAuth])

  const links = [
    { to: '/', key: 'nav.home' },
    { to: '/about', key: 'nav.about' },
    { to: '/services', key: 'nav.services' },
    { to: '/projects', key: 'nav.projects' },
    { to: '/contact', key: 'nav.contact' }
  ]

  const logoSrc = theme === 'dark' ? LOGO_DARK : LOGO_LIGHT

  return (
    <header className="border-b border-[var(--border)] sticky top-0 z-50 bg-[color-mix(in_oklab,var(--bg),transparent_20%)] backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src={logoSrc} className="h-7 w-auto" alt="ACME Studios" />
            <span className="text-lg font-semibold tracking-wide">ACME Studios</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }: { isActive: boolean }) => linkCls(isActive)}
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {signedIn ? (
              <>
                <NavLink className={({ isActive }: { isActive: boolean }) => linkCls(isActive)} to="/dashboard">
                  {t('nav.dashboard')}
                </NavLink>
                <form
                  method="dialog"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' })
                    location.href = '/'
                  }}
                >
                  <button className={linkCls(false)} type="submit">{t('nav.signout')}</button>
                </form>
              </>
            ) : (
              <>
                <NavLink className={({ isActive }: { isActive: boolean }) => linkCls(isActive)} to="/signin">
                  {t('nav.signin')}
                </NavLink>
                <NavLink className={({ isActive }: { isActive: boolean }) => linkCls(isActive)} to="/signup">
                  {t('nav.signup')}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
