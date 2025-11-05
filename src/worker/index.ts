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

// Caching middleware - sets Cache-Control headers based on content type

app.use('*', async (c, next) => {
  await next()
  
  const path = c.req.path
  
  // Static assets: images, fonts, etc.
  // Browser: 30 days, CDN: 180 days
  if (path.startsWith('/images/') || 
      path.startsWith('/fonts/') || 
      path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot)$/)) {
    c.header('Cache-Control', 'public, max-age=2592000, s-maxage=15552000')
    // 30 days browser, 180 days CDN
    c.header('CDN-Cache-Control', 'public, max-age=15552000')
  }
  
  // Vite-generated assets with content hashes
  // Immutable since filenames change when content changes
  else if (path.startsWith('/assets/')) {
    c.header('Cache-Control', 'public, max-age=2592000, s-maxage=15552000, immutable')
    c.header('CDN-Cache-Control', 'public, max-age=15552000, immutable')
  }
  
  // API endpoints - no caching for dynamic data
  else if (path.startsWith('/api/')) {
    c.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    c.header('CDN-Cache-Control', 'no-store')
  }
  
  // Semi-static pages like About and Services
  // Browser: 7 days, CDN: 30 days
  else if (path === '/about' || path === '/services') {
    c.header('Cache-Control', 'public, max-age=604800, s-maxage=2592000')
    // 7 days browser, 30 days CDN
    c.header('CDN-Cache-Control', 'public, max-age=2592000')
    
    // Cache different language versions separately
    c.header('Vary', 'Cookie, Accept-Language')
    
    // Cache tag for selective purging
    c.header('Cache-Tag', `page:${path.slice(1)}`)
  }
  
  // Other HTML pages
  // Browser: 1 hour, CDN: 7 days
  else if (!path.includes('.')) {
    c.header('Cache-Control', 'public, max-age=3600, s-maxage=604800')
    // 1 hour browser, 7 days CDN
    c.header('CDN-Cache-Control', 'public, max-age=604800')
    c.header('Vary', 'Cookie, Accept-Language')
    
    // Cache tag for purging
    const pageName = path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')
    c.header('Cache-Tag', `page:${pageName}`)
  }
})

// Content Security Policy headers
// Controls what resources can load to prevent XSS attacks

app.use('*', async (c, next) => {
  await next()
  
  // CSP directives
  const cspDirectives = [
    // Default to same origin only
    "default-src 'self'",
    
    // Scripts from self, inline (Vite), and Turnstile
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
    // unsafe-inline and unsafe-eval needed for Vite dev and React
    
    // Styles from self and inline (Tailwind)
    "style-src 'self' 'unsafe-inline'",
    
    // Images from anywhere
    "img-src 'self' data: https: blob:",
    
    // Fonts from self and data URIs
    "font-src 'self' data:",
    
    // API calls to self and Turnstile
    "connect-src 'self' https://challenges.cloudflare.com",
    
    // Only allow Turnstile frames
    "frame-src https://challenges.cloudflare.com",
    
    // Base URI restricted to same origin
    "base-uri 'self'",
    
    // Forms submit to same origin only
    "form-action 'self'",
    
    // Prevent iframe embedding (clickjacking protection)
    "frame-ancestors 'none'",
  ]
  
  c.header('Content-Security-Policy', cspDirectives.join('; '))
})

// Additional security headers

app.use('*', async (c, next) => {
  await next()
  
  // Prevent MIME sniffing
  c.header('X-Content-Type-Options', 'nosniff')
  
  // Prevent clickjacking
  c.header('X-Frame-Options', 'DENY')
  
  // Browser XSS protection
  c.header('X-XSS-Protection', '1; mode=block')
  
  // Referrer policy
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Disable unnecessary features
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // Force HTTPS - uncomment for production:
  // c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
})

// Routes

app.get('/', (c: Context<{ Bindings: Env }>) => c.text('ACME Studios API OK'))

app.get('/api/test/db', async (c) => {
  const result = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first()
  return c.json(result ?? { count: 0 })
})

app.route('/api/turnstile', turnstile)
app.route('/api/auth', auth)
app.route('/api/contact', contact)

export default app
