import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import CardImage from '../components/CardImage'

export default function Projects() {
  const { t } = useTranslation('common')
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{t('projects.title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {PROJECTS.map((p) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} className="card p-6">
            <CardImage src={p.image} alt={p.title} />
            <div className="font-semibold mt-4">{p.title}</div>
            <div className="text-sm text-[var(--muted)]">{p.blurb}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-1)]">
                  {t}
                </span>
              ))}
              {p.tech.length > 4 && (
                <span className="text-xs px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-1)]">
                  +{p.tech.length - 4}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
