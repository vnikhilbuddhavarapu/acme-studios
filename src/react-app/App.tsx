import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import GlobalBackground from './components/GlobalBackground'
import FaviconSwitcher from './components/FaviconSwitcher'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh flex flex-col text-[var(--fg)]" style={{ background: 'var(--bg)' }}>
      <FaviconSwitcher />
      <div className="relative flex flex-col min-h-dvh">
        <Navbar />
        <main className="flex-1 relative">
          <GlobalBackground />
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </div>
  )
}

function Protected({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('common')
  const [ok, setOk] = React.useState<null | boolean>(null)
  React.useEffect(() => {
    let on = true
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (on) setOk(!!d.user) })
      .catch(() => { if (on) setOk(false) })
    return () => { on = false }
  }, [])
  if (ok === null) return <div className="px-4 py-16 text-center text-[var(--muted)]">{t('dashboard.checkingSession')}</div>
  if (!ok) return <Navigate to="/signin" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}
