import { Hono } from 'hono'
import type { Env } from '../types'
import { verifyTurnstile } from '../lib/turnstile'
import ThankYouEmail from '../email/ThankYouEmail'
import { renderToStaticMarkup } from 'react-dom/server'

export const contact = new Hono<{ Bindings: Env }>()

type ContactBody = {
  firstName: string
  lastName: string
  email: string
  service: string
  message?: string
  turnstileToken: string
}

function sanitize(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string))
}

contact.post('/', async (c) => {
  const ip = c.req.header('CF-Connecting-IP') ?? undefined

  let body: ContactBody
  try {
    body = await c.req.json<ContactBody>()
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }

  const { firstName, lastName, email, service, message, turnstileToken } = body

  // 1) Verify Turnstile
  const okTs = await verifyTurnstile(c.env, turnstileToken, ip)
  if (!okTs) return c.json({ error: 'turnstile_failed' }, 400)

  // 2) Minimal validation
  if (!firstName || !lastName || !email || !service) return c.json({ error: 'missing_fields' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return c.json({ error: 'bad_email' }, 400)

  // 3) Compose thank you email via React Email
  const submittedAt = new Date().toISOString()
  const html = '<!doctype html>' + renderToStaticMarkup(
    ThankYouEmail({
      firstName: sanitize(firstName),
      lastName: sanitize(lastName),
      email: sanitize(email),
      service: sanitize(service),
      message: message ? sanitize(message) : undefined,
      submittedAt,
      siteName: 'ACME Studios'
    })
  )
  const text =
    `Hey ${firstName},\n\n` +
    `Thanks for reaching out to ACME Studios! We received your inquiry and we'll get back to you within 24-48 hours.\n\n` +
    `Your Submission:\n` +
    `Name: ${firstName} ${lastName}\n` +
    `Email: ${email}\n` +
    `Service: ${service}\n` +
    (message ? `Message: ${message}\n` : '') +
    `\nSubmitted: ${new Date(submittedAt).toLocaleString()}\n\n` +
    `Questions? Just reply to this email.\n\n` +
    `— ACME Studios`

  // 4) Send email to user via Resend
  const FROM = c.env.RESEND_FROM || 'ACME Studios <no-reply@acme-studios.org>'
  const apiKey = c.env.RESEND_API_KEY
  if (!apiKey) return c.json({ error: 'missing_resend_api_key' }, 500)

  const payload = { 
    from: FROM, 
    to: [email], // Send to the user who submitted the form
    subject: `Thanks for reaching out to ACME Studios!`, 
    html, 
    text,
    reply_to: 'hello@acme-studios.org' // Allow user to reply
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload)
  })
  if (!r.ok) {
    const detail = await r.text().catch(() => '')
    return c.json({ error: 'resend_failed', detail: detail.slice(0, 500) }, 502)
  }

  return c.json({ ok: true })
})

export default contact
