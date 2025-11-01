import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type User = { id: number; first_name: string; email: string } | null

export default function Dashboard() {
  const { t } = useTranslation('common')
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/auth/me').then(async (r) => {
      const data = await r.json()
      if (mounted) setUser(data.user ?? null)
    })
    return () => { mounted = false }
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
      <div className="mt-4 rounded-xl border border-neutral-800 p-6">
        <p className="text-lg">
          {user ? <>{t('dashboard.greeting')} <span className="font-semibold">{user.first_name}</span> 👋</> : t('dashboard.loading')}
        </p>
        <p className="text-neutral-400 mt-2">{t('dashboard.description')}</p>
      </div>
    </div>
  )
}
