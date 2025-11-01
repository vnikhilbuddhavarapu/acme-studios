import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getProject } from '../data/projects'
import CardImage from '../components/CardImage'

export default function ProjectDetail() {
  const { t } = useTranslation('common')
  const { slug } = useParams()
  const project = getProject(slug || '')
  if (!project) return <Navigate to="/projects" replace />

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link to="/projects" className="text-sm text-[var(--muted)] hover:text-[var(--fg)]">← {t('projects.backToProjects')}</Link>

      <div className="mt-6">
        <CardImage src={project.image} alt={project.title} className="h-64" rounded="rounded-xl" />
        <h1 className="text-3xl font-bold mt-6">{project.title}</h1>
        <p className="mt-4 text-[var(--muted)]">{project.overview}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card p-5">
          <h3 className="font-semibold mb-2">{t('projects.highlights')}</h3>
          <ul className="list-disc ms-5 text-sm text-[var(--muted)] space-y-1">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold mb-2">{t('projects.techStack')}</h3>
          <ul className="list-disc ms-5 text-sm text-[var(--muted)] space-y-1">
            {project.tech.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold mb-2">{t('projects.integrations')}</h3>
          <ul className="list-disc ms-5 text-sm text-[var(--muted)] space-y-1">
            {project.integrations.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {project.gallery.map((g) => (
            <CardImage key={g} src={g} alt={`${project.title} gallery`} className="h-48" rounded="rounded-lg" />
          ))}
        </div>
      )}

      <div className="card p-5 mt-6">
        <h3 className="font-semibold mb-2">{t('projects.results')}</h3>
        <ul className="list-disc ms-5 text-sm text-[var(--muted)] space-y-1">
          {project.results.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>
    </div>
  )
}
