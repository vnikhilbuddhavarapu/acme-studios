import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Turnstile from '../components/Turnstile'

export default function SignUp() {
  const { t, i18n } = useTranslation('common')
  const nav = useNavigate()
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
      const r = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: String(fd.get('firstName') || ''),
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
        
        // Email already exists (409)
        if (r.status === 409) {
          setError('An account with this email already exists.')
          return
        }
        
        // Server error (500+)
        if (r.status >= 500) {
          setError('Unable to complete sign up. Please try again.')
          return
        }
        
        // Generic error
        setError('Sign up failed. Please try again.')
        return
      }
      
      nav('/dashboard', { replace: true })
    } catch {
      setError('Unable to complete sign up. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">{t('auth.signUpTitle')}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="firstName" placeholder={t('auth.firstName')} className="input" required />
        <input name="email" placeholder={t('auth.email')} type="email" className="input" required />
        <input name="password" placeholder={t('auth.password')} type="password" className="input" required />
        <Turnstile onToken={setToken} />
        {error && (
          <div className="text-sm text-red-500 font-medium">
            {error}
          </div>
        )}
        <button className="btn-primary w-full" type="submit">{t('auth.signUpButton')}</button>
      </form>
      <p className="text-sm text-neutral-400 mt-3">{t('auth.haveAccount')} <Link to="/signin" className="underline">{t('nav.signin')}</Link></p>
    </div>
  )
}
