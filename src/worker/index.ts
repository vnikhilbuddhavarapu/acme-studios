import { Hono } from 'hono'
import type { Context } from 'hono'
import { cors } from 'hono/cors'
import turnstile from './routes/turnstile'
import auth from './routes/auth'
import contact from './routes/contact'

export interface Env {
  DB: D1Database
  SESSIONS: KVNamespace
  TURNSTILE_SECRET_KEY: string
  TURNSTILE_SITE_KEY: string
  JWT_SECRET: string
  RESEND_API_KEY: string
  RESEND_FROM?: string
  RESEND_TO?: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors())

app.get('/', (c: Context<{ Bindings: Env }>) => c.text('ACME Studios API OK'))

app.get('/api/test/db', async (c) => {
  const result = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first()
  return c.json(result ?? { count: 0 })
})

app.route('/api/turnstile', turnstile)
app.route('/api/auth', auth)
app.route('/api/contact', contact) // ⬅️ add this

export default app
