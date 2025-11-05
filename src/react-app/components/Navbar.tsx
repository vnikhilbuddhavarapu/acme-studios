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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false)
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

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [loc.pathname])

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const links = [
    { to: '/', key: 'nav.home' },
    { to: '/about', key: 'nav.about' },
    { to: '/services', key: 'nav.services' },
    { to: '/projects', key: 'nav.projects' },
    { to: '/contact', key: 'nav.contact' }
  ]

  const logoSrc = theme === 'dark' ? LOGO_DARK : LOGO_LIGHT

  return (
    <>
      <header className="border-b border-[var(--border)] sticky top-0 z-50 bg-[color-mix(in_oklab,var(--bg),transparent_20%)] backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <img src={logoSrc} className="h-7 w-auto" alt="ACME Studios" />
              <span className="text-base sm:text-lg font-semibold tracking-wide">ACME Studios</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
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

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
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

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-[var(--surface-1)] transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[var(--bg)] border-l border-[var(--border)] transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-[var(--surface-1)] transition"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }: { isActive: boolean }) => 
                    `block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive 
                        ? 'bg-[var(--surface-2)] text-[var(--fg)]' 
                        : 'hover:bg-[var(--surface-1)]'
                    }`
                  }
                >
                  {t(l.key)}
                </NavLink>
              ))}
            </div>

            {/* Mobile Auth Actions */}
            <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-1">
              {signedIn ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }: { isActive: boolean }) => 
                      `block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive 
                          ? 'bg-[var(--surface-2)] text-[var(--fg)]' 
                          : 'hover:bg-[var(--surface-1)]'
                      }`
                    }
                  >
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
                    <button 
                      className="w-full text-left px-4 py-3 rounded-md text-base font-medium hover:bg-[var(--surface-1)] transition-colors" 
                      type="submit"
                    >
                      {t('nav.signout')}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className={({ isActive }: { isActive: boolean }) => 
                      `block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive 
                          ? 'bg-[var(--surface-2)] text-[var(--fg)]' 
                          : 'hover:bg-[var(--surface-1)]'
                      }`
                    }
                  >
                    {t('nav.signin')}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }: { isActive: boolean }) => 
                      `block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive 
                          ? 'bg-[var(--surface-2)] text-[var(--fg)]' 
                          : 'hover:bg-[var(--surface-1)]'
                      }`
                    }
                  >
                    {t('nav.signup')}
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
