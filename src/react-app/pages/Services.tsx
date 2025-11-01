import { useTranslation } from 'react-i18next'
import CardImage from '../components/CardImage'

export default function Services() {
  const { t } = useTranslation('common')
  
  const items = [
    {
      title: t('services.designSprints.title'),
      desc: t('services.designSprints.desc'),
      bullets: [t('services.designSprints.bullet1'), t('services.designSprints.bullet2'), t('services.designSprints.bullet3')],
      image: '/images/services/design-sprints.jpg',
    },
    {
      title: t('services.fullStack.title'),
      desc: t('services.fullStack.desc'),
      bullets: [t('services.fullStack.bullet1'), t('services.fullStack.bullet2'), t('services.fullStack.bullet3')],
      image: '/images/services/full-stack.jpg',
    },
    {
      title: t('services.ecommerce.title'),
      desc: t('services.ecommerce.desc'),
      bullets: [t('services.ecommerce.bullet1'), t('services.ecommerce.bullet2'), t('services.ecommerce.bullet3')],
      image: '/images/services/ecommerce.jpg',
    },
    {
      title: t('services.migrations.title'),
      desc: t('services.migrations.desc'),
      bullets: [t('services.migrations.bullet1'), t('services.migrations.bullet2'), t('services.migrations.bullet3')],
      image: '/images/services/migrations.jpg',
    },
    {
      title: t('services.integrations.title'),
      desc: t('services.integrations.desc'),
      bullets: [t('services.integrations.bullet1'), t('services.integrations.bullet2'), t('services.integrations.bullet3')],
      image: '/images/services/integrations.jpg',
    },
    {
      title: t('services.optimization.title'),
      desc: t('services.optimization.desc'),
      bullets: [t('services.optimization.bullet1'), t('services.optimization.bullet2'), t('services.optimization.bullet3')],
      image: '/images/services/optimization.jpg',
    },
  ]
  
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t('services.title')}</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((x) => (
            <div key={x.title} className="card p-6 hover:translate-y-[-2px] transition">
              <CardImage src={x.image} alt={x.title} className="h-32" />
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
  