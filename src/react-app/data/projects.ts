export type Project = {
  slug: string
  title: string
  blurb: string
  overview: string
  highlights: string[]
  tech: string[]
  integrations: string[]
  results: string[]
  image: string
  gallery?: string[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'northstar',
    title: 'Northstar Finance',
    blurb: 'Fintech marketing site + client portal.',
    overview:
      'A secure client portal and public site for a fintech advisory. We built an edge-first stack with strong auth, D1-backed records, and locale-aware caching.',
    highlights: [
      'Role-based access control (admin/advisor/client)',
      'Audit trails with tamper-evident logs',
      'Locale-aware CDN caching for public content'
    ],
    tech: ['Cloudflare Workers', 'Hono', 'React Router', 'D1', 'KV', 'Turnstile', 'jose', 'Tailwind'],
    integrations: ['Auth0 (SSO)', 'Resend (email)', 'Stripe Customer Portal', 'Notion CMS (read-only)'],
    results: ['TTFB < 80ms globally', '95+ Lighthouse scores', 'Zero-Downtime deploys via Workers Builds'],
    image: '/images/projects/finance.avif',
    gallery: ['/images/projects/finance.avif', '/images/projects/finance-2.avif']
  },
  {
    slug: 'hazel',
    title: 'Hazel Wellness',
    blurb: 'Booking + subscriptions on the edge.',
    overview:
      'A boutique wellness platform with bookings, subscriptions, and email automations—built for speed and SEO.',
    highlights: ['Edge-rendered appointment calendar', 'Subscription management with retries', 'Transactional emails with templates'],
    tech: ['Workers', 'React', 'Hono', 'D1', 'KV', 'Zod', 'Tailwind'],
    integrations: ['Stripe Billing', 'Resend (email)', 'Contentful (CMS)'],
    results: ['+23% conversion after edge caching', '<200ms P95 booking flow', 'SEO impressions up 2.1x'],
    image: '/images/projects/wellness.avif',
    gallery: ['/images/projects/wellness.avif', '/images/projects/wellness-2.avif']
  },
  {
    slug: 'tidal',
    title: 'Tidal Commerce',
    blurb: 'Headless storefront with caching.',
    overview:
      'A headless e-commerce storefront with robust caching, ISR-like revalidation, and image optimization.',
    highlights: ['Stale-while-revalidate for product pages', 'Signed URLs for media', 'Cart API with KV + durable sessions'],
    tech: ['Workers', 'React', 'Hono', 'KV', 'R2 (images)', 'Tailwind'],
    integrations: ['Shopify Storefront API', 'Stripe', 'Algolia Search'],
    results: ['+32% faster PLPs', 'Bounce rate -18%', 'Operational costs reduced vs. legacy'],
    image: '/images/projects/ecommerce.avif',
    gallery: ['/images/projects/ecommerce.avif', '/images/projects/ecommerce.avif']
  },
  {
    slug: 'atlas',
    title: 'Atlas Docs',
    blurb: 'Docs portal with i18n and search.',
    overview:
      'A documentation portal with multi-language support, instant search, and authoring via a Git-based workflow.',
    highlights: ['MDX pipeline with on-edge transforms', 'Language toggle + locale routing', 'Section-level search with highlights'],
    tech: ['Workers', 'React', 'MDX', 'i18next', 'Tailwind'],
    integrations: ['GitHub Content (MDX)', 'Meilisearch (on edge)', 'Resend (changelog digest)'],
    results: ['Docs edits deploy in <60s', 'Search P95 < 120ms', 'Author happiness ↑'],
    image: '/images/projects/documentation.avif',
    gallery: ['/images/projects/developer-docs.avif', '/images/projects/documentation.avif']
  },
  {
    slug: 'relay',
    title: 'Relay SaaS',
    blurb: 'Multi-tenant dashboard, auth, and billing.',
    overview:
      'A SaaS starter with multi-tenant isolation, team roles, and usage-based billing—prepped for growth.',
    highlights: ['Tenant-aware routing and data isolation', 'Feature flags from KV', 'Background jobs via Queues (optional)'],
    tech: ['Workers', 'Hono', 'React', 'D1', 'KV', 'jose', 'Zod', 'Tailwind'],
    integrations: ['Stripe Metered Billing', 'Resend', 'Segment / Zaraz'],
    results: ['Onboarding time ↓ 40%', 'Runtime costs predictable', 'Edge POP latency wins'],
    image: '/images/projects/software.avif',
    gallery: ['/images/projects/saas.avif', '/images/projects/software.avif']
  },
  {
    slug: 'orbit',
    title: 'Orbit Labs',
    blurb: 'Landing page with animations.',
    overview:
      'A marketing site showcasing motion design and WebGL-style polish—without heavy bundles.',
    highlights: ['Framer Motion hero and section reveals', 'Responsive images via R2/Images', 'A/B test hooks for CTAs'],
    tech: ['Workers', 'React', 'Framer Motion', 'Tailwind'],
    integrations: ['Cloudflare Images', 'Resend (lead capture)', 'Google Sheets (simple CRM)'],
    results: ['+28% CTA engagement', 'CLS < 0.05', 'DX-friendly content pipeline'],
    image: '/images/projects/marketing.avif',
    gallery: ['/images/projects/marketing.avif', '/images/projects/marketing-2.avif']
  }
]

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) || null
}
