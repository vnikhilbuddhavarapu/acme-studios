// src/worker/routes/auth.ts
import { Hono } from 'hono'
import { setCookie, deleteCookie } from 'hono/cookie'
import type { Env } from '../types'
import { hashPassword, verifyPassword } from '../lib/hash'
import { signSession } from '../lib/jwt'
import { verifyTurnstile } from '../lib/turnstile'
import { readSession } from '../lib/session'

export const auth = new Hono<{ Bindings: Env }>()

const SESSION_TTL = 60 * 60 * 2 // 2h

type SignUpBody = {
  firstName: string
  email: string
  password: string
  turnstileToken: string
  locale?: string
}

type SignInBody = {
  email: string
  password: string
  turnstileToken: string
  locale?: string
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

// --- SIGN UP ---
auth.post('/signup', async (c) => {
  let raw: unknown
  try {
    raw = await c.req.json<unknown>()
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }
  const b = raw as Partial<SignUpBody>
  if (
    !isNonEmptyString(b.firstName) ||
    !isNonEmptyString(b.email) ||
    !isNonEmptyString(b.password) ||
    !isNonEmptyString(b.turnstileToken)
  ) {
    return c.json({ error: 'missing_fields' }, 400)
  }

  const ip = c.req.header('CF-Connecting-IP') ?? undefined
  const okTs = await verifyTurnstile(c.env, b.turnstileToken, ip)
  if (!okTs) return c.json({ error: 'turnstile_failed' }, 400)

  const email = b.email.toLowerCase().trim()
  const firstName = b.firstName.trim()

  const existing = await c.env.DB
    .prepare('SELECT id FROM users WHERE email=?')
    .bind(email)
    .first()
  if (existing) return c.json({ error: 'email_in_use' }, 409)

  const { hash, salt } = await hashPassword(b.password)
  const res = await c.env.DB
    .prepare('INSERT INTO users (first_name, email, password_hash, salt) VALUES (?, ?, ?, ?)')
    .bind(firstName, email, hash, salt)
    .run()

  const userId = String(res.meta?.last_row_id ?? '')
  if (!userId) return c.json({ error: 'insert_failed' }, 500)
  if (!c.env.JWT_SECRET) return c.json({ error: 'server_misconfig:JWT_SECRET' }, 500)

  const { token, jti, exp } = await signSession(userId, c.env.JWT_SECRET, SESSION_TTL, b.locale)
  await c.env.SESSIONS.put(`sess:${jti}`, JSON.stringify({ userId, exp }), { expiration: exp })

  const isHttps = new URL(c.req.url).protocol === 'https:'
  setCookie(c, 'sid', token, {
    httpOnly: true,
    secure: isHttps, // allow cookie on http://localhost in dev
    sameSite: 'Lax',
    maxAge: SESSION_TTL,
    path: '/'
  })

  return c.json({ ok: true, userId })
})

// --- SIGN IN ---
auth.post('/signin', async (c) => {
  let raw: unknown
  try {
    raw = await c.req.json<unknown>()
  } catch {
    return c.json({ error: 'invalid_json' }, 400)
  }
  const b = raw as Partial<SignInBody>
  if (
    !isNonEmptyString(b.email) ||
    !isNonEmptyString(b.password) ||
    !isNonEmptyString(b.turnstileToken)
  ) {
    return c.json({ error: 'missing_fields' }, 400)
  }

  const ip = c.req.header('CF-Connecting-IP') ?? undefined
  // 🔧 FIX: use b.turnstileToken (not an undefined variable)
  const okTs = await verifyTurnstile(c.env, b.turnstileToken, ip)
  if (!okTs) return c.json({ error: 'turnstile_failed' }, 400)

  const email = b.email.toLowerCase().trim()
  const row = await c.env.DB
    .prepare('SELECT id, first_name, password_hash, salt FROM users WHERE email=?')
    .bind(email)
    .first<{ id: number; first_name: string; password_hash: string; salt: string }>()
  if (!row) return c.json({ error: 'invalid_creds' }, 401)

  const match = await verifyPassword(b.password, row.salt, row.password_hash)
  if (!match) return c.json({ error: 'invalid_creds' }, 401)

  if (!c.env.JWT_SECRET) return c.json({ error: 'server_misconfig:JWT_SECRET' }, 500)
  const { token, jti, exp } = await signSession(String(row.id), c.env.JWT_SECRET, SESSION_TTL, b.locale)
  await c.env.SESSIONS.put(`sess:${jti}`, JSON.stringify({ userId: row.id, exp }), { expiration: exp })

  const isHttps = new URL(c.req.url).protocol === 'https:'
  setCookie(c, 'sid', token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'Lax',
    maxAge: SESSION_TTL,
    path: '/'
  })

  return c.json({ ok: true, userId: row.id, firstName: row.first_name })
})

// --- ME ---
auth.get('/me', async (c) => {
  const u = await readSession(c.env, c.req.header('cookie') ?? null)
  if (!u) return c.json({ user: null })
  const row = await c.env.DB
    .prepare('SELECT id, first_name, email, created_at FROM users WHERE id=?')
    .bind(Number(u.userId))
    .first()
  return c.json({ user: row ?? null })
})

// --- SIGN OUT ---
auth.post('/signout', async (c) => {
  const u = await readSession(c.env, c.req.header('cookie') ?? null)
  if (u) {
    await c.env.SESSIONS.delete(`sess:${u.jti}`)
  }
  deleteCookie(c, 'sid', { path: '/' })
  return c.json({ ok: true })
})

export default auth
