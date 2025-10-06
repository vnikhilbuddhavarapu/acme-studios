import CardImage from './CardImage'

const FEATURES = [
  {
    title: 'Web Design',
    desc: 'Modern, responsive UI/UX built with performance in mind.',
    bullets: ['Discovery & strategy', 'Wireframes & prototypes', 'Accessibility baked-in'],
    image: '/images/services/web-design.avif'
  },
  {
    title: 'Web Development',
    desc: 'Full-stack apps on Cloudflare Workers, D1, and KV.',
    bullets: ['Auth & sessions', 'D1 relational data', 'Edge caching strategy'],
    image: '/images/services/fullstack.avif'
  },
  {
    title: 'API & Integrations',
    desc: 'Secure APIs, auth, and third-party integrations.',
    bullets: ['Stripe/Resend/Notion', 'Webhook handlers', 'Admin dashboards'],
    image: '/images/services/integrations.avif'
  },
  {
    title: 'Optimization',
    desc: 'Caching, image pipelines, and Lighthouse tuning.',
    bullets: ['Code-splitting', 'Image/CDN tuning', 'RUM & tracing'],
    image: '/images/services/optimization.avif'
  }
]

export default function ServicesGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURES.map((f) => (
        <div key={f.title} className="card-static p-5">
          <CardImage src={f.image} alt={f.title} className="h-32" />
          <div className="text-lg font-semibold mt-4">{f.title}</div>
          <p className="text-sm text-[var(--muted)] mb-3">{f.desc}</p>
          <ul className="list-disc ms-5 text-sm text-[var(--muted)] space-y-1">
            {f.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
