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

// ============================================================================
// CACHING HEADERS MIDDLEWARE
// ============================================================================
// This middleware sets Cache-Control headers for different types of content.
// Modify these values to adjust caching behavior.
// ============================================================================

app.use('*', async (c, next) => {
  await next()
  
  const path = c.req.path
  
  // ----------------------------------------------------------------------------
  // 1. STATIC ASSETS (Images, Fonts, etc.)
  // Cache for 6 months on CDN, 1 month on browser
  // ----------------------------------------------------------------------------
  if (path.startsWith('/images/') || 
      path.startsWith('/fonts/') || 
      path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot)$/)) {
    c.header('Cache-Control', 'public, max-age=2592000, s-maxage=15552000')
    // max-age=2592000 = 30 days (1 month) for browser
    // s-maxage=15552000 = 180 days (6 months) for CDN
    c.header('CDN-Cache-Control', 'public, max-age=15552000')
  }
  
  // ----------------------------------------------------------------------------
  // 2. BUILT ASSETS (Vite-generated JS/CSS with hashes)
  // Cache for 6 months on CDN, 1 month on browser, with immutable flag
  // immutable = file will never change (safe because Vite uses content hashes)
  // ----------------------------------------------------------------------------
  else if (path.startsWith('/assets/')) {
    c.header('Cache-Control', 'public, max-age=2592000, s-maxage=15552000, immutable')
    c.header('CDN-Cache-Control', 'public, max-age=15552000, immutable')
  }
  
  // ----------------------------------------------------------------------------
  // 3. API ENDPOINTS
  // Never cache API responses (dynamic data)
  // ----------------------------------------------------------------------------
  else if (path.startsWith('/api/')) {
    c.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    c.header('CDN-Cache-Control', 'no-store')
  }
  
  // ----------------------------------------------------------------------------
  // 4. SEMI-STATIC PAGES (About, Services)
  // Cache for 1 month on CDN, 1 week on browser
  // ----------------------------------------------------------------------------
  else if (path === '/about' || path === '/services') {
    c.header('Cache-Control', 'public, max-age=604800, s-maxage=2592000')
    // max-age=604800 = 7 days (1 week) for browser
    // s-maxage=2592000 = 30 days (1 month) for CDN
    c.header('CDN-Cache-Control', 'public, max-age=2592000')
    
    // Add Vary header to cache different language versions separately
    c.header('Vary', 'Cookie, Accept-Language')
    
    // Add Cache-Tag for selective purging in Cloudflare
    c.header('Cache-Tag', `page:${path.slice(1)}`)
  }
  
  // ----------------------------------------------------------------------------
  // 5. OTHER HTML PAGES (Home, Projects, Contact, etc.)
  // Cache for 1 week on CDN, 1 hour on browser
  // ----------------------------------------------------------------------------
  else if (!path.includes('.')) {
    c.header('Cache-Control', 'public, max-age=3600, s-maxage=604800')
    // max-age=3600 = 1 hour for browser
    // s-maxage=604800 = 7 days for CDN
    c.header('CDN-Cache-Control', 'public, max-age=604800')
    c.header('Vary', 'Cookie, Accept-Language')
    
    // Add Cache-Tag for selective purging
    const pageName = path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')
    c.header('Cache-Tag', `page:${pageName}`)
  }
})

// ============================================================================
// CONTENT SECURITY POLICY (CSP) HEADERS
// ============================================================================
// CSP prevents XSS attacks by controlling what resources can load.
// Modify these directives carefully - incorrect CSP can break functionality.
// ============================================================================

app.use('*', async (c, next) => {
  await next()
  
  // Build CSP directives
  const cspDirectives = [
    // Default: Only allow resources from same origin
    "default-src 'self'",
    
    // Scripts: Allow from self + inline scripts (for Vite) + Turnstile
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
    // Note: 'unsafe-inline' and 'unsafe-eval' needed for Vite dev mode and React
    // For production, consider using nonces instead
    
    // Styles: Allow from self + inline styles (for Tailwind)
    "style-src 'self' 'unsafe-inline'",
    // Note: 'unsafe-inline' needed for Tailwind's utility classes
    
    // Images: Allow from anywhere (for flexibility with user uploads)
    "img-src 'self' data: https: blob:",
    
    // Fonts: Allow from self + data URIs
    "font-src 'self' data:",
    
    // AJAX/Fetch: Allow API calls to self + Turnstile
    "connect-src 'self' https://challenges.cloudflare.com",
    
    // Frames: Only allow Turnstile widget
    "frame-src https://challenges.cloudflare.com",
    
    // Base URI: Restrict to same origin
    "base-uri 'self'",
    
    // Forms: Only submit to same origin
    "form-action 'self'",
    
    // Prevent site from being embedded in iframes (clickjacking protection)
    "frame-ancestors 'none'",
  ]
  
  c.header('Content-Security-Policy', cspDirectives.join('; '))
})

// ============================================================================
// SECURITY HEADERS
// ============================================================================
// Additional security headers for defense in depth.
// ============================================================================

app.use('*', async (c, next) => {
  await next()
  
  // Prevent MIME-type sniffing
  c.header('X-Content-Type-Options', 'nosniff')
  
  // Prevent clickjacking (redundant with CSP frame-ancestors, but good fallback)
  c.header('X-Frame-Options', 'DENY')
  
  // Enable browser XSS protection (legacy, but still useful)
  c.header('X-XSS-Protection', '1; mode=block')
  
  // Control referrer information
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Disable unnecessary browser features
  c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // Force HTTPS (only set this if you're using HTTPS!)
  // Uncomment when deployed to production with HTTPS:
  // c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
})

// ============================================================================
// ROUTES
// ============================================================================

app.get('/', (c: Context<{ Bindings: Env }>) => c.text('ACME Studios API OK'))

app.get('/api/test/db', async (c) => {
  const result = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first()
  return c.json(result ?? { count: 0 })
})

app.route('/api/turnstile', turnstile)
app.route('/api/auth', auth)
app.route('/api/contact', contact) // ⬅️ add this

export default app
