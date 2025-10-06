import { Hono } from 'hono'
import type { Env } from '../types'

const turnstile = new Hono<{ Bindings: Env }>()

// Public: return the site key for the client (safe to expose)
turnstile.get('/sitekey', (c) => {
  const siteKey = c.env.TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
  return c.json({ siteKey })
})

type VerifyRes = { success: boolean; ['error-codes']?: string[] }
type VerifyPayload = { token: string; ip?: string }

function isVerifyPayload(v: unknown): v is VerifyPayload {
  if (typeof v !== 'object' || v === null) return false
  const obj = v as Record<string, unknown>
  return (
    typeof obj.token === 'string' &&
    (obj.ip === undefined || typeof obj.ip === 'string')
  )
}

// Server-side verification
turnstile.post('/verify', async (c) => {
  let dataUnknown: unknown
  try {
    dataUnknown = await c.req.json<unknown>()
  } catch {
    return c.json({ ok: false, errors: ['invalid_json'] }, 400)
  }
  if (!isVerifyPayload(dataUnknown)) {
    return c.json({ ok: false, errors: ['bad_request'] }, 400)
  }
  const { token, ip } = dataUnknown

  // Dev bypass: Cloudflare dummy secret always succeeds
  if (c.env.TURNSTILE_SECRET_KEY === '1x0000000000000000000000000000000AA') {
    return c.json({ ok: true })
  }

  const body = new URLSearchParams({
    secret: c.env.TURNSTILE_SECRET_KEY,
    response: token,
    remoteip: ip ?? ''
  })

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body
  })
  if (!resp.ok) return c.json({ ok: false, errors: ['network'] }, 502)

  const data = (await resp.json()) as VerifyRes
  return c.json({ ok: !!data.success, errors: data['error-codes'] ?? [] })
})

export { turnstile }          // named export (optional)
export default turnstile      // default export (fixes your import)
