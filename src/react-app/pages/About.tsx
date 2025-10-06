import React from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

function Modal({ open, onClose, title, children }: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="max-w-2xl w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm border border-[var(--border)] hover:bg-[var(--surface-2)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 text-[var(--fg)]">{children}</div>
      </div>
    </div>
  )
}

export default function About() {
  const [open, setOpen] = React.useState<'mission' | 'team' | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">About ACME Studios</h1>
      <p className="mt-4 text-[var(--muted)]">
        We’re a boutique web agency focused on speed, security, and delightful UX. We build on Cloudflare —
        Workers for compute, D1 for data, KV for global state — so your app is close to users everywhere.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        <button
          onClick={() => setOpen('mission')}
          className="card p-6 text-left hover:translate-y-[-2px] transition"
        >
          <div className="h-40 w-full bg-[var(--surface-2)] rounded-lg mb-4" />
          <h3 className="font-semibold">Our Mission</h3>
          <p className="text-[var(--muted)] text-sm mt-1">
            Ship world-class digital experiences with edge-native tech.
          </p>
        </button>

        <button
          onClick={() => setOpen('team')}
          className="card p-6 text-left hover:translate-y-[-2px] transition"
        >
          <div className="h-40 w-full bg-[var(--surface-2)] rounded-lg mb-4" />
          <h3 className="font-semibold">Our Team</h3>
          <p className="text-[var(--muted)] text-sm mt-1">
            Designers, engineers, and product folks who love details.
          </p>
        </button>
      </div>

      {/* Mission modal */}
      <Modal open={open === 'mission'} onClose={() => setOpen(null)} title="Our Mission">
        <p className="text-sm">
          We help organizations move faster by pairing elegant design with edge-native engineering. Our goals:
        </p>
        <ul className="list-disc ms-5 mt-3 text-sm text-[var(--muted)] space-y-1">
          <li>Deliver <strong>measurable performance gains</strong> for every launch.</li>
          <li>Build systems that are <strong>secure by default</strong> and simple to operate.</li>
          <li>Champion <strong>accessibility</strong> and inclusive design in all user journeys.</li>
          <li>Share knowledge openly to uplift the community.</li>
        </ul>
      </Modal>

      {/* Team modal */}
      <Modal open={open === 'team'} onClose={() => setOpen(null)} title="Our Team">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'Ava Patel', role: 'Head of Engineering', tags: ['DevOps', 'Workers', 'D1'] },
            { name: 'Liam Chen', role: 'Lead Designer', tags: ['Design Systems', 'A11y', 'Motion'] },
            { name: 'Sofia Martins', role: 'Full-stack Engineer', tags: ['Hono', 'React', 'Edge Caching'] },
            { name: 'Noah Singh', role: 'Platform Engineer', tags: ['CI/CD', 'Observability', 'Perf'] },
          ].map((m) => (
            <div key={m.name} className="rounded-xl border border-[var(--border)] p-4 bg-[var(--surface-1)]">
              <div className="h-24 w-full bg-[var(--surface-2)] rounded-lg mb-3" />
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-[var(--muted)]">{m.role}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-1)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
