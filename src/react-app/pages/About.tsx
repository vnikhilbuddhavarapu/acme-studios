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
        className="max-w-4xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] shadow-xl p-6"
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
  const [open, setOpen] = React.useState<'mission' | 'team' | 'methodology' | null>(null)

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
          <CardImage src="/about/mission.jpg" alt={t('about.missionTitle')} className="h-40" />
          <h3 className="font-semibold mt-4">{t('about.missionTitle')}</h3>
          <p className="text-[var(--muted)] text-sm mt-1">
            {t('about.missionDesc')}
          </p>
        </button>

        <button
          onClick={() => setOpen('team')}
          className="card p-6 text-left hover:translate-y-[-2px] transition"
        >
          <CardImage src="/about/team.jpg" alt={t('about.teamTitle')} className="h-40" />
          <h3 className="font-semibold mt-4">{t('about.teamTitle')}</h3>
          <p className="text-[var(--muted)] text-sm mt-1">
            {t('about.teamDesc')}
          </p>
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setOpen('methodology')}
          className="card p-6 text-left hover:translate-y-[-2px] transition w-full"
        >
          <h3 className="font-semibold text-lg">{t('about.methodologyTitle')}</h3>
          <p className="text-[var(--muted)] text-sm mt-2">
            {t('about.methodologyDesc')}
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
            { name: 'Ava Miller', role: 'Head of Engineering', tags: ['System Architecture', 'Cloud Infrastructure', 'Team Leadership', 'DevOps', 'API Design'], image: '/about/team/ava-miller.jpg' },
            { name: 'Liam Chen', role: 'Lead UI/UX Designer', tags: ['User Research', 'Design Systems', 'Prototyping', 'Accessibility', 'Interaction Design'], image: '/about/team/liam-chen.jpg' },
            { name: 'Sofia Martins', role: 'Full-stack Engineer', tags: ['Frontend', 'Backend APIs', 'Databases', 'React', 'Node.js'], image: '/about/team/sofia-martins.jpg' },
            { name: 'Noah Williams', role: 'Platform Engineer', tags: ['CI/CD', 'Containers', 'Kubernetes', 'Monitoring', 'Performance'], image: '/about/team/noah-williams.jpg' },
          ].map((m) => (
            <div key={m.name} className="rounded-xl border border-[var(--border)] p-4 bg-[var(--surface-1)]">
              <CardImage src={m.image} alt={m.name} className="h-52" objectPosition="center 30%" />
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

      {/* Methodology modal */}
      <Modal open={open === 'methodology'} onClose={() => setOpen(null)} title={t('about.methodologyTitle')}>
        <p className="text-base mb-8 text-[var(--muted)]">
          {t('about.methodologyIntro')}
        </p>
        
        <div className="relative">
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="relative flex gap-4 items-center group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1">
                <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--surface-1)] hover:bg-orange-500/5 hover:border-orange-500 transition-all group-hover:shadow-lg">
                  <p className="text-base text-[var(--fg)] leading-relaxed">
                    <strong className="font-semibold">Discovery & Strategy:</strong> {t('about.methodologyStep1').replace(/^[^:]+:\s*/, '')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex gap-4 items-center group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1">
                <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--surface-1)] hover:bg-orange-500/5 hover:border-orange-500 transition-all group-hover:shadow-lg">
                  <p className="text-base text-[var(--fg)] leading-relaxed">
                    <strong className="font-semibold">Design & Planning:</strong> {t('about.methodologyStep2').replace(/^[^:]+:\s*/, '')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex gap-4 items-center group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1">
                <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--surface-1)] hover:bg-orange-500/5 hover:border-orange-500 transition-all group-hover:shadow-lg">
                  <p className="text-base text-[var(--fg)] leading-relaxed">
                    <strong className="font-semibold">Development:</strong> {t('about.methodologyStep3').replace(/^[^:]+:\s*/, '')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex gap-4 items-center group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="flex-1">
                <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--surface-1)] hover:bg-orange-500/5 hover:border-orange-500 transition-all group-hover:shadow-lg">
                  <p className="text-base text-[var(--fg)] leading-relaxed">
                    <strong className="font-semibold">Testing & QA:</strong> {t('about.methodologyStep4').replace(/^[^:]+:\s*/, '')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex gap-4 items-center group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 group-hover:scale-110 transition-transform">
                5
              </div>
              <div className="flex-1">
                <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--surface-1)] hover:bg-orange-500/5 hover:border-orange-500 transition-all group-hover:shadow-lg">
                  <p className="text-base text-[var(--fg)] leading-relaxed">
                    <strong className="font-semibold">Launch & Support:</strong> {t('about.methodologyStep5').replace(/^[^:]+:\s*/, '')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Client Feedback Loop */}
          <div className="mt-8 rounded-xl border-2 border-dashed border-orange-500/30 bg-orange-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2 text-[var(--fg)]">Continuous Client Feedback</h4>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Throughout every phase, we actively seek your feedback to iterate and pivot as needed. Your input shapes the direction, ensuring the final product aligns perfectly with your vision and business goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
