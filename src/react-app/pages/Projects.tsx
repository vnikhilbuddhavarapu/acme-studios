import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import CardImage from '../components/CardImage'

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Sample Projects</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
