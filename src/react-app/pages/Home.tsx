import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServicesGrid from '../components/ServicesGrid'

export default function Home() {
  const { t } = useTranslation('common')
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            {t('home.heroPrefix')}{' '}
            <span className="gradient-orange">{t('home.heroEm')}</span>{' '}
            {t('home.heroSuffixBeforeEdge')}
            <span className="underline-anim">{t('home.heroEdge')}</span>
            {t('home.heroSuffixAfterEdge')}
          </h1>

          {/* one line, horizontally scrollable on small screens, with a subtle entrance */}
          <p className="mt-6 text-[var(--muted)] max-w-full whitespace-nowrap overflow-x-auto no-scrollbar fade-in-up">
            {t('home.heroSubtitle')}
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link to="/projects" className="px-5 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition">
              {t('home.cta1')}
            </Link>
            <Link to="/contact" className="px-5 py-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-1)] transition">
              {t('home.cta2')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6">{t('home.ourServices')}</h2>
        <ServicesGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-[var(--border)] p-8 text-center bg-[var(--surface-1)]">
          <h3 className="text-xl font-semibold">{t('home.ctaBlockTitle')}</h3>
          <p className="text-[var(--muted)] mt-2">{t('home.ctaBlockBody')}</p>
          <Link to="/contact" className="inline-block mt-5 px-5 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition">
            {t('home.cta2')}
          </Link>
        </div>
      </section>
    </>
  )
}
