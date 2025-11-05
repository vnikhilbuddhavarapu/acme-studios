import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Turnstile from '../components/Turnstile'

type FormState = {
  firstName: string
  lastName: string
  email: string
  service: string
  message: string
}

const initial: FormState = { firstName: '', lastName: '', email: '', service: '', message: '' }

export default function Contact() {
  const { t } = useTranslation('common')
  const [data, setData] = React.useState<FormState>(initial)
  const [token, setToken] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [ok, setOk] = React.useState(false)
  const [err, setErr] = React.useState<string | null>(null)
  const nav = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    if (!token) { setErr(t('auth.completeTurnstile')); return }
    if (!data.firstName || !data.lastName || !data.email || !data.service) {
      setErr(t('contact.firstName')); return
    }
    setSubmitting(true)
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken: token })
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.ok) {
        setErr(j.error || 'Failed to send. Please try again.')
      } else {
        setOk(true)
        setTimeout(() => {
          setOk(false)
          setData(initial)
          setToken(null)
        }, 5000)
      }
    } catch {
      setErr('Network error. Please retry.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t('contact.title')}</h1>

      {ok && (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 sm:p-8 mb-6 text-center">
          <div className="text-4xl sm:text-5xl mb-4">✓</div>
          <h2 className="text-xl sm:text-2xl font-semibold">{t('contact.thankYouTitle')}</h2>
          <p className="text-[var(--muted)] mt-3 text-base sm:text-lg">
            {t('contact.thankYouMessage')}
          </p>
          <p className="text-sm text-[var(--muted)] mt-4">
            We've sent a confirmation email to <strong className="text-[var(--fg)]">{data.email}</strong>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition" onClick={() => nav('/projects')}>
              {t('contact.viewProjects')}
            </button>
            <button className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] transition" onClick={() => nav('/services')}>
              {t('contact.exploreServices')}
            </button>
          </div>
          <p className="text-xs text-[var(--muted)] mt-4">{t('contact.autoCloseMessage')}</p>
        </div>
      )}

      {!ok && (
        <form onSubmit={onSubmit} className="card p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{t('contact.firstName')}</label>
              <input className="input" value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm mb-1">{t('contact.lastName')}</label>
              <input className="input" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">{t('contact.email')}</label>
            <input type="email" className="input" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} required />
          </div>

          <div>
            <label className="block text-sm mb-1">{t('contact.service')}</label>
            <select className="input" value={data.service} onChange={e => setData({ ...data, service: e.target.value })} required>
              <option value="" disabled>{t('contact.selectService')}</option>
              <option>{t('services.agileMethodology.title')}</option>
              <option>{t('services.cloudArchitecture.title')}</option>
              <option>{t('services.platformEngineering.title')}</option>
              <option>{t('services.devSecOps.title')}</option>
              <option>{t('services.observability.title')}</option>
              <option>{t('services.appModernization.title')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">{t('contact.message')}</label>
            <textarea className="input min-h-[120px]" value={data.message} onChange={e => setData({ ...data, message: e.target.value })} placeholder={t('contact.messagePlaceholder')} />
          </div>

          {/* Turnstile */}
          <div>
            <Turnstile onToken={setToken} />
          </div>

          {err && (
            <div className="text-sm text-red-500 font-medium bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {err}
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium disabled:opacity-60 transition flex items-center justify-center gap-2" 
              disabled={submitting || !token}
            >
              {submitting && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submitting ? t('contact.sending') : t('contact.sendButton')}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
