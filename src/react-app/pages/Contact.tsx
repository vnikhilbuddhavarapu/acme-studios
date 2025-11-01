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
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">{t('contact.title')}</h1>

      {ok && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6 mb-6 text-center">
          <h2 className="text-xl font-semibold">{t('contact.thankYouTitle')}</h2>
          <p className="text-[var(--muted)] mt-2">
            {t('contact.thankYouMessage')}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium" onClick={() => nav('/projects')}>
              {t('contact.viewProjects')}
            </button>
            <button className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]" onClick={() => nav('/services')}>
              {t('contact.exploreServices')}
            </button>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3">{t('contact.autoCloseMessage')}</p>
        </div>
      )}

      {!ok && (
        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
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
              <option>{t('contact.serviceWebDesign')}</option>
              <option>{t('contact.serviceWebDev')}</option>
              <option>{t('contact.serviceAPI')}</option>
              <option>{t('contact.serviceOptimization')}</option>
              <option>{t('contact.serviceMigrations')}</option>
              <option>{t('contact.serviceEcommerce')}</option>
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

          {err && <div className="text-sm text-red-400">{err}</div>}

          <div className="pt-2">
            <button type="submit" className="px-5 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium disabled:opacity-60" disabled={submitting}>
              {submitting ? t('contact.sending') : t('contact.sendButton')}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
