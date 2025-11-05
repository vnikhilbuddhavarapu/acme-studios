import { useTranslation } from 'react-i18next'
import CardImage from '../components/CardImage'

export default function Services() {
  const { t } = useTranslation('common')
  
  const items = [
    {
      title: t('services.agileMethodology.title'),
      desc: t('services.agileMethodology.desc'),
      bullets: [t('services.agileMethodology.bullet1'), t('services.agileMethodology.bullet2'), t('services.agileMethodology.bullet3')],
      image: '/images/services/agile-methodology.jpg',
    },
    {
      title: t('services.cloudArchitecture.title'),
      desc: t('services.cloudArchitecture.desc'),
      bullets: [t('services.cloudArchitecture.bullet1'), t('services.cloudArchitecture.bullet2'), t('services.cloudArchitecture.bullet3')],
      image: '/images/services/cloud-architecture.jpg',
    },
    {
      title: t('services.platformEngineering.title'),
      desc: t('services.platformEngineering.desc'),
      bullets: [t('services.platformEngineering.bullet1'), t('services.platformEngineering.bullet2'), t('services.platformEngineering.bullet3')],
      image: '/images/services/platform-engineering.jpg',
    },
    {
      title: t('services.devSecOps.title'),
      desc: t('services.devSecOps.desc'),
      bullets: [t('services.devSecOps.bullet1'), t('services.devSecOps.bullet2'), t('services.devSecOps.bullet3')],
      image: '/images/services/devsecops.jpg',
    },
    {
      title: t('services.observability.title'),
      desc: t('services.observability.desc'),
      bullets: [t('services.observability.bullet1'), t('services.observability.bullet2'), t('services.observability.bullet3')],
      image: '/images/services/observability.jpg',
    },
    {
      title: t('services.appModernization.title'),
      desc: t('services.appModernization.desc'),
      bullets: [t('services.appModernization.bullet1'), t('services.appModernization.bullet2'), t('services.appModernization.bullet3')],
      image: '/images/services/application-modernization.jpg',
    },
  ]
  
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{t('services.title')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((x) => (
            <div key={x.title} className="card p-6 hover:translate-y-[-2px] transition">
              <CardImage src={x.image} alt={x.title} className="h-48" />
              <h3 className="font-semibold mt-4">{x.title}</h3>
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
  