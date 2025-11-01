import { useTranslation } from 'react-i18next'
import CardImage from './CardImage'

export default function ServicesGrid() {
  const { t } = useTranslation('common')
  
  const FEATURES = [
  {
    title: t('services.webDesign.title'),
    desc: t('services.webDesign.desc'),
    bullets: [t('services.webDesign.bullet1'), t('services.webDesign.bullet2'), t('services.webDesign.bullet3')],
    image: '/images/services/web-design.avif'
  },
  {
    title: t('services.webDevelopment.title'),
    desc: t('services.webDevelopment.desc'),
    bullets: [t('services.webDevelopment.bullet1'), t('services.webDevelopment.bullet2'), t('services.webDevelopment.bullet3')],
    image: '/images/services/fullstack.avif'
  },
  {
    title: t('services.apiIntegrations.title'),
    desc: t('services.apiIntegrations.desc'),
    bullets: [t('services.apiIntegrations.bullet1'), t('services.apiIntegrations.bullet2'), t('services.apiIntegrations.bullet3')],
    image: '/images/services/integrations.avif'
  },
  {
    title: t('services.optimizationService.title'),
    desc: t('services.optimizationService.desc'),
    bullets: [t('services.optimizationService.bullet1'), t('services.optimizationService.bullet2'), t('services.optimizationService.bullet3')],
    image: '/images/services/optimization.avif'
  }
]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURES.map((f) => (
        <div key={f.title} className="card-static p-5">
          <CardImage src={f.image} alt={f.title} className="h-32" />
          <div className="text-lg font-semibold mt-4">{f.title}</div>
          <p className="text-sm text-[var(--muted)] mb-3">{f.desc}</p>
          <ul className="list-disc ms-5 text-sm text-[var(--muted)] space-y-1">
            {f.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
