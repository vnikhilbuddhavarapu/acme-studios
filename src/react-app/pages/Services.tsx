const items = [
    {
      title: 'Design Sprints',
      desc: 'Rapid prototyping, user testing, and brand systems.',
      bullets: ['Stakeholder workshop', 'Interactive prototypes', 'Design system starter'],
    },
    {
      title: 'Full-stack Apps',
      desc: 'Hono/React on Workers with D1, KV, and Turnstile.',
      bullets: ['Auth & sessions', 'D1 relational data', 'Edge caching strategy'],
    },
    {
      title: 'E-commerce',
      desc: 'Headless storefronts, secure payments, blazing fast.',
      bullets: ['Cart & checkout flows', 'Payments integration', 'Product image pipeline'],
    },
    {
      title: 'Migrations',
      desc: 'Lift-and-shift to Workers with better DX & lower latency.',
      bullets: ['Routing/URL parity', 'Zero-downtime cutover', 'Perf & SEO checks'],
    },
    {
      title: 'Integrations',
      desc: 'Resend, Mailgun, Stripe, Notion, and more.',
      bullets: ['Webhook handlers', 'Background jobs', 'Admin dashboards'],
    },
    {
      title: 'Optimization',
      desc: 'Core Web Vitals improvements & observability.',
      bullets: ['Code-splitting', 'Image/CDN tuning', 'RUM & tracing'],
    },
  ]
  
  export default function Services() {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Services</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((x) => (
            <div key={x.title} className="card p-6 hover:translate-y-[-2px] transition">
              <div className="h-32 w-full bg-[var(--surface-2)] rounded-lg mb-4" />
              <h3 className="font-semibold">{x.title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{x.desc}</p>
              <ul className="list-disc ms-5 mt-3 text-sm text-[var(--muted)] space-y-1">
                {x.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
  