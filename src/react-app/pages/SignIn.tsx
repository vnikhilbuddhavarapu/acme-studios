import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Turnstile from '../components/Turnstile'

type NavState = { from?: { pathname?: string } }

export default function SignIn() {
  const { t, i18n } = useTranslation('common')
  const nav = useNavigate()
  const loc = useLocation()
  const state = (loc.state ?? {}) as NavState
  const [token, setToken] = useState<string>('')
  const [error, setError] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('') // Clear previous errors
    const fd = new FormData(e.currentTarget)
    if (!token) { 
      setError(t('auth.completeTurnstile'))
      return 
    }
    
    try {
      const r = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: String(fd.get('email') || ''),
          password: String(fd.get('password') || ''),
          turnstileToken: token,
          locale: i18n.language
        })
      })
      
      if (!r.ok) {
        // Check for specific error messages from the server
        const data = await r.json().catch(() => ({}))
        
        // Check for Cloudflare WAF leaked credentials
        if (r.status === 403 && data.error?.includes('leaked')) {
          setError('Your credentials have been leaked. Please change your password.')
          return
        }
        
        // Invalid credentials (401)
        if (r.status === 401) {
          setError('Invalid username or password. Please try again.')
          return
        }
        
        // Server error (500+)
        if (r.status >= 500) {
          setError('Unable to complete sign in. Please try again.')
          return
        }
        
        // Generic error
        setError('Sign in failed. Please try again.')
        return
      }
      
      const to = state.from?.pathname ?? '/dashboard'
      nav(to, { replace: true })
    } catch {
      setError('Unable to complete sign in. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">{t('auth.signInTitle')}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" placeholder={t('auth.email')} type="email" className="input" required />
        <input name="password" placeholder={t('auth.password')} type="password" className="input" required />
        <Turnstile onToken={setToken} />
        {error && (
          <div className="text-sm text-red-500 font-medium">
            {error}
          </div>
        )}
        <button className="btn-primary w-full" type="submit">{t('auth.signInButton')}</button>
      </form>
      <p className="text-sm text-neutral-400 mt-3">{t('auth.newHere')} <Link to="/signup" className="underline">{t('auth.createAccount')}</Link></p>
    </div>
  )
}
