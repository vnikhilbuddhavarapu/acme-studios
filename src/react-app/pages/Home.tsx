import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CardImage from '../components/CardImage'

export default function Home() {
  const { t } = useTranslation('common')
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {t('home.heroPrefix')}{' '}
            <span className="gradient-orange">{t('home.heroEm')}</span>{' '}
            {t('home.heroSuffixBeforeEdge')}
            <span className="underline-anim">{t('home.heroEdge')}</span>
            {t('home.heroSuffixAfterEdge')}
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[var(--muted)] max-w-full whitespace-nowrap overflow-x-auto no-scrollbar fade-in-up px-2">
            {t('home.heroSubtitle')}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Link to="/projects" className="px-5 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition text-center">
              {t('home.cta1')}
            </Link>
            <Link to="/contact" className="px-5 py-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-1)] transition text-center">
              {t('home.cta2')}
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Best */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">{t('home.servicesTitle')}</h2>
        <p className="text-sm sm:text-base text-[var(--muted)] text-center mb-8 sm:mb-10 max-w-2xl mx-auto px-2">{t('home.servicesSubtitle')}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="card p-6 hover:translate-y-[-2px] transition">
            <CardImage src="/images/home/full-stack.jpg" alt={t('home.service1Title')} className="h-40" rounded="rounded-lg" />
            <h3 className="font-semibold mt-4">{t('home.service1Title')}</h3>
            <p className="text-sm text-[var(--muted)] mt-2">{t('home.service1Desc')}</p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
              <li>• {t('home.service1Bullet1')}</li>
              <li>• {t('home.service1Bullet2')}</li>
              <li>• {t('home.service1Bullet3')}</li>
            </ul>
          </div>

          <div className="card p-6 hover:translate-y-[-2px] transition">
            <CardImage src="/images/home/api.jpg" alt={t('home.service2Title')} className="h-40" rounded="rounded-lg" />
            <h3 className="font-semibold mt-4">{t('home.service2Title')}</h3>
            <p className="text-sm text-[var(--muted)] mt-2">{t('home.service2Desc')}</p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
              <li>• {t('home.service2Bullet1')}</li>
              <li>• {t('home.service2Bullet2')}</li>
              <li>• {t('home.service2Bullet3')}</li>
            </ul>
          </div>

          <div className="card p-6 hover:translate-y-[-2px] transition">
            <CardImage src="/images/home/devops.jpg" alt={t('home.service3Title')} className="h-40" rounded="rounded-lg" />
            <h3 className="font-semibold mt-4">{t('home.service3Title')}</h3>
            <p className="text-sm text-[var(--muted)] mt-2">{t('home.service3Desc')}</p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
              <li>• {t('home.service3Bullet1')}</li>
              <li>• {t('home.service3Bullet2')}</li>
              <li>• {t('home.service3Bullet3')}</li>
            </ul>
          </div>

          <div className="card p-6 hover:translate-y-[-2px] transition">
            <CardImage src="/images/home/compliance.jpg" alt={t('home.service4Title')} className="h-40" rounded="rounded-lg" />
            <h3 className="font-semibold mt-4">{t('home.service4Title')}</h3>
            <p className="text-sm text-[var(--muted)] mt-2">{t('home.service4Desc')}</p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--muted)]">
              <li>• {t('home.service4Bullet1')}</li>
              <li>• {t('home.service4Bullet2')}</li>
              <li>• {t('home.service4Bullet3')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm sm:text-base text-[var(--accent)] hover:underline">
            {t('home.viewAllServices')} →
          </Link>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">{t('home.testimonialsTitle')}</h2>
        <p className="text-sm sm:text-base text-[var(--muted)] text-center mb-8 sm:mb-10 max-w-2xl mx-auto px-2">{t('home.testimonialsSubtitle')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Testimonial 1 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                TG
              </div>
              <div>
                <div className="font-semibold">{t('home.testimonial1Name')}</div>
                <div className="text-sm text-[var(--muted)]">{t('home.testimonial1Role')}</div>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)] italic">"{t('home.testimonial1Quote')}"</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">
                {t('home.testimonial1Metric')}
              </span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <div className="font-semibold">{t('home.testimonial2Name')}</div>
                <div className="text-sm text-[var(--muted)]">{t('home.testimonial2Role')}</div>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)] italic">"{t('home.testimonial2Quote')}"</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {t('home.testimonial2Metric')}
              </span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                RP
              </div>
              <div>
                <div className="font-semibold">{t('home.testimonial3Name')}</div>
                <div className="text-sm text-[var(--muted)]">{t('home.testimonial3Role')}</div>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)] italic">"{t('home.testimonial3Quote')}"</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-500 border border-purple-500/20">
                {t('home.testimonial3Metric')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-20">
        <div className="rounded-2xl border border-[var(--border)] p-6 sm:p-8 text-center bg-[var(--surface-1)]">
          <h3 className="text-lg sm:text-xl font-semibold">{t('home.ctaBlockTitle')}</h3>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-2">{t('home.ctaBlockBody')}</p>
          <Link to="/contact" className="inline-block mt-4 sm:mt-5 px-5 py-3 rounded-lg bg-[var(--fg)] text-[var(--bg)] font-medium hover:opacity-90 transition">
            {t('home.cta2')}
          </Link>
        </div>
      </section>
    </div>
  )
}