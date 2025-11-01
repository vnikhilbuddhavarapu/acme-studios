import React from 'react'
import { useTranslation } from 'react-i18next'
import CardImage from '../components/CardImage'

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
  const { t } = useTranslation('common')
  const [open, setOpen] = React.useState<'mission' | 'team' | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">{t('about.title')}</h1>
      <p className="mt-4 text-[var(--muted)]">
        {t('about.intro')}
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        <button
          onClick={() => setOpen('mission')}
          className="card p-6 text-left hover:translate-y-[-2px] transition"
        >
          <CardImage src="/images/about/mission.jpg" alt={t('about.missionTitle')} className="h-40" />
          <h3 className="font-semibold mt-4">{t('about.missionTitle')}</h3>
          <p className="text-[var(--muted)] text-sm mt-1">
            {t('about.missionDesc')}
          </p>
        </button>

        <button
          onClick={() => setOpen('team')}
          className="card p-6 text-left hover:translate-y-[-2px] transition"
        >
          <CardImage src="/images/about/team.jpg" alt={t('about.teamTitle')} className="h-40" />
          <h3 className="font-semibold mt-4">{t('about.teamTitle')}</h3>
          <p className="text-[var(--muted)] text-sm mt-1">
            {t('about.teamDesc')}
          </p>
        </button>
      </div>

      {/* Mission modal */}
      <Modal open={open === 'mission'} onClose={() => setOpen(null)} title={t('about.missionTitle')}>
        <p className="text-sm">
          {t('about.missionIntro')}
        </p>
        <ul className="list-disc ms-5 mt-3 text-sm text-[var(--muted)] space-y-1">
          <li>{t('about.missionGoal1')}</li>
          <li>{t('about.missionGoal2')}</li>
          <li>{t('about.missionGoal3')}</li>
          <li>{t('about.missionGoal4')}</li>
        </ul>
      </Modal>

      {/* Team modal */}
      <Modal open={open === 'team'} onClose={() => setOpen(null)} title={t('about.teamTitle')}>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'Ava Patel', role: 'Head of Engineering', tags: ['DevOps', 'Workers', 'D1'], image: '/images/about/team/ava-patel.jpg' },
            { name: 'Liam Chen', role: 'Lead Designer', tags: ['Design Systems', 'A11y', 'Motion'], image: '/images/about/team/liam-chen.jpg' },
            { name: 'Sofia Martins', role: 'Full-stack Engineer', tags: ['Hono', 'React', 'Edge Caching'], image: '/images/about/team/sofia-martins.jpg' },
            { name: 'Noah Singh', role: 'Platform Engineer', tags: ['CI/CD', 'Observability', 'Perf'], image: '/images/about/team/noah-singh.jpg' },
          ].map((m) => (
            <div key={m.name} className="rounded-xl border border-[var(--border)] p-4 bg-[var(--surface-1)]">
              <CardImage src={m.image} alt={m.name} className="h-24" />
              <div className="font-semibold mt-3">{m.name}</div>
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
